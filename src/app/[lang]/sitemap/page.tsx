import type { Metadata } from "next";
import { getLocale } from "next-intl/server";

import SitemapPageClient from "@/app/sitemap/SitemapPageClient";
import { SITE_URL } from "@/lib/site-config";

export async function generateMetadata(): Promise<Metadata> {
  const language = await getLocale();
  const canonicalUrl = `${SITE_URL}/${language}/sitemap`;

  const title = language === "de" ? "Seitenübersicht - Uwe Schwarz" : "Sitemap - Uwe Schwarz";

  const description =
    language === "de"
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

export default function SitemapPage() {
  return <SitemapPageClient />;
}
