import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseUrl = "https://uweschwarz.eu"; // Change to your domain

// Generate CV asset paths dynamically to match the generate-cv-assets.ts script
function generateCvAssetPath(language: "en" | "de", extension: "pdf" | "docx") {
  // Get the content modification time to match the CV asset generation
  const contentPath = path.join(__dirname, "..", "src/content/content.ts");
  try {
    const stats = fs.statSync(contentPath);
    const date = stats.mtime.toISOString().split("T")[0]; // YYYY-MM-DD format
    return `/uwe-schwarz-cv-${language}-${date}.${extension}`;
  } catch {
    // Fallback to current date if content file not found
    const date = new Date().toISOString().split("T")[0]; // YYYY-MM-DD format
    return `/uwe-schwarz-cv-${language}-${date}.${extension}`;
  }
}

const urls = [
  {
    files: [
      "src/content/content.ts",
      "src/app/[lang]/page.tsx",
      "src/components/Header.tsx",
      "src/components/HeroSection.tsx",
      "src/components/AboutSection.tsx",
      "src/components/ExperienceSection.tsx",
      "src/components/ProjectsSection.tsx",
      "src/components/SkillsSection.tsx",
      "src/components/ContactSection.tsx",
      "src/components/Footer.tsx",
    ],
    priority: 1.0,
    url: "/en",
  },
  {
    files: [
      "src/content/content.ts",
      "src/app/[lang]/page.tsx",
      "src/components/Header.tsx",
      "src/components/HeroSection.tsx",
      "src/components/AboutSection.tsx",
      "src/components/ExperienceSection.tsx",
      "src/components/ProjectsSection.tsx",
      "src/components/SkillsSection.tsx",
      "src/components/ContactSection.tsx",
      "src/components/Footer.tsx",
    ],
    priority: 1.0,
    url: "/de",
  },
  {
    files: [
      "src/content/content.ts",
      "src/app/cv/page.tsx",
      "src/app/[lang]/cv/page.tsx",
      "scripts/cv/CVDocument.tsx",
      "scripts/cv/CVDocumentDocx.tsx",
    ],
    priority: 0.8,
    url: "/en/cv",
  },
  {
    files: [
      "src/content/content.ts",
      "src/app/cv/page.tsx",
      "src/app/[lang]/cv/page.tsx",
      "scripts/cv/CVDocument.tsx",
      "scripts/cv/CVDocumentDocx.tsx",
    ],
    priority: 0.8,
    url: "/de/cv",
  },
  {
    files: ["src/content/content.ts"],
    priority: 0.7,
    url: generateCvAssetPath("de", "pdf"),
  },
  {
    files: ["src/content/content.ts"],
    priority: 0.7,
    url: generateCvAssetPath("en", "pdf"),
  },
  {
    files: ["src/content/content.ts"],
    priority: 0.7,
    url: generateCvAssetPath("de", "docx"),
  },
  {
    files: ["src/content/content.ts"],
    priority: 0.7,
    url: generateCvAssetPath("en", "docx"),
  },
  {
    files: [
      "src/content/content.ts",
      "src/app/imprint/page.tsx",
      "src/app/[lang]/imprint/page.tsx",
      "src/components/Header.tsx",
      "src/components/Footer.tsx",
    ],
    priority: 0.5,
    url: "/en/imprint",
  },
  {
    files: [
      "src/content/content.ts",
      "src/app/imprint/page.tsx",
      "src/app/[lang]/imprint/page.tsx",
      "src/components/Header.tsx",
      "src/components/Footer.tsx",
    ],
    priority: 0.5,
    url: "/de/imprint",
  },
  {
    files: [
      "src/content/content.ts",
      "src/app/privacy/page.tsx",
      "src/app/[lang]/privacy/page.tsx",
      "src/components/Header.tsx",
      "src/components/Footer.tsx",
    ],
    priority: 0.5,
    url: "/en/privacy",
  },
  {
    files: [
      "src/content/content.ts",
      "src/app/privacy/page.tsx",
      "src/app/[lang]/privacy/page.tsx",
      "src/components/Header.tsx",
      "src/components/Footer.tsx",
    ],
    priority: 0.5,
    url: "/de/privacy",
  },
  {
    files: [
      "src/app/sitemap/page.tsx",
      "src/app/[lang]/sitemap/page.tsx",
      "src/app/[lang]/page.tsx",
      "src/components/Header.tsx",
      "src/components/Footer.tsx",
      "src/content/content.ts",
    ],
    priority: 0.3,
    url: "/sitemap.xml",
  },
  {
    files: [
      "src/app/sitemap/page.tsx",
      "src/app/[lang]/sitemap/page.tsx",
      "src/components/Header.tsx",
      "src/components/Footer.tsx",
      "src/content/content.ts",
    ],
    priority: 0.3,
    url: "/en/sitemap",
  },
  {
    files: [
      "src/app/sitemap/page.tsx",
      "src/app/[lang]/sitemap/page.tsx",
      "src/components/Header.tsx",
      "src/components/Footer.tsx",
      "src/content/content.ts",
    ],
    priority: 0.3,
    url: "/de/sitemap",
  },
  {
    files: ["src/content/content.ts"],
    priority: 0.3,
    url: "/llms.txt",
  },
];

function getLatestMtime(files: Array<string>) {
  let latest = 0;
  for (const file of files) {
    try {
      const stats = fs.statSync(path.join(__dirname, "..", file));
      if (stats.mtimeMs > latest) {
        latest = stats.mtimeMs;
      }
    } catch {
      // File might not exist yet, skip
    }
  }
  return latest ? new Date(latest).toISOString().split("T")[0] : new Date().toISOString().split("T")[0];
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    ({ files, priority, url }) => `
  <url>
    <loc>${baseUrl}${url}</loc>
    <lastmod>${getLatestMtime(files)}</lastmod>
    <priority>${priority}</priority>
  </url>
`,
  )
  .join("")}
</urlset>`;

fs.writeFileSync(path.join(__dirname, "../public/sitemap.xml"), xml);
console.log("sitemap.xml generated!");
