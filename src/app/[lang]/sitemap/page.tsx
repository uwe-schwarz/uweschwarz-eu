import type { Metadata } from "next";
import SitemapPage from "@/app/sitemap/page";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;

  const baseUrl = "https://uweschwarz.eu";
  const canonicalUrl = `${baseUrl}/${lang}/sitemap`;

  const title = lang === "de"
    ? "Seitenübersicht - Uwe Schwarz"
    : "Sitemap - Uwe Schwarz";

  const description = lang === "de"
    ? "Übersicht aller Seiten auf der Website von Uwe Schwarz"
    : "Overview of all pages on Uwe Schwarz's website";

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default SitemapPage;


