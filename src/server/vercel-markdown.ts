import { readFile } from "node:fs/promises";
import type { IncomingMessage, ServerResponse } from "node:http";

import { hasMarkdownAcceptHeader } from "@/lib/content-negotiation";
import { detectPreferredLanguage } from "@/lib/detect-language";
import { isSupportedLanguage } from "@/lib/i18n";

// Only content-negotiated requests reach this function. Normal page requests
// are served directly from static HTML without invoking a function.
export default async function handler(request: IncomingMessage, response: ServerResponse) {
  if (request.method !== "GET" && request.method !== "HEAD") {
    response.writeHead(405, { Allow: "GET, HEAD" });
    response.end();
    return;
  }
  const url = new URL(request.url ?? "/", "https://uweschwarz.eu");
  const negotiate = url.searchParams.get("negotiate") === "1";
  const requested = url.searchParams.get("lang");
  const saved = request.headers.cookie?.match(/(?:^|;\s*)language=(de|en)(?:;|$)/)?.[1];
  const language = isSupportedLanguage(requested)
    ? requested
    : negotiate
      ? isSupportedLanguage(saved)
        ? saved
        : detectPreferredLanguage(request.headers["accept-language"])
      : "en";
  const markdown = !negotiate || hasMarkdownAcceptHeader(request.headers.accept ?? null);
  const headers: Record<string, string> = {
    "Content-Language": language,
    "Content-Type": markdown ? "text/markdown; charset=utf-8" : "text/html; charset=utf-8",
    Link: '</llms.txt>; rel="describedby"; type="text/plain", </sitemap>; rel="service-doc"; type="text/html"',
    Vary: "Accept, Accept-Language, Cookie",
  };
  if (negotiate && !isSupportedLanguage(requested) && !markdown) {
    for (const key of ["negotiate", "lang"]) {
      url.searchParams.delete(key);
    }
    const search = url.searchParams.toString();
    response.writeHead(307, { ...headers, Location: `/${language}${search ? `?${search}` : ""}` });
    response.end();
    return;
  }
  const content = await readFile(new URL(`./pages/${language}.${markdown ? "md" : "html"}`, import.meta.url), "utf8");
  if (markdown) {
    headers["x-markdown-tokens"] = String(content.trim().split(/\s+/).filter(Boolean).length);
  }
  response.writeHead(200, headers);
  response.end(request.method === "HEAD" ? undefined : content);
}
