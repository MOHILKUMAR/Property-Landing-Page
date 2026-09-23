// POST /api/contact — sends a "request to connect" email through Resend.
//
// Runs as a Vercel serverless function in production, and is mounted on the
// Vite dev/preview server by the plugin in vite.config.js for local use.
// Only uses plain Node req/res APIs so it works in both places.
import { Resend } from "resend";
import { validateContact } from "../src/utils/contactValidation.js";

const MAX_BODY_BYTES = 16_000;

// Best-effort cap on emails sent per IP. The counts live in this instance's
// memory, so on serverless hosts they reset on cold starts and aren't shared
// between instances; use a platform firewall or Redis for a global limit.
const RATE_LIMIT = { max: 5, windowMs: 10 * 60 * 1000 };
const sendsByIp = new Map();

const escapeHtml = (value) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const sendJson = (res, status, body) => {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(body));
};

const clientIp = (req) =>
  req.headers["x-real-ip"] ||
  req.headers["x-forwarded-for"]?.split(",")[0].trim() ||
  req.socket?.remoteAddress ||
  "unknown";

// Browsers always send Origin on POST, so this blocks other websites from
// submitting to this endpoint on their visitors' behalf.
const isSameOrigin = (req) => {
  try {
    return new URL(req.headers.origin).host === req.headers.host;
  } catch {
    return false;
  }
};

const isRateLimited = (ip) => {
  const now = Date.now();
  const recent = (sendsByIp.get(ip) || []).filter((t) => now - t < RATE_LIMIT.windowMs);
  const limited = recent.length >= RATE_LIMIT.max;
  if (!limited) recent.push(now);
  sendsByIp.set(ip, recent);

  // Keep memory bounded by dropping IPs with no recent sends
  if (sendsByIp.size > 5000) {
    for (const [key, times] of sendsByIp) {
      if (!times.some((t) => now - t < RATE_LIMIT.windowMs)) sendsByIp.delete(key);
    }
  }
  return limited;
};

// Vercel pre-parses JSON bodies; the Vite dev server does not.
const readBody = async (req) => {
  if (req.body !== undefined && typeof req.body !== "string") return req.body;
  if (typeof req.body === "string") return JSON.parse(req.body);

  const chunks = [];
  let size = 0;
  for await (const chunk of req) {
    size += chunk.length;
    if (size > MAX_BODY_BYTES) throw new Error("Body too large");
    chunks.push(chunk);
  }
  const raw = Buffer.concat(chunks).toString("utf8");
  return raw ? JSON.parse(raw) : {};
};

const buildEmail = ({ name, email, phone, interest, message }) => {
  const rows = [
    ["Name", name],
    ["Email", email],
    ["Phone", phone || "—"],
    ["Interested in", interest || "—"],
  ];

  const html = `
    <div style="font-family: Arial, sans-serif; color: #111; max-width: 600px;">
      <h2 style="color: #16a34a;">New request to connect</h2>
      <table cellpadding="6" style="border-collapse: collapse;">
        ${rows
          .map(
            ([label, value]) =>
              `<tr><td style="font-weight: bold;">${label}</td><td>${escapeHtml(value)}</td></tr>`
          )
          .join("")}
      </table>
      <h3>Message</h3>
      <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
    </div>`;

  const text = [
    "New request to connect",
    "",
    ...rows.map(([label, value]) => `${label}: ${value}`),
    "",
    "Message:",
    message,
  ].join("\n");

  return { html, text };
};

// `env` defaults to process.env (Vercel); the Vite plugin passes values it
// loaded from .env files.
export default async function handler(req, res, env = process.env) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return sendJson(res, 405, { error: "Method not allowed." });
  }

  if (!isSameOrigin(req)) {
    return sendJson(res, 403, { error: "Forbidden." });
  }

  if (!req.headers["content-type"]?.startsWith("application/json")) {
    return sendJson(res, 415, { error: "Content-Type must be application/json." });
  }

  let body;
  try {
    body = await readBody(req);
  } catch {
    return sendJson(res, 400, { error: "Invalid request body." });
  }
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return sendJson(res, 400, { error: "Invalid request body." });
  }

  // Bots fill every field, including the hidden honeypot. Pretend it worked.
  if (body.company) return sendJson(res, 200, { ok: true });

  const { data, errors, isValid } = validateContact(body);
  if (!isValid) {
    return sendJson(res, 400, { error: "Please fix the highlighted fields.", fields: errors });
  }

  const apiKey = env.RESEND_API_KEY;
  const to = env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) {
    console.error("[contact] RESEND_API_KEY and CONTACT_TO_EMAIL must be set.");
    return sendJson(res, 500, { error: "Email service is not configured yet." });
  }

  if (isRateLimited(clientIp(req))) {
    res.setHeader("Retry-After", String(RATE_LIMIT.windowMs / 1000));
    return sendJson(res, 429, {
      error: "Too many requests. Please try again in a few minutes.",
    });
  }

  const resend = new Resend(apiKey);
  const { html, text } = buildEmail(data);

  try {
    const { data: sent, error } = await resend.emails.send({
      from: env.CONTACT_FROM_EMAIL || "MSr Real Estates <onboarding@resend.dev>",
      to: to.split(",").map((address) => address.trim()),
      replyTo: data.email,
      subject: `New connect request from ${data.name}`,
      html,
      text,
    });

    if (error) {
      console.error("[contact] Resend error:", error);
      return sendJson(res, 502, { error: "Could not send your request. Please try again later." });
    }

    return sendJson(res, 200, { ok: true, id: sent?.id });
  } catch (err) {
    console.error("[contact] Unexpected error:", err);
    return sendJson(res, 500, { error: "Could not send your request. Please try again later." });
  }
}
