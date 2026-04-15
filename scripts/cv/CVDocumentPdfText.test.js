import { execFile } from "node:child_process";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";

import React from "react";
import { describe, expect, test } from "bun:test";

import { siteContent } from "../../src/content/content";
import CVDocument from "./CVDocument";
import { renderPdf } from "./renderPdf";

const execFileAsync = promisify(execFile);

const renderGermanCvPdf = async () => {
  const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "cv-pdf-text-"));
  const pdfPath = path.join(tempDir, "cv-de.pdf");
  const profileImage = await fs.readFile(new globalThis.URL("../../public/profile.jpg", import.meta.url));
  const pdfElement = React.createElement(CVDocument, {
    data: siteContent,
    language: "de",
    profileImageSrc: profileImage,
    updatedAt: new Date("2026-03-13T10:07:02+01:00"),
  });

  await renderPdf(pdfElement, pdfPath);

  return {
    cleanup: () => fs.rm(tempDir, { force: true, recursive: true }),
    pdfPath,
  };
};

describe("CV PDF text rendering", () => {
  test("keeps umlauted words composed in the generated German PDF", async () => {
    const { cleanup, pdfPath } = await renderGermanCvPdf();

    try {
      const { stdout } = await execFileAsync("pdftotext", ["-layout", pdfPath, "-"], {
        encoding: "utf8",
      });

      expect(stdout).toContain("Schlüsselprojekte");
      expect(stdout).toContain("Deutsche Vermögensberatung AG");
      expect(stdout).toContain("Gründungsmitglied");

      // The paired assertions intentionally cover both NFC and NFD spellings:
      // the first group uses composed umlauts, while the second uses decomposed
      // base-letter-plus-combining-mark variants that should not appear.
      expect(stdout).not.toContain("Schlüsselprojekte");
      expect(stdout).not.toContain("Deutsche Vermögensberatung AG");
      expect(stdout).not.toContain("Gründungsmitglied");
    } finally {
      await cleanup();
    }
  });

  test("keeps wrapped bullet lines aligned with the text after the bullet", async () => {
    const { cleanup, pdfPath } = await renderGermanCvPdf();

    try {
      const { stdout } = await execFileAsync("pdftotext", ["-bbox-layout", pdfPath, "-"], {
        encoding: "utf8",
        maxBuffer: 10_000_000,
      });

      const lines = [
        ...stdout.matchAll(/<line xMin="([^"]+)" yMin="([^"]+)" xMax="([^"]+)" yMax="([^"]+)">([\s\S]*?)<\/line>/g),
      ]
        .map((match) => ({
          text: [...match[5].matchAll(/<word [^>]*>([^<]+)<\/word>/g)].map((word) => word[1]).join(" "),
          words: [
            ...match[5].matchAll(/<word xMin="([^"]+)" yMin="[^"]+" xMax="([^"]+)" yMax="[^"]+">([^<]+)<\/word>/g),
          ].map((word) => ({
            text: word[3],
            xMax: Number(word[2]),
            xMin: Number(word[1]),
          })),
          xMin: Number(match[1]),
        }))
        .filter((line) => line.text.length > 0);

      const firstBulletLineIndex = lines.findIndex((line) =>
        line.text.includes("Technische Programmverantwortung für die IPv6-Migration"),
      );
      const firstBulletLine = lines[firstBulletLineIndex];
      const wrappedLine = lines[firstBulletLineIndex + 1];

      expect(firstBulletLine.words[0]?.text).toBe("•");
      expect(firstBulletLine.words[1]?.text).toBe("Technische");
      expect(wrappedLine.text.startsWith("mit Fokus auf Migrationsplanung")).toBe(true);
      expect(wrappedLine.xMin).toBeGreaterThanOrEqual(firstBulletLine.words[1].xMin);
    } finally {
      await cleanup();
    }
  });
});
