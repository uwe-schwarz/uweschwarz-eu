import type { IncomingMessage, ServerResponse } from "node:http";

import { sendMail } from "./send-mail";

export default async function handler(request: IncomingMessage, response: ServerResponse) {
  const chunks: Array<Buffer> = [];
  let size = 0;
  for await (const chunk of request) {
    const bytes = Buffer.from(chunk);
    size += bytes.length;
    if (size > 50_000) {
      response.writeHead(413, { "Content-Type": "application/json" });
      response.end(JSON.stringify({ error: "Message is too large" }));
      return;
    }
    chunks.push(bytes);
  }
  const method = request.method ?? "GET";
  const result = await sendMail(
    new Request("https://uweschwarz.eu/api/send-mail", {
      body: method === "GET" || method === "HEAD" ? undefined : Buffer.concat(chunks),
      method,
    }),
  );
  response.writeHead(result.status, Object.fromEntries(result.headers));
  response.end(await result.text());
}
