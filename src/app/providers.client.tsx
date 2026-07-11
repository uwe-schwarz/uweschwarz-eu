"use client";

import type { ReactNode } from "react";
import { SettingsProvider } from "@/contexts/SettingsContext";
import { Toaster } from "@/components/ui/toaster";
import type { Language, Theme } from "@/contexts/settings-hook";

export default function ProvidersClient({
  children,
  initialLanguage,
  initialTheme,
}: {
  children: ReactNode;
  initialLanguage: Language;
  initialTheme: Theme;
}) {
  return (
    <SettingsProvider initialLanguage={initialLanguage} initialTheme={initialTheme}>
      {children}
      <Toaster />
    </SettingsProvider>
  );
}
