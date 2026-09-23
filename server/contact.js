// POST /api/contact — sends a "request to connect" email through Resend.
//
// Written against the web-standard Request/Response/fetch APIs so the same
// code runs on Cloudflare Workers (worker/index.js), Vercel (api/contact.js)
// and the local Vite dev/preview server (server/node.js).
import { validateContact } from "../src/utils/contactValidation.js";

const MAX_BODY_BYTES = 16_000;

// Best-effort cap on emails sent per IP. The counts live in this instance's
// memory, so they reset when the instance restarts and aren't shared between
// instances; use a platform firewall rule for a global limit.
const RATE_LIMIT = { max: 5, windowMs: 10 * 60 * 1000 };
const sendsByIp = new Map();

const json = (status, body, headers = {}) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store", ...headers },
  });

const escapeHtml = (value) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

// Browsers always send Origin on POST, so this blocks other websites from
// submitting to this endpoint on their visitors' behalf.
const isSameOrigin = (request) => {
  try {
    return new URL(request.headers.get("origin")).host === new URL(request.url).host;
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

// Reads the body but gives up as soon as it passes the size limit
const readText = async (request) => {
  if (Number(request.headers.get("content-length")) > MAX_BODY_BYTES) {
    throw new Error("Body too large");
  }
  if (!request.body) return "";

  const reader = request.body.getReader();
  const chunks = [];
  let size = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > MAX_BODY_BYTES) {
      await reader.cancel();
      throw new Error("Body too large");
    }
    chunks.push(value);
  }

  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return new TextDecoder().decode(bytes);
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

// https://resend.com/docs/api-reference/emails/send-email
const sendEmail = async (env, data) => {
  const { html, text } = buildEmail(data);
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: env.CONTACT_FROM_EMAIL || "MSr Real Estates <onboarding@resend.dev>",
      to: env.CONTACT_TO_EMAIL.split(",").map((address) => address.trim()),
      reply_to: data.email,
      subject: `New connect request from ${data.name}`,
      html,
      text,
    }),
  });

  if (!res.ok) {
    throw new Error(`Resend responded ${res.status}: ${await res.text()}`);
  }
  return res.json();
};

// `env` holds RESEND_API_KEY, CONTACT_TO_EMAIL and CONTACT_FROM_EMAIL;
// `ip` is the client address as reported by the hosting platform.
export async function handleContact(request, env, ip) {
  if (request.method !== "POST") {
    return json(405, { error: "Method not allowed." }, { Allow: "POST" });
  }

  if (!isSameOrigin(request)) {
    return json(403, { error: "Forbidden." });
  }

  if (!request.headers.get("content-type")?.startsWith("application/json")) {
    return json(415, { error: "Content-Type must be application/json." });
  }

  let body;
  try {
    body = JSON.parse(await readText(request));
  } catch {
    return json(400, { error: "Invalid request body." });
  }
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return json(400, { error: "Invalid request body." });
  }

  // Bots fill every field, including the hidden honeypot. Pretend it worked.
  if (body.company) return json(200, { ok: true });

  const { data, errors, isValid } = validateContact(body);
  if (!isValid) {
    return json(400, { error: "Please fix the highlighted fields.", fields: errors });
  }

  if (!env.RESEND_API_KEY || !env.CONTACT_TO_EMAIL) {
    console.error("[contact] RESEND_API_KEY and CONTACT_TO_EMAIL must be set.");
    return json(500, { error: "Email service is not configured yet." });
  }

  if (isRateLimited(ip || "unknown")) {
    return json(
      429,
      { error: "Too many requests. Please try again in a few minutes." },
      { "Retry-After": String(RATE_LIMIT.windowMs / 1000) }
    );
  }

  try {
    const sent = await sendEmail(env, data);
    return json(200, { ok: true, id: sent?.id });
  } catch (err) {
    console.error("[contact] Failed to send:", err);
    return json(502, { error: "Could not send your request. Please try again later." });
  }
}
