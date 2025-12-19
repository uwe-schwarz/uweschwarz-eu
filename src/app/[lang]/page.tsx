import type { Metadata } from "next";
import ClientComponents from "./client-components";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;

  const baseUrl = "https://uweschwarz.eu";
  const canonicalUrl = `${baseUrl}/${lang}`;

  const title =
    lang === "de"
      ? "Uwe Schwarz - Projektmanager, IT-Sicherheitsspezialist & AI-Enthusiast"
      : "Uwe Schwarz - Project Manager, IT Security Specialist & AI Enthusiast";

  const description =
    lang === "de"
      ? "Portfolio von Uwe Schwarz - Projektmanager, IT-Sicherheitsspezialist & AI-Enthusiast"
      : "Portfolio of Uwe Schwarz - Project Manager, IT Security Specialist & AI Enthusiast";

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default function HomePage() {
  return <ClientComponents />;
}
