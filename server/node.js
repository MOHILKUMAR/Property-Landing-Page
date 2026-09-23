// Serves the fetch-style contact handler from a Node (req, res) server, i.e.
// the Vite dev and preview servers (see vite.config.js).
import { Readable } from "node:stream";
import { handleContact } from "./contact.js";

export async function handleNodeRequest(req, res, env) {
  const hasBody = req.method !== "GET" && req.method !== "HEAD";
  const headers = new Headers();
  for (const [key, value] of Object.entries(req.headers)) {
    for (const item of [].concat(value)) headers.append(key, item);
  }

  // Connect strips the mount path from req.url; originalUrl keeps it
  const request = new Request(`http://${req.headers.host}${req.originalUrl ?? req.url}`, {
    method: req.method,
    headers,
    body: hasBody ? Readable.toWeb(req) : undefined,
    duplex: hasBody ? "half" : undefined,
  });

  const response = await handleContact(request, env, req.socket.remoteAddress);
  res.statusCode = response.status;
  response.headers.forEach((value, key) => res.setHeader(key, value));
  res.end(Buffer.from(await response.arrayBuffer()));
}
