// Cloudflare Worker. The built site in ./dist is served straight from
// Cloudflare's asset storage; only /api/* requests run this code (see
// run_worker_first in wrangler.jsonc).
import { handleContact } from "../server/contact.js";

export default {
  async fetch(request, env) {
    const { pathname } = new URL(request.url);

    if (pathname === "/api/contact") {
      return handleContact(request, env, request.headers.get("CF-Connecting-IP"));
    }
    if (pathname.startsWith("/api/")) {
      return Response.json({ error: "Not found." }, { status: 404 });
    }
    return env.ASSETS.fetch(request);
  },
};
