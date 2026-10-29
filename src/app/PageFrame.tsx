import type { ReactNode } from "react";

import { Toaster } from "@/components/ui/toaster";
import { SettingsProvider } from "@/contexts/SettingsContext";
import type { Language } from "@/contexts/settings-hook";
import { PathnameContext } from "@/i18n/navigation";

export function PageFrame({
  children,
  language,
  pathname,
}: {
  children: ReactNode;
  language: Language;
  pathname: string;
}) {
  return (
    <PathnameContext value={pathname}>
      <SettingsProvider initialTheme="light" language={language}>
        {children}
        <Toaster />
      </SettingsProvider>
    </PathnameContext>
  );
}
