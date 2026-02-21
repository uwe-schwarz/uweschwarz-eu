import type { Metadata } from "next";
import { cookies, headers } from "next/headers";
import type { Language } from "@/contexts/settings-hook";
import { detectPreferredLanguage } from "@/lib/detect-language";
import { isSupportedLanguage } from "@/lib/i18n";
import ImprintPageClient from "@/app/imprint/ImprintPageClient";

export async function generateMetadata(): Promise<Metadata> {
  const [cookieStore, headerList] = await Promise.all([cookies(), headers()]);
  const cookieLanguage = cookieStore.get("language")?.value as Language | undefined;
  const acceptLanguage = headerList.get("accept-language");

  const language: Language = isSupportedLanguage(cookieLanguage)
    ? cookieLanguage
    : detectPreferredLanguage(acceptLanguage);

  return language === "de"
    ? {
        description: "Impressum und rechtliche Informationen für die Website von Uwe Schwarz",
        title: "Impressum - Uwe Schwarz",
      }
    : {
        description: "Imprint and legal information for Uwe Schwarz's website",
        title: "Imprint - Uwe Schwarz",
      };
}

export default function ImprintPage() {
  return <ImprintPageClient />;
}
