import type { ReactNode } from "react";
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
    <ProvidersClient initialLanguage={initialLanguage} initialTheme={initialTheme}>
      {children}
    </ProvidersClient>
  );
}
