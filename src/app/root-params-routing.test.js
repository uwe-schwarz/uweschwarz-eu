import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, test } from "bun:test";

const appDir = import.meta.dir;
const root = join(appDir, "../..");
const localizedLayoutSource = readFileSync(join(appDir, "[lang]/layout.tsx"), "utf8");
const requestConfigSource = readFileSync(join(root, "src/i18n/request.ts"), "utf8");
const nextConfigSource = readFileSync(join(root, "next.config.ts"), "utf8");
const globalNotFoundSource = readFileSync(join(appDir, "global-not-found.tsx"), "utf8");
const sitemapPageSource = readFileSync(join(appDir, "sitemap/SitemapPageClient.tsx"), "utf8");

describe("root parameter routing", () => {
  test("makes the language segment the document root", () => {
    expect(existsSync(join(appDir, "layout.tsx"))).toBe(false);
    expect(existsSync(join(appDir, "page.tsx"))).toBe(false);
    expect(localizedLayoutSource).toContain("<html");
    expect(localizedLayoutSource).toContain("<body");
    expect(localizedLayoutSource).toContain("lang={language}");
    expect(localizedLayoutSource).toContain("getLocale()");
    expect(requestConfigSource).toContain('from "next/root-params"');
    expect(requestConfigSource).toContain("await lang()");
  });

  test("uses a standalone global 404 for the dynamic root layout", () => {
    expect(nextConfigSource).toContain("globalNotFound: true");
    expect(globalNotFoundSource).toContain('import "./globals.css"');
    expect(globalNotFoundSource).toContain("themeInitScript");
    expect(globalNotFoundSource).toContain("ROUTE_LANGUAGE_HEADER");
    expect(globalNotFoundSource).toContain("<html");
    expect(globalNotFoundSource).toContain("<body");
  });

  test("does not expose duplicate unlocalized page routes", () => {
    for (const route of ["cv", "imprint", "privacy", "sitemap"]) {
      expect(existsSync(join(appDir, route, "page.tsx"))).toBe(false);
      expect(existsSync(join(appDir, route, "layout.tsx"))).toBe(false);
      expect(existsSync(join(appDir, "[lang]", route, "page.tsx"))).toBe(true);
    }
  });

  test("keeps public-file links outside locale-aware navigation", () => {
    expect(sitemapPageSource).toContain('import NextLink from "next/link"');
    expect(sitemapPageSource).toContain('<NextLink className="text-primary hover:underline" href="/sitemap.xml">');
    expect(sitemapPageSource).toContain('<NextLink className="text-primary hover:underline" href="/llms.txt">');
  });
});
