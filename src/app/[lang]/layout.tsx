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
      title,
      description,
      url: canonicalUrl,
      siteName: "Uwe Schwarz",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: lang === "de" ? "Uwe Schwarz - Portfolio" : "Uwe Schwarz - Portfolio",
        },
      ],
      locale: lang === "de" ? "de_DE" : "en_US",
      type: "website",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    title,
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
      creator: twitterHandle,
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
