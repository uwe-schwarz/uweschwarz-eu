import { cookies, headers } from "next/headers";
import Script from "next/script";
import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { GeistPixelCircle } from "geist/font/pixel";

import { resolveInitialTheme, themeInitScript } from "@/app/document-preferences";
import Providers from "@/app/providers";
import DeferredAnalytics from "@/components/DeferredAnalytics";
import { siteContent } from "@/content/content";
import type { Language } from "@/contexts/settings-hook";
import { SUPPORTED_LANGUAGES } from "@/lib/i18n";
import { NONCE_HEADER } from "@/lib/security/csp";
import { SITE_URL } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import "../globals.css";

export const dynamicParams = false;

export function generateStaticParams(): Array<{ lang: Language }> {
  return SUPPORTED_LANGUAGES.map((lang) => ({ lang }));
}

const heroTitleSeparators = {
  de: { final: " & ", separator: ", " },
  en: { final: " & ", separator: ", " },
} satisfies Record<Language, { final: string; separator: string }>;

function buildLocalizedHeroTitle(language: Language): string {
  const titleElements = siteContent.hero.titleElements.slice(0, 3).map((element) => element[language]);
  const { final, separator } = heroTitleSeparators[language];

  if (titleElements.length <= 1) {
    return titleElements.join("");
  }

  return `${titleElements.slice(0, -1).join(separator)}${final}${titleElements.at(-1) ?? ""}`;
}

export async function generateMetadata(): Promise<Metadata> {
  const language = await getLocale();
  const canonicalUrl = `${SITE_URL}/${language}`;
  const title = `${siteContent.siteMetadata.author} - ${buildLocalizedHeroTitle(language)}`;
  const description = siteContent.siteMetadata.description[language];
  const ogImage = `${SITE_URL}/profile.webp`;
  const twitterHandle = "@e38383";

  return {
    alternates: {
      canonical: canonicalUrl,
      languages: Object.fromEntries(
        SUPPORTED_LANGUAGES.map((supportedLanguage) => [supportedLanguage, `${SITE_URL}/${supportedLanguage}`]),
      ),
    },
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
      locale: language === "de" ? "de_DE" : "en_US",
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

export default async function RootLayout({ children }: Readonly<LayoutProps<"/[lang]">>) {
  const [language, cookieStore, headerList] = await Promise.all([getLocale(), cookies(), headers()]);
  const initialTheme = resolveInitialTheme(cookieStore.get("theme")?.value);
  const cspNonce = headerList.get(NONCE_HEADER) ?? undefined;

  return (
    <html
      className={cn(
        GeistSans.variable,
        GeistPixelCircle.variable,
        GeistMono.variable,
        initialTheme === "dark" && "dark",
      )}
      data-scroll-behavior="smooth"
      lang={language}
      suppressHydrationWarning
    >
      <head>
        <meta content="same-origin" name="view-transition" />

        <Script id="theme-init" nonce={cspNonce} strategy="beforeInteractive">
          {themeInitScript}
        </Script>

        <link href="/us.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body className={cn("min-h-screen bg-background font-sans antialiased text-foreground")}>
        <Providers initialLanguage={language} initialTheme={initialTheme}>
          {children}
        </Providers>
        <DeferredAnalytics />
      </body>
    </html>
  );
}

RootLayout.displayName = "RootLayout";
