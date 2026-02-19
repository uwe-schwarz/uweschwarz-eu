import type { Metadata } from "next";

import SitemapPage from "@/app/sitemap/page";
import { SITE_URL } from "@/lib/site-config";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;

  const canonicalUrl = `${SITE_URL}/${lang}/sitemap`;

  const title = lang === "de" ? "Seitenübersicht - Uwe Schwarz" : "Sitemap - Uwe Schwarz";

  const description =
    lang === "de"
      ? "Übersicht aller Seiten auf der Website von Uwe Schwarz"
      : "Overview of all pages on Uwe Schwarz's website";

  return {
    alternates: {
      canonical: canonicalUrl,
    },
    description,
    title,
  };
}

export default SitemapPage;
