import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { execFile } from "node:child_process";
import process from "node:process";
import { promisify } from "node:util";

import pixelmatch from "pixelmatch";
import { PNG } from "pngjs";
import React from "react";
import { describe, expect, test } from "bun:test";

import { siteContent } from "../../src/content/content";
import { CV_ASSETS } from "../../src/generated/cv-assets";
import CVDocument from "./CVDocument";
import { renderPdf } from "./renderPdf";

const execFileAsync = promisify(execFile);

describe("CV PDF visual rendering", () => {
  test(
    "matches the committed German CV PDF visually",
    {
      timeout: 20_000,
    },
    async () => {
      const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "cv-pdf-visual-"));
      const pdfPath = path.join(tempDir, "cv-de.pdf");
      const contentPath = path.join(process.cwd(), "src/content/content.ts");
      const contentStats = await fs.stat(contentPath);
      const profileImage = await fs.readFile(new globalThis.URL("../../public/profile.jpg", import.meta.url));
      const pdfElement = React.createElement(CVDocument, {
        data: siteContent,
        language: "de",
        profileImageSrc: profileImage,
        updatedAt: contentStats.mtime,
      });

      try {
        await renderPdf(pdfElement, pdfPath);
        const baselinePdfPath = path.join(process.cwd(), "public", CV_ASSETS.de.pdf.slice(1));

        await renderPdfToPngPages(pdfPath, path.join(tempDir, "actual"));
        await renderPdfToPngPages(baselinePdfPath, path.join(tempDir, "baseline"));

        const actualPages = await listPagePngs(path.join(tempDir, "actual"));
        const baselinePages = await listPagePngs(path.join(tempDir, "baseline"));

        expect(actualPages).toHaveLength(baselinePages.length);

        for (const [index, actualPage] of actualPages.entries()) {
          const baselinePage = baselinePages[index];
          expect(baselinePage).toBeDefined();

          const comparison = await comparePngs(baselinePage, actualPage);

          expect(comparison.compatible).toBe(true);
          expect(comparison.changedPixels).toBe(0);
        }
      } finally {
        await fs.rm(tempDir, { force: true, recursive: true });
      }
    },
  );
});

async function renderPdfToPngPages(pdfPath, outputPrefix) {
  await execFileAsync("pdftoppm", ["-png", "-r", "144", pdfPath, outputPrefix], {
    encoding: "utf8",
  });
}

async function listPagePngs(prefixDirPrefix) {
  const dir = path.dirname(prefixDirPrefix);
  const prefix = path.basename(prefixDirPrefix);
  const files = await fs.readdir(dir);

  return files
    .filter((file) => file.startsWith(`${prefix}-`) && file.endsWith(".png"))
    .sort((left, right) => left.localeCompare(right))
    .map((file) => path.join(dir, file));
}

async function comparePngs(expectedPath, actualPath) {
  const expectedImage = PNG.sync.read(await fs.readFile(expectedPath));
  const actualImage = PNG.sync.read(await fs.readFile(actualPath));

  if (expectedImage.width !== actualImage.width || expectedImage.height !== actualImage.height) {
    return {
      changedPixels: Number.POSITIVE_INFINITY,
      compatible: false,
    };
  }

  const diffImage = new PNG({ height: expectedImage.height, width: expectedImage.width });
  const changedPixels = pixelmatch(
    expectedImage.data,
    actualImage.data,
    diffImage.data,
    expectedImage.width,
    expectedImage.height,
    {
      includeAA: true,
      threshold: 0.1,
    },
  );

  return {
    changedPixels,
    compatible: true,
  };
}
