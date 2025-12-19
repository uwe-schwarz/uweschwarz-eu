import type { Metadata } from "next";
import ImprintPage from "@/app/imprint/page";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;

  const baseUrl = "https://uweschwarz.eu";
  const canonicalUrl = `${baseUrl}/${lang}/imprint`;

  const title = lang === "de" ? "Impressum - Uwe Schwarz" : "Imprint - Uwe Schwarz";

  const description =
    lang === "de"
      ? "Impressum und rechtliche Informationen für die Website von Uwe Schwarz"
      : "Imprint and legal information for Uwe Schwarz's website";

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default ImprintPage;
