import type { ReactNode } from "react";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

import Providers from "@/app/providers";
import type { Language, Theme } from "@/contexts/settings-hook";
import { isSupportedLanguage, SUPPORTED_LANGUAGES } from "@/lib/i18n";

export const dynamicParams = false;

export function generateStaticParams(): { lang: Language }[] {
  return SUPPORTED_LANGUAGES.map((lang) => ({ lang }));
}

export default async function LangLayout({
  children,
  params,
}: Readonly<{ children: ReactNode; params: Promise<{ lang: string }> }>) {
  const { lang } = await params;
  if (!isSupportedLanguage(lang)) {
    notFound();
  }

  const cookieStore = await cookies();
  const cookieTheme = cookieStore.get("theme")?.value as Theme | undefined;
  const initialTheme: Theme = cookieTheme === "dark" || cookieTheme === "light" ? cookieTheme : "light";

  return (
    <Providers initialLanguage={lang} initialTheme={initialTheme}>
      {children}
    </Providers>
  );
}


