import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import type { LangLayoutProps } from "@/app/layout-props";
import Providers from "@/app/providers";
import { siteContent } from "@/content/content";
import type { Language, Theme } from "@/contexts/settings-hook";
import { isSupportedLanguage, SUPPORTED_LANGUAGES } from "@/lib/i18n";
import { SITE_URL } from "@/lib/site-config";

export const dynamicParams = false;

export function generateStaticParams(): Array<{ lang: Language }> {
  return SUPPORTED_LANGUAGES.map((lang) => ({ lang }));
}

const heroTitleSeparators = {
  de: { final: " & ", separator: ", " },
  en: { final: " & ", separator: ", " },
} satisfies Record<Language, { final: string; separator: string }>;

function buildLocalizedHeroTitle(lang: Language): string {
  const titleElements = siteContent.hero.titleElements.slice(0, 3).map((element) => element[lang]);
  const { final, separator } = heroTitleSeparators[lang];

  if (titleElements.length <= 1) {
    return titleElements.join("");
  }

  return `${titleElements.slice(0, -1).join(separator)}${final}${titleElements.at(-1) ?? ""}`;
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;

  if (!isSupportedLanguage(lang)) {
    return {};
  }

  const canonicalUrl = `${SITE_URL}/${lang}`;
  const title = `${siteContent.siteMetadata.author} - ${buildLocalizedHeroTitle(lang)}`;
  const description = siteContent.siteMetadata.description[lang];

  const ogImage = `${SITE_URL}/profile.webp`;
  const twitterHandle = "@e38383";

  // Generate hreflang links for all supported languages
  const alternates = {
    canonical: canonicalUrl,
    languages: Object.fromEntries(
      SUPPORTED_LANGUAGES.map((supportedLang) => [supportedLang, `${SITE_URL}/${supportedLang}`]),
    ),
  };

  return {
    alternates,
    description,
    metadataBase: new URL(SITE_URL),
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

export default async function LangLayout({ children, params }: Readonly<LangLayoutProps>) {
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

LangLayout.displayName = "LangLayout";
