import type { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";

import ProvidersClient from "./providers.client";
import type { Language, Theme } from "@/contexts/settings-hook";

export default function Providers({
  children,
  initialLanguage,
  initialTheme,
}: {
  children: ReactNode;
  initialLanguage: Language;
  initialTheme: Theme;
}) {
  return (
    <NextIntlClientProvider locale={initialLanguage} messages={{}}>
      <ProvidersClient initialTheme={initialTheme}>{children}</ProvidersClient>
    </NextIntlClientProvider>
  );
}
