import { cookies, headers } from "next/headers";
import Link from "next/link";
import Script from "next/script";
import type { Metadata } from "next";

import { resolveInitialTheme, themeInitScript } from "@/app/document-preferences";
import { fontVariables } from "@/app/fonts";
import { DEFAULT_LANGUAGE, isSupportedLanguage, ROUTE_LANGUAGE_HEADER } from "@/lib/i18n";
import { NONCE_HEADER } from "@/lib/security/csp";
import { cn } from "@/lib/utils";
import "./globals.css";

export const metadata: Metadata = {
  description: "The requested page does not exist.",
  title: "404 - Page not found",
};

export default async function GlobalNotFound() {
  const [cookieStore, headerList] = await Promise.all([cookies(), headers()]);
  const routeLanguage = headerList.get(ROUTE_LANGUAGE_HEADER);
  const language = isSupportedLanguage(routeLanguage) ? routeLanguage : DEFAULT_LANGUAGE;
  const initialTheme = resolveInitialTheme(cookieStore.get("theme")?.value);
  const cspNonce = headerList.get(NONCE_HEADER) ?? undefined;
  const message = language === "de" ? "Diese Seite wurde nicht gefunden." : "This page doesn't exist.";
  const homeLabel = language === "de" ? "Zur Startseite" : "Back to home";
  const note = language === "de" ? "nicht im Bauplan eingezeichnet" : "this room isn't on the blueprint";

  return (
    <html
      className={cn(fontVariables, initialTheme === "dark" && "dark")}
      data-scroll-behavior="smooth"
      lang={language}
      suppressHydrationWarning
    >
      <head>
        <Script id="theme-init" nonce={cspNonce} strategy="beforeInteractive">
          {themeInitScript}
        </Script>
        <link href="/us.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        <main className="blueprint-grid flex min-h-dvh items-center justify-center px-4">
          <div className="max-w-xl text-center">
            <p className="type-display text-[7rem] leading-none text-primary sm:text-[10rem]">404</p>
            <h1 className="mt-6 text-3xl sm:text-4xl">{message}</h1>
            <p className="redline-note mt-4 -rotate-2">{note}</p>
            <Link
              className="mt-10 inline-flex h-12 items-center rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              href={`/${language}`}
            >
              {homeLabel}
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}

GlobalNotFound.displayName = "GlobalNotFound";
