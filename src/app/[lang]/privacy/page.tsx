import type { Metadata } from "next";
import PrivacyPage from "@/app/privacy/page";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;

  const baseUrl = "https://uweschwarz.eu";
  const canonicalUrl = `${baseUrl}/${lang}/privacy`;

  const title = lang === "de" ? "Datenschutz - Uwe Schwarz" : "Privacy Policy - Uwe Schwarz";

  const description =
    lang === "de" ? "Datenschutzerklärung für die Website von Uwe Schwarz" : "Privacy policy for Uwe Schwarz's website";

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default PrivacyPage;
