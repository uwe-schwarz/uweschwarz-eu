import type { Metadata } from "next";
import CvPage from "@/app/cv/page";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;

  const baseUrl = "https://uweschwarz.eu";
  const canonicalUrl = `${baseUrl}/${lang}/cv`;

  const title = lang === "de" ? "Lebenslauf - Uwe Schwarz" : "Curriculum Vitae - Uwe Schwarz";

  const description =
    lang === "de"
      ? "Lebenslauf von Uwe Schwarz - Projektmanager, IT-Sicherheitsspezialist & AI-Enthusiast"
      : "Curriculum Vitae of Uwe Schwarz - Project Manager, IT Security Specialist & AI Enthusiast";

  return {
    alternates: {
      canonical: canonicalUrl,
    },
    description,
    title,
  };
}

export default CvPage;
