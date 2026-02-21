import { cookies, headers } from "next/headers";
import Script from "next/script";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { GeistPixelCircle } from "geist/font/pixel";
import { cn } from "@/lib/utils";
import "./globals.css";
import type { RootLayoutProps } from "@/app/layout-props";
import DeferredAnalytics from "@/components/DeferredAnalytics";
import { detectPreferredLanguage } from "@/lib/detect-language";
import type { Language, Theme } from "@/contexts/settings-hook";
import { isSupportedLanguage } from "@/lib/i18n";
import { LEGACY_STORAGE_KEYS, STORAGE_KEYS } from "@/lib/persisted-preferences";

// NOTE: This beforeInteractive script runs before React and cannot import
// persisted-preferences.ts. Keep migration behavior and key format in sync with
// readStorageValue using STORAGE_KEYS.theme and LEGACY_STORAGE_KEYS.theme.
const themeInitScript = `
(() => {
  try {
    const storageKey = '${STORAGE_KEYS.theme}';
    const legacyKey = '${LEGACY_STORAGE_KEYS.theme}';
    const versionedValue = localStorage.getItem(storageKey);
    const legacyValue = localStorage.getItem(legacyKey);
    const stored = versionedValue ?? legacyValue;

    if (!versionedValue && legacyValue) {
      try {
        localStorage.setItem(storageKey, legacyValue);
        localStorage.removeItem(legacyKey);
      } catch {}
    }

    const explicit = stored === 'dark' || stored === 'light' ? stored : null;
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldDark = explicit ? explicit === 'dark' : !!prefersDark;
    document.documentElement.classList.toggle('dark', shouldDark);
  } catch {}
})();
`;

export default async function RootLayout({ children, params }: Readonly<RootLayoutProps>) {
  const [{ lang: routeLang }, cookieStore, headerList] = await Promise.all([params, cookies(), headers()]);
  const cookieLanguage = cookieStore.get("language")?.value as Language | undefined;
  const cookieTheme = cookieStore.get("theme")?.value as Theme | undefined;

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
        <DeferredAnalytics />
      </body>
    </html>
  );
}

RootLayout.displayName = "RootLayout";
