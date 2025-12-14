import type { ReactNode } from "react";
import { cookies, headers } from "next/headers";
import { Public_Sans, Space_Grotesk } from "next/font/google";
import { cn } from "@/lib/utils";
import { Analytics } from '@vercel/analytics/next';
import "./globals.css";
import { detectPreferredLanguage } from "@/lib/detect-language";
import type { Language, Theme } from "@/contexts/settings-hook";
import { isSupportedLanguage } from "@/lib/i18n";

const publicSans = Public_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-sans",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-display",
});

const siteUrl = "https://uweschwarz.eu";

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
      lang={initialLanguage}
      suppressHydrationWarning
      className={cn(publicSans.variable, spaceGrotesk.variable, initialTheme === "dark" && "dark")}
      data-scroll-behavior="smooth"
    >
      <head>
        <meta name="view-transition" content="same-origin" />

        <script
          // Ensure the initial theme class matches user preference before React hydration.
          // This prevents a flash and keeps the visual theme correct on first paint.
          dangerouslySetInnerHTML={{
            __html: `
(() => {
  try {
    const stored = localStorage.getItem('theme');
    const explicit = stored === 'dark' || stored === 'light' ? stored : null;
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldDark = explicit ? explicit === 'dark' : !!prefersDark;
    document.documentElement.classList.toggle('dark', shouldDark);
  } catch {}
})();`,
          }}
        />

        <link rel="icon" type="image/svg+xml" href="/us.svg" />

        <script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="74cb157f-1973-4ade-a5f9-1202a8604bbb"
        />
      </head>
      <body className={cn("min-h-screen bg-background font-sans antialiased text-foreground")}>
        {children}
        <Analytics />;
      </body>
    </html>
  );
}
