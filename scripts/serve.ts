import { stat } from "node:fs/promises";
import { resolve, sep } from "node:path";

import { buildSite } from "./build";
import { sendMail } from "../src/server/send-mail";
import {
  buildMarkdownResponseHeaders,
  hasMarkdownAcceptHeader,
  isHomepagePath,
  appendAgentDiscoveryHeaders,
} from "../src/lib/agent-readiness";
import { detectPreferredLanguage } from "../src/lib/detect-language";
import { isSupportedLanguage } from "../src/lib/i18n";

const root = resolve(import.meta.dir, "..");
process.chdir(root);
const development = process.argv.includes("--dev");
if (development) {
  await buildSite();
}
const staticDir = resolve(root, ".vercel/output/static");
if (!(await Bun.file(resolve(root, ".vercel/output/config.json")).exists())) {
  throw new Error("Run bun run build before starting the static preview");
}
const config = await Bun.file(resolve(root, ".vercel/output/config.json")).json();
const securityHeaders = config.routes[0].headers as Record<string, string>;
const version = crypto.randomUUID();
const portIndex = process.argv.indexOf("--port");
const hostnameIndex = process.argv.indexOf("--hostname");
const server = Bun.serve({
  async fetch(request) {
    const url = new URL(request.url);
    const pathname = url.pathname.replace(/\/+$/, "") || "/";
    const locale = pathname.split("/")[1];
    const saved = request.headers.get("cookie")?.match(/(?:^|;\s*)language=(de|en)(?:;|$)/)?.[1];
    const language = isSupportedLanguage(locale)
      ? locale
      : isSupportedLanguage(saved)
        ? saved
        : detectPreferredLanguage(request.headers.get("accept-language"));
    if (pathname === "/api/send-mail") {
      return sendMail(request);
    }
    if (pathname === "/_vercel/insights/script.js") {
      return new Response("", { headers: { "Content-Type": "application/javascript" } });
    }
    if (development && pathname === "/__dev/events") {
      return new Response(
        new ReadableStream({
          start(controller) {
            controller.enqueue(new TextEncoder().encode(`data: ${version}\n\n`));
            // Keep the stream open; Bun --watch closes it when source changes.
          },
        }),
        { headers: { "Cache-Control": "no-store", "Content-Type": "text/event-stream" } },
      );
    }
    const headers = new Headers(securityHeaders);
    if (development) {
      headers.delete("Content-Security-Policy");
    }
    if (
      (isHomepagePath(pathname) && hasMarkdownAcceptHeader(request.headers.get("accept"))) ||
      pathname === "/api/agent-markdown"
    ) {
      const queryLanguage = url.searchParams.get("lang");
      const markdownLanguage =
        pathname === "/api/agent-markdown" ? (isSupportedLanguage(queryLanguage) ? queryLanguage : "en") : language;
      const markdown = await Bun.file(resolve(staticDir, `${markdownLanguage}/index.md`)).text();
      const markdownHeaders = buildMarkdownResponseHeaders(markdown);
      markdownHeaders.set("Content-Language", markdownLanguage);
      appendAgentDiscoveryHeaders(markdownHeaders);
      return new Response(markdown, { headers: markdownHeaders });
    }
    if (/^\/(?:cv|imprint|privacy|sitemap)?$/.test(pathname)) {
      url.pathname = `/${language}${pathname === "/" ? "" : pathname}`;
      headers.set("Location", url.toString());
      headers.set("Vary", "Cookie, Accept-Language");
      return new Response(null, { headers, status: 307 });
    }
    let filePath = resolve(staticDir, `.${decodeURIComponent(pathname)}`);
    if (!filePath.startsWith(staticDir + sep)) {
      return new Response("Not found", { status: 404 });
    }
    try {
      if ((await stat(filePath)).isDirectory()) {
        filePath = resolve(filePath, "index.html");
      }
    } catch {
      /* Fall through to the localized 404 page. */
    }
    let status = 200;
    if (!(await Bun.file(filePath).exists())) {
      filePath = resolve(staticDir, `${language}/404/index.html`);
      status = 404;
    }
    const file = Bun.file(filePath);
    headers.set("Content-Type", file.type);
    if (!development && filePath.endsWith(".pdf")) {
      headers.set(
        "Content-Security-Policy",
        securityHeaders["Content-Security-Policy"].replace("frame-ancestors 'none'", "frame-ancestors 'self'"),
      );
    }
    if (pathname.startsWith("/assets/")) {
      headers.set("Cache-Control", "public, max-age=31536000, immutable");
    }
    if (isHomepagePath(pathname)) {
      appendAgentDiscoveryHeaders(headers);
      headers.set("Vary", "Accept");
    }
    if (development && filePath.endsWith(".html")) {
      const html = (await file.text()).replace(
        "</body>",
        `<script>new EventSource('/__dev/events').onmessage = event => { if (event.data !== '${version}') location.reload(); };</script></body>`,
      );
      return new Response(html, { headers, status });
    }
    return new Response(request.method === "HEAD" ? null : file, { headers, status });
  },
  hostname: hostnameIndex < 0 ? "127.0.0.1" : process.argv[hostnameIndex + 1],
  port: Number(portIndex < 0 ? (process.env.PORT ?? 3000) : process.argv[portIndex + 1]),
});
console.log(`Static ${development ? "development server" : "preview"}: ${server.url}`);
