import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site-config";
import ClientComponents from "./client-components";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;

  const canonicalUrl = `${SITE_URL}/${lang}`;

  const title =
    lang === "de"
      ? "Uwe Schwarz - Projektmanager, IT-Sicherheitsspezialist & AI-Enthusiast"
      : "Uwe Schwarz - Project Manager, IT Security Specialist & AI Enthusiast";

  const description =
    lang === "de"
      ? "Portfolio von Uwe Schwarz - Projektmanager, IT-Sicherheitsspezialist & AI-Enthusiast"
      : "Portfolio of Uwe Schwarz - Project Manager, IT Security Specialist & AI Enthusiast";

  return {
    alternates: {
      canonical: canonicalUrl,
    },
    description,
    title,
  };
}

export default function HomePage() {
  return <ClientComponents />;
}
