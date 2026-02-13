import type { Metadata } from "next";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

import { detectPreferredLanguage } from "@/lib/detect-language";
import { DEFAULT_LANGUAGE, isSupportedLanguage } from "@/lib/i18n";

export async function generateMetadata(): Promise<Metadata> {
  const siteUrl = "https://uweschwarz.eu";

  return {
    alternates: {
      languages: {
        de: `${siteUrl}/de`,
        en: `${siteUrl}/en`,
      },
    },
    description: "Portfolio of Uwe Schwarz - Project Manager, IT Security Specialist & AI Enthusiast",
    metadataBase: new URL(siteUrl),
    title: "Uwe Schwarz - Project Manager, IT Security Specialist & AI Enthusiast",
  };
}

export default async function RootPage() {
  const cookieStore = await cookies();
  const cookieLanguage = cookieStore.get("language")?.value;

  if (isSupportedLanguage(cookieLanguage)) {
    redirect(`/${cookieLanguage}`);
  }

  const headerList = await headers();
  const acceptLanguage = headerList.get("accept-language");
  const detected = detectPreferredLanguage(acceptLanguage) ?? DEFAULT_LANGUAGE;

  redirect(`/${detected}`);
}
