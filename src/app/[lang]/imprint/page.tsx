import type { Metadata } from "next";
import { getLocale } from "next-intl/server";

import ImprintPageClient from "@/app/imprint/ImprintPageClient";
import { SITE_URL } from "@/lib/site-config";

export async function generateMetadata(): Promise<Metadata> {
  const language = await getLocale();
  const canonicalUrl = `${SITE_URL}/${language}/imprint`;

  const title = language === "de" ? "Impressum - Uwe Schwarz" : "Imprint - Uwe Schwarz";

  const description =
    language === "de"
      ? "Impressum und rechtliche Informationen für die Website von Uwe Schwarz"
      : "Imprint and legal information for Uwe Schwarz's website";

  return {
    alternates: {
      canonical: canonicalUrl,
    },
    description,
    title,
  };
}

export default function ImprintPage() {
  return <ImprintPageClient />;
}
