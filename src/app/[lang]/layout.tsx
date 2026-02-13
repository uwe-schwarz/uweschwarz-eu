import type { ReactNode } from "react";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import Providers from "@/app/providers";
import type { Language, Theme } from "@/contexts/settings-hook";
import { isSupportedLanguage, SUPPORTED_LANGUAGES } from "@/lib/i18n";

export const dynamicParams = false;

export function generateStaticParams(): Array<{ lang: Language }> {
  return SUPPORTED_LANGUAGES.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;

  if (!isSupportedLanguage(lang)) {
    return {};
  }

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

  const ogImage = `${baseUrl}/profile.webp`;
  const twitterHandle = "@e38383";

  // Generate hreflang links for all supported languages
  const alternates = {
    canonical: canonicalUrl,
    languages: Object.fromEntries(
      SUPPORTED_LANGUAGES.map((supportedLang) => [supportedLang, `${baseUrl}/${supportedLang}`]),
    ),
  };

  return {
    alternates,
    description,
    metadataBase: new URL(baseUrl),
    openGraph: {
      description,
      images: [
        {
          alt: "Uwe Schwarz - Portfolio",
          height: 630,
          url: ogImage,
          width: 1200,
        },
      ],
      locale: lang === "de" ? "de_DE" : "en_US",
      siteName: "Uwe Schwarz",
      title,
      type: "website",
      url: canonicalUrl,
    },
    robots: {
      follow: true,
      googleBot: {
        follow: true,
        index: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
      index: true,
    },
    title,
    twitter: {
      card: "summary_large_image",
      creator: twitterHandle,
      description,
      images: [ogImage],
      title,
    },
  };
}

export default async function LangLayout({
  children,
  params,
}: Readonly<{ children: ReactNode; params: Promise<{ lang: string }> }>) {
  const { lang } = await params;
  if (!isSupportedLanguage(lang)) {
    notFound();
  }

  const cookieStore = await cookies();
  const cookieTheme = cookieStore.get("theme")?.value as Theme | undefined;
  const initialTheme: Theme = cookieTheme === "dark" || cookieTheme === "light" ? cookieTheme : "light";

  return (
    <Providers initialLanguage={lang} initialTheme={initialTheme}>
      {children}
    </Providers>
  );
}
