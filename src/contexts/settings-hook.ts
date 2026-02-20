"use client";

import { createContext, useContext } from "react";
import type { LocalizedString } from "@/lib/localization";

export type Language = "en" | "de";
export type Theme = "light" | "dark";

interface SettingsContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  setTheme: (theme: Theme) => void;
  t: (text: LocalizedString) => string;
  theme: Theme;
}

export const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const useSettings = (): SettingsContextType => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
};
