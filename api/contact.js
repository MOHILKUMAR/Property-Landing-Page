// Vercel serverless function for POST /api/contact. The logic lives in
// server/contact.js so it can also run on Cloudflare (worker/index.js).
import { handleContact } from "../server/contact.js";

export function POST(request) {
  return handleContact(request, process.env, request.headers.get("x-real-ip"));
}
