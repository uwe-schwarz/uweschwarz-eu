import type { Metadata } from "next";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

import { detectPreferredLanguage } from "@/lib/detect-language";
import { DEFAULT_LANGUAGE, isSupportedLanguage, SUPPORTED_LANGUAGES } from "@/lib/i18n";
import { SITE_URL } from "@/lib/site-config";

export async function generateMetadata(): Promise<Metadata> {
  return {
    alternates: {
      languages: Object.fromEntries(SUPPORTED_LANGUAGES.map((lang) => [lang, `${SITE_URL}/${lang}`])),
    },
    description: "Portfolio of Uwe Schwarz - Project Manager, IT Security Specialist & AI Enthusiast",
    metadataBase: new URL(SITE_URL),
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
