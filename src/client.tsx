import { hydrateRoot } from "react-dom/client";

import { PageFrame } from "@/app/PageFrame";
import { isSupportedLanguage } from "@/lib/i18n";

const pages = {
  "404": () => import("@/app/NotFoundPage"),
  cv: () => import("@/app/cv/CvPageClient"),
  home: () => import("@/app/HomePage"),
  imprint: () => import("@/app/imprint/ImprintPageClient"),
  privacy: () => import("@/app/privacy/PrivacyPageClient"),
  sitemap: () => import("@/app/sitemap/SitemapPageClient"),
};

const root = document.getElementById("site-root");
const page = document.documentElement.dataset.page;
const language = document.documentElement.lang;

if (root && page && Object.hasOwn(pages, page) && isSupportedLanguage(language)) {
  const { default: Page } = await pages[page as keyof typeof pages]();
  hydrateRoot(
    root,
    <PageFrame language={language} pathname={document.documentElement.dataset.pathname ?? "/"}>
      <Page />
    </PageFrame>,
  );
}
