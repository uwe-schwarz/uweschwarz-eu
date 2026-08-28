import fs from "node:fs";
import fsPromises from "node:fs/promises";
import path from "node:path";
import { CV_ASSETS } from "../src/generated/cv-assets";
import { SITE_URL } from "../src/lib/site-config";

const __dirname = import.meta.dirname;

interface BunFile {
  lastModified: number;
}

interface BunRuntime {
  file: (path: string) => BunFile;
  write: (path: string, data: string) => Promise<unknown>;
}

const bunRuntime = (globalThis as typeof globalThis & { Bun?: BunRuntime }).Bun;

function getFileMtime(filePath: string) {
  if (bunRuntime) {
    return bunRuntime.file(filePath).lastModified;
  }

  try {
    return fs.statSync(filePath).mtimeMs;
  } catch {
    return 0;
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
      "src/app/[lang]/cv/page.tsx",
      "src/app/cv/CvPageClient.tsx",
      "scripts/cv/CVDocument.tsx",
      "scripts/cv/CVDocumentDocx.tsx",
    ],
    priority: 0.8,
    url: "/en/cv",
  },
  {
    files: [
      "src/content/content.ts",
      "src/app/[lang]/cv/page.tsx",
      "src/app/cv/CvPageClient.tsx",
      "scripts/cv/CVDocument.tsx",
      "scripts/cv/CVDocumentDocx.tsx",
    ],
    priority: 0.8,
    url: "/de/cv",
  },
  {
    files: [`public${CV_ASSETS.de.pdf}`],
    priority: 0.7,
    url: CV_ASSETS.de.pdf,
  },
  {
    files: [`public${CV_ASSETS.en.pdf}`],
    priority: 0.7,
    url: CV_ASSETS.en.pdf,
  },
  {
    files: [`public${CV_ASSETS.de.docx}`],
    priority: 0.7,
    url: CV_ASSETS.de.docx,
  },
  {
    files: [`public${CV_ASSETS.en.docx}`],
    priority: 0.7,
    url: CV_ASSETS.en.docx,
  },
  {
    files: [
      "src/content/content.ts",
      "src/app/[lang]/imprint/page.tsx",
      "src/app/imprint/ImprintPageClient.tsx",
      "src/components/Header.tsx",
      "src/components/Footer.tsx",
    ],
    priority: 0.5,
    url: "/en/imprint",
  },
  {
    files: [
      "src/content/content.ts",
      "src/app/[lang]/imprint/page.tsx",
      "src/app/imprint/ImprintPageClient.tsx",
      "src/components/Header.tsx",
      "src/components/Footer.tsx",
    ],
    priority: 0.5,
    url: "/de/imprint",
  },
  {
    files: [
      "src/content/content.ts",
      "src/app/[lang]/privacy/page.tsx",
      "src/app/privacy/PrivacyPageClient.tsx",
      "src/components/Header.tsx",
      "src/components/Footer.tsx",
    ],
    priority: 0.5,
    url: "/en/privacy",
  },
  {
    files: [
      "src/content/content.ts",
      "src/app/[lang]/privacy/page.tsx",
      "src/app/privacy/PrivacyPageClient.tsx",
      "src/components/Header.tsx",
      "src/components/Footer.tsx",
    ],
    priority: 0.5,
    url: "/de/privacy",
  },
  {
    files: [
      "src/app/[lang]/sitemap/page.tsx",
      "src/app/sitemap/SitemapPageClient.tsx",
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
      "src/app/[lang]/sitemap/page.tsx",
      "src/app/sitemap/SitemapPageClient.tsx",
      "src/components/Header.tsx",
      "src/components/Footer.tsx",
      "src/content/content.ts",
    ],
    priority: 0.3,
    url: "/en/sitemap",
  },
  {
    files: [
      "src/app/[lang]/sitemap/page.tsx",
      "src/app/sitemap/SitemapPageClient.tsx",
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
    const mtime = getFileMtime(path.join(__dirname, "..", file));
    if (mtime > latest) {
      latest = mtime;
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
    <loc>${SITE_URL}${url}</loc>
    <lastmod>${getLatestMtime(files)}</lastmod>
    <priority>${priority}</priority>
  </url>
`,
  )
  .join("")}
</urlset>`;

const outputPath = path.join(__dirname, "../public/sitemap.xml");
if (bunRuntime) {
  await bunRuntime.write(outputPath, xml);
} else {
  await fsPromises.writeFile(outputPath, xml);
}
console.log("sitemap.xml generated!");
