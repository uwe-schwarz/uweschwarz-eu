import { readFile } from "node:fs/promises";

const umamiScriptFile = new URL("./umami.js.txt", import.meta.url);
const umamiHashFile = new URL("./umami.sha256", import.meta.url);

export async function GET() {
  try {
    const [script, upstreamSha256] = await Promise.all([
      readFile(umamiScriptFile, "utf8"),
      readFile(umamiHashFile, "utf8"),
    ]);
    const trimmedHash = upstreamSha256.trim();

    return new Response(script, {
      headers: {
        "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
        "Content-Type": "application/javascript; charset=utf-8",
        ETag: `"sha256-${trimmedHash}"`,
        "X-Umami-Upstream-Sha256": trimmedHash,
      },
    });
  } catch {
    return new Response("/* Umami script unavailable */", {
      headers: {
        "Cache-Control": "no-store",
        "Content-Type": "application/javascript; charset=utf-8",
      },
      status: 503,
    });
  }
}
