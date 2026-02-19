"use client";

import React, { useEffect, useSyncExternalStore } from "react";
import type { LocalizedString } from "@/lib/localization";
import { translateLocalizedString } from "@/lib/localization";
import { SettingsContext, type Language, type Theme } from "./settings-hook";

interface SettingsProviderProps {
  children: React.ReactNode;
  initialLanguage: Language;
  initialTheme: Theme;
}

const SETTINGS_CHANGED_EVENT = "settings-changed";

const setClientCookie = (name: string, value: string) => {
  if (typeof document === "undefined") {
    return;
  }
  // 1 year, lax, site-wide. (No `secure` so this also works on localhost)
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=31536000; samesite=lax`;
};

export const SettingsProvider: React.FC<SettingsProviderProps> = ({ children, initialLanguage, initialTheme }) => {
  // IMPORTANT: Keep hydration deterministic.
  // `useSyncExternalStore` lets React use the server snapshot during hydration,
  // and then update to client preferences (localStorage / system) after hydration,
  // without causing hydration mismatches.
  const subscribe = (onStoreChange: () => void) => {
    if (typeof window === "undefined") {
      return () => undefined;
    }

    const mql = window.matchMedia?.("(prefers-color-scheme: dark)");
    const onMqlChange = () => onStoreChange();

    window.addEventListener("storage", onStoreChange);
    window.addEventListener(SETTINGS_CHANGED_EVENT, onStoreChange);
    mql?.addEventListener?.("change", onMqlChange);

    return () => {
      window.removeEventListener("storage", onStoreChange);
      window.removeEventListener(SETTINGS_CHANGED_EVENT, onStoreChange);
      mql?.removeEventListener?.("change", onMqlChange);
    };
  };

  const getLanguageSnapshot = (): Language => {
    try {
      const saved = localStorage.getItem("language") as Language | null;
      if (saved === "en" || saved === "de") {
        return saved;
      }
    } catch {
      // ignore
    }
    return initialLanguage;
  };

  const getThemeSnapshot = (): Theme => {
    try {
      const saved = localStorage.getItem("theme") as Theme | null;
      if (saved === "light" || saved === "dark") {
        return saved;
      }
    } catch {
      // ignore
    }

    try {
      return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    } catch {
      // ignore
    }

    return initialTheme;
  };

  const language = useSyncExternalStore(subscribe, getLanguageSnapshot, () => initialLanguage);
  const theme = useSyncExternalStore(subscribe, getThemeSnapshot, () => initialTheme);

  // Keep <html lang> in sync with current language
  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }
    document.documentElement.setAttribute("lang", language);
  }, [language]);

  // Sync theme to DOM + localStorage
  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }
    const root = window.document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  // Language setting function
  const setLanguage = (lang: Language) => {
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("language", lang);
    }
    setClientCookie("language", lang);
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event(SETTINGS_CHANGED_EVENT));
    }
  };

  // Theme setting function
  const setTheme = (theme: Theme) => {
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("theme", theme);
    }
    setClientCookie("theme", theme);
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event(SETTINGS_CHANGED_EVENT));
    }
  };

  // Translation helper
  const t = (text: LocalizedString): string => translateLocalizedString(text, language);

  return (
    <SettingsContext.Provider value={{ language, setLanguage, setTheme, t, theme }}>
      {children}
    </SettingsContext.Provider>
  );
};
// Ensure useSettings is NOT re-exported or defined here.
// It should be imported directly from './settings-hook' by components that need it.
