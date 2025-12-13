import type { ReactNode } from "react";
import Script from "next/script";
import { Public_Sans, Space_Grotesk } from "next/font/google";
import { cn } from "@/lib/utils";
import { Analytics } from '@vercel/analytics/next';
import "./globals.css";
import Providers from "./providers";
import type { Language } from "@/contexts/settings-hook";

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

const title = "Uwe Schwarz - Project Manager, IT Security Specialist & AI Enthusiast";
const description =
  "Portfolio of Uwe Schwarz - Project Manager, IT Security Specialist & AI Enthusiast";
const siteUrl = "https://uweschwarz.eu";
const ogImage = `${siteUrl}/profile.webp`;
const twitterHandle = "@e38383";

const defaultLanguage: Language = "en";

const clientPreferenceScript = `(() => {
  const root = document.documentElement;

  const getLanguage = () => {
    const stored = localStorage.getItem("language");
    if (stored === "en" || stored === "de") return stored;

    const navigatorLanguage = navigator.language?.substring(0, 2).toLowerCase();
    return navigatorLanguage === "de" ? "de" : "en";
  };

  const getTheme = () => {
    const stored = localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") return stored;

    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  };

  try {
    const language = getLanguage();
    root.setAttribute("lang", language);

    const theme = getTheme();
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  } catch (error) {
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      root.classList.add("dark");
    }
  }
})();`;

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html
      lang={defaultLanguage}
      suppressHydrationWarning
      className={cn(publicSans.variable, spaceGrotesk.variable)}
    >
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="view-transition" content="same-origin" />

        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="author" content="Uwe Schwarz" />
        <link rel="canonical" href={siteUrl} />

        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:image" content={ogImage} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content={twitterHandle} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />

        <link rel="icon" type="image/svg+xml" href="/us.svg" />

        <script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="74cb157f-1973-4ade-a5f9-1202a8604bbb"
        />
      </head>
      <body className={cn("min-h-screen bg-background font-sans antialiased text-foreground")}>
        <Script
          id="client-preferences"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: clientPreferenceScript }}
        />
        <Providers initialLanguage={defaultLanguage}>{children}</Providers>
        <Analytics />
      </body>
    </html>
  );
}
