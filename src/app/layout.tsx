import type { ReactNode } from "react";
import { cookies, headers } from "next/headers";
import Script from "next/script";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { GeistPixelCircle } from "geist/font/pixel";
import { cn } from "@/lib/utils";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { detectPreferredLanguage } from "@/lib/detect-language";
import type { Language, Theme } from "@/contexts/settings-hook";
import { isSupportedLanguage } from "@/lib/i18n";

const themeInitScript = `
(() => {
  try {
    const stored = localStorage.getItem('theme');
    const explicit = stored === 'dark' || stored === 'light' ? stored : null;
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldDark = explicit ? explicit === 'dark' : !!prefersDark;
    document.documentElement.classList.toggle('dark', shouldDark);
  } catch {}
})();
`;

export default async function RootLayout({
  children,
  params,
}: Readonly<{ children: ReactNode; params: Promise<{ lang?: string }> }>) {
  const { lang: routeLang } = await params;
  const cookieStore = await cookies();
  const cookieLanguage = cookieStore.get("language")?.value as Language | undefined;
  const cookieTheme = cookieStore.get("theme")?.value as Theme | undefined;

  const headerList = await headers();

  // Guard for any non-standard header implementations (e.g. Turbopack dev)
  const acceptLanguage =
    typeof (headerList as Headers | undefined)?.get === "function"
      ? (headerList as Headers).get("accept-language")
      : null;

  const initialLanguage: Language = isSupportedLanguage(routeLang)
    ? routeLang
    : cookieLanguage === "en" || cookieLanguage === "de"
      ? cookieLanguage
      : detectPreferredLanguage(acceptLanguage);

  const initialTheme: Theme = cookieTheme === "dark" || cookieTheme === "light" ? cookieTheme : "light";

  return (
    <html
      className={cn(
        GeistSans.variable,
        GeistPixelCircle.variable,
        GeistMono.variable,
        initialTheme === "dark" && "dark",
      )}
      data-scroll-behavior="smooth"
      lang={initialLanguage}
      suppressHydrationWarning
    >
      <head>
        <meta content="same-origin" name="view-transition" />

        <Script id="theme-init" strategy="beforeInteractive">
          {themeInitScript}
        </Script>

        <link href="/us.svg" rel="icon" type="image/svg+xml" />

        <Script
          data-website-id="74cb157f-1973-4ade-a5f9-1202a8604bbb"
          src="https://cloud.umami.is/script.js"
          strategy="afterInteractive"
        />
      </head>
      <body className={cn("min-h-screen bg-background font-sans antialiased text-foreground")}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
