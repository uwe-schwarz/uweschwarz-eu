import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, test } from "bun:test";

describe("robots.txt", () => {
  test("allows all crawlers and training use", () => {
    const robotsTxt = readFileSync(join(import.meta.dir, "robots.txt"), "utf8");

    expect(robotsTxt).toContain("User-agent: *\nAllow: /");
    expect(robotsTxt).not.toMatch(/disallow:/i);
    expect(robotsTxt).not.toMatch(/ai-train=no/i);
    expect(robotsTxt).not.toMatch(/ai-input=no/i);
    expect(robotsTxt.trim()).toBe("User-agent: *\nAllow: /\n\nSitemap: https://uweschwarz.eu/sitemap.xml");
  });
});
