import { createHash } from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import React from "react";
import CVDocument from "./cv/CVDocument";
import { formatLocalDateStamp } from "./cvAssetDates";
import { CV_SOURCE } from "../src/generated/cv-assets";
import { siteContent } from "../src/content/content";
import { generateCvDocx } from "./cv/CVDocumentDocx";
import { renderPdf } from "./cv/renderPdf";

const scriptDir = import.meta.dirname;
const projectRoot = path.resolve(scriptDir, "..");
const publicDir = path.resolve(projectRoot, "public");

const languages: Array<"en" | "de"> = ["en", "de"];

const formatMonthYear = (date: Date, locale: string) => date.toLocaleString(locale, { month: "long", year: "numeric" });

const buildLastUpdatedLabel = (date: Date) => ({
  de: `Letzte Aktualisierung: ${formatMonthYear(date, "de-DE")}`,
  en: `Last updated: ${formatMonthYear(date, "en-US")}`,
});

const resolveOutputName = (language: "en" | "de", extension: "pdf" | "docx", contentModTime: Date) => {
  const date = formatLocalDateStamp(contentModTime);
  return `uwe-schwarz-cv-${language}-${date}.${extension}`;
};

async function ensureDirectory(dir: string) {
  await fs.mkdir(dir, { recursive: true });
}

async function cleanupOldFiles(contentModTime: Date) {
  try {
    const files = await fs.readdir(publicDir);

    // Remove old CV files that don't match the current date
    const currentDate = formatLocalDateStamp(contentModTime);
    const oldCvFiles = files.filter(
      (file) =>
        file.startsWith("uwe-schwarz-cv-") &&
        (file.endsWith(".pdf") || file.endsWith(".docx")) &&
        !file.includes(`-${currentDate}.`),
    );

    // Keep cleanup logging deterministic while removing files concurrently.
    const filesToRemove = [...oldCvFiles].sort();
    const removalResults = await Promise.allSettled(filesToRemove.map((file) => fs.unlink(path.join(publicDir, file))));

    for (const [index, result] of removalResults.entries()) {
      const file = filesToRemove[index];
      if (result.status === "fulfilled") {
        console.log(`Removed old CV file: ${file}`);
      } else {
        console.warn(`Failed to remove old CV file: ${file}`, result.reason);
      }
    }
  } catch (error) {
    console.warn("Failed to cleanup old files:", error);
  }
}

async function getFileModTime(filePath: string): Promise<Date | null> {
  try {
    const stats = await fs.stat(filePath);
    return stats.mtime;
  } catch {
    return null;
  }
}

async function shouldRegenerate(): Promise<{
  contentHash: string;
  contentModTime: Date | null;
  shouldRegenerate: boolean;
}> {
  const contentPath = path.resolve(projectRoot, "src/content/content.ts");
  const contentHash = createHash("sha256")
    .update(await fs.readFile(contentPath))
    .digest("hex");
  const changed = contentHash !== CV_SOURCE.contentHash;
  const contentModTime = changed ? await getFileModTime(contentPath) : new Date(`${CV_SOURCE.contentDate}T12:00:00`);

  if (!contentModTime || !Number.isFinite(contentModTime.getTime())) {
    throw new Error("A valid content date is required for CV generation.");
  }

  if (changed) {
    console.log("Content identity changed, regenerating CV assets...");
    return { contentHash, contentModTime, shouldRegenerate: true };
  }

  for (const language of languages) {
    const pdfPath = path.join(publicDir, resolveOutputName(language, "pdf", contentModTime));
    const docxPath = path.join(publicDir, resolveOutputName(language, "docx", contentModTime));

    const pdfModTime = await getFileModTime(pdfPath);
    const docxModTime = await getFileModTime(docxPath);

    if (!pdfModTime || !docxModTime) {
      console.log(`CV files for ${language} not found, regenerating...`);
      return { contentHash, contentModTime, shouldRegenerate: true };
    }
  }

  console.log("CV files are up to date, skipping generation.");
  return { contentHash, contentModTime, shouldRegenerate: false };
}

async function main() {
  const { contentHash, contentModTime, shouldRegenerate: shouldRegen } = await shouldRegenerate();

  if (!shouldRegen) {
    return;
  }

  if (!contentModTime) {
    throw new Error("Content modification time is required for generation");
  }

  await ensureDirectory(publicDir);

  const profileImagePath = path.join(publicDir, "profile.jpg");
  const profileImage = await fs.readFile(profileImagePath);

  // Attach rejection handlers immediately so DOCX task failures are always observed.
  const docxWritesPromise = Promise.all(
    languages.map(async (language) => {
      const docxTarget = path.join(publicDir, resolveOutputName(language, "docx", contentModTime));
      const docxData = await generateCvDocx({
        data: siteContent,
        language,
        profileImage,
      });
      await fs.writeFile(docxTarget, docxData);
    }),
  );

  // ReactPDF rendering is not reliably concurrency-safe; keep PDF generation sequential.
  for (const language of languages) {
    const pdfElement = React.createElement(CVDocument, {
      data: siteContent,
      language,
      profileImageSrc: profileImage,
      updatedAt: contentModTime,
    });
    const pdfTarget = path.join(publicDir, resolveOutputName(language, "pdf", contentModTime));
    await renderPdf(pdfElement, pdfTarget);
  }

  await docxWritesPromise;

  console.log(
    `Generated CV assets: ${languages
      .map(
        (lang) =>
          `${resolveOutputName(lang, "pdf", contentModTime)}, ${resolveOutputName(lang, "docx", contentModTime)}`,
      )
      .join("; ")}`,
  );

  await cleanupOldFiles(contentModTime);

  // Generate a TypeScript file with the asset paths for the frontend
  const lastUpdatedLabel = buildLastUpdatedLabel(contentModTime);

  const cvAssetsContent = `// Auto-generated file - do not edit manually
// Generated by generate-cv-assets.ts from content identity and its saved date

export const CV_ASSETS = {
  de: {
    docx: "/${resolveOutputName("de", "docx", contentModTime)}",
    pdf: "/${resolveOutputName("de", "pdf", contentModTime)}",
  },
  en: {
    docx: "/${resolveOutputName("en", "docx", contentModTime)}",
    pdf: "/${resolveOutputName("en", "pdf", contentModTime)}",
  },
} as const;

export const CV_SOURCE = {
  contentDate: "${formatLocalDateStamp(contentModTime)}",
  contentHash: "${contentHash}",
} as const;

export const CV_LAST_UPDATED = {
  de: "${lastUpdatedLabel.de}",
  en: "${lastUpdatedLabel.en}",
} as const;
`;

  const cvAssetsPath = path.resolve(projectRoot, "src/generated/cv-assets.ts");
  await fs.mkdir(path.dirname(cvAssetsPath), { recursive: true });
  await fs.writeFile(cvAssetsPath, cvAssetsContent);

  console.log(`Generated CV assets configuration at ${cvAssetsPath}`);
}

try {
  await main();
} catch (error) {
  console.error("Failed to generate CV assets", error);
  process.exitCode = 1;
}
