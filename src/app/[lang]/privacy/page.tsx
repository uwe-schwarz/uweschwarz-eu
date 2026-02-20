import type { Metadata } from "next";

import PrivacyPage from "@/app/privacy/page";
import { SITE_URL } from "@/lib/site-config";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;

  const canonicalUrl = `${SITE_URL}/${lang}/privacy`;

  const title = lang === "de" ? "Datenschutz - Uwe Schwarz" : "Privacy Policy - Uwe Schwarz";

  const description =
    lang === "de" ? "Datenschutzerklärung für die Website von Uwe Schwarz" : "Privacy policy for Uwe Schwarz's website";

  return {
    alternates: {
      canonical: canonicalUrl,
    },
    description,
    title,
  };
}

export default PrivacyPage;
