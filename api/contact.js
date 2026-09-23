// POST /api/contact — sends a "request to connect" email through Resend.
//
// Runs as a Vercel serverless function in production, and is mounted on the
// Vite dev/preview server by the plugin in vite.config.js for local use.
// Only uses plain Node req/res APIs so it works in both places.
import { Resend } from "resend";

const LIMITS = { name: 100, email: 254, phone: 30, interest: 50, message: 5000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
  res.end(JSON.stringify(body));
};

// Vercel pre-parses JSON bodies; the Vite dev server does not.
const readBody = async (req) => {
  if (req.body && typeof req.body === "object") return req.body;
  if (typeof req.body === "string") return JSON.parse(req.body);

  const chunks = [];
  let size = 0;
  for await (const chunk of req) {
    size += chunk.length;
    if (size > 100_000) throw new Error("Body too large");
    chunks.push(chunk);
  }
  const raw = Buffer.concat(chunks).toString("utf8");
  return raw ? JSON.parse(raw) : {};
};

const validate = (body) => {
  const data = {};
  for (const field of Object.keys(LIMITS)) {
    const value = body[field];
    data[field] = typeof value === "string" ? value.trim() : "";
    if (data[field].length > LIMITS[field]) {
      return { error: `${field} is too long.` };
    }
  }

  if (!data.name) return { error: "Please enter your name." };
  if (!EMAIL_RE.test(data.email)) return { error: "Please enter a valid email address." };
  if (!data.message) return { error: "Please enter a message." };

  return { data };
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

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return sendJson(res, 405, { error: "Method not allowed." });
  }

  let body;
  try {
    body = await readBody(req);
  } catch {
    return sendJson(res, 400, { error: "Invalid request body." });
  }

  // Bots fill every field, including the hidden honeypot. Pretend it worked.
  if (body.company) return sendJson(res, 200, { ok: true });

  const { data, error: validationError } = validate(body);
  if (validationError) return sendJson(res, 400, { error: validationError });

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) {
    console.error("[contact] RESEND_API_KEY and CONTACT_TO_EMAIL must be set.");
    return sendJson(res, 500, { error: "Email service is not configured yet." });
  }

  const resend = new Resend(apiKey);
  const { html, text } = buildEmail(data);

  try {
    const { data: sent, error } = await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL || "MSr Real Estates <onboarding@resend.dev>",
      to: to.split(",").map((address) => address.trim()),
      replyTo: data.email,
      subject: `New connect request from ${data.name.replace(/[\r\n]+/g, " ")}`,
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
