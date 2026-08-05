import type { Metadata } from "next";
import { getLocale } from "next-intl/server";

import CvPageClient from "@/app/cv/CvPageClient";
import { SITE_URL } from "@/lib/site-config";

export async function generateMetadata(): Promise<Metadata> {
  const language = await getLocale();
  const canonicalUrl = `${SITE_URL}/${language}/cv`;

  const title = language === "de" ? "Lebenslauf - Uwe Schwarz" : "Curriculum Vitae - Uwe Schwarz";

  const description =
    language === "de"
      ? "Lebenslauf von Uwe Schwarz - Software-Architekt, Security-Engineer & AI-Enthusiast"
      : "Curriculum Vitae of Uwe Schwarz - Software Architect, Security Engineer & AI Enthusiast";

  return {
    alternates: {
      canonical: canonicalUrl,
    },
    description,
    title,
  };
}

export default function CvPage() {
  return <CvPageClient />;
}
