import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, test } from "bun:test";

import { CV_ASSETS } from "../src/generated/cv-assets";

const root = join(import.meta.dir, "..");
const sitemap = readFileSync(join(root, "public/sitemap.xml"), "utf8");

describe("generated sitemap", () => {
  test("references the generated CV assets that actually exist", () => {
    for (const language of ["de", "en"]) {
      for (const extension of ["pdf", "docx"]) {
        const assetPath = CV_ASSETS[language][extension];

        expect(sitemap).toContain(`<loc>https://uweschwarz.eu${assetPath}</loc>`);
        expect(existsSync(join(root, "public", assetPath.slice(1)))).toBe(true);
      }
    }
  });
});
