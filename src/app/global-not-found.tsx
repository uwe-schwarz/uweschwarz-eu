import { cookies, headers } from "next/headers";
import Link from "next/link";
import Script from "next/script";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { GeistPixelCircle } from "geist/font/pixel";

import { resolveInitialTheme, themeInitScript } from "@/app/document-preferences";
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
  const message = language === "de" ? "Diese Seite wurde nicht gefunden." : "Oops! Page not found";
  const homeLabel = language === "de" ? "Zur Startseite" : "Return to Home";

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
        <Script id="theme-init" nonce={cspNonce} strategy="beforeInteractive">
          {themeInitScript}
        </Script>
        <link href="/us.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        <main className="flex min-h-dvh items-center justify-center bg-muted/40">
          <div className="text-center">
            <h1 className="mb-4 text-4xl">404</h1>
            <p className="mb-4 text-xl text-muted-foreground">{message}</p>
            <Link className="text-primary underline underline-offset-4" href={`/${language}`}>
              {homeLabel}
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}

GlobalNotFound.displayName = "GlobalNotFound";
