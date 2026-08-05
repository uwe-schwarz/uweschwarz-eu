import type { Metadata } from "next";
import { getLocale } from "next-intl/server";

import PrivacyPageClient from "@/app/privacy/PrivacyPageClient";
import { SITE_URL } from "@/lib/site-config";

export async function generateMetadata(): Promise<Metadata> {
  const language = await getLocale();
  const canonicalUrl = `${SITE_URL}/${language}/privacy`;

  const title = language === "de" ? "Datenschutz - Uwe Schwarz" : "Privacy Policy - Uwe Schwarz";

  const description =
    language === "de"
      ? "Datenschutzerklärung für die Website von Uwe Schwarz"
      : "Privacy policy for Uwe Schwarz's website";

  return {
    alternates: {
      canonical: canonicalUrl,
    },
    description,
    title,
  };
}

export default function PrivacyPage() {
  return <PrivacyPageClient />;
}
