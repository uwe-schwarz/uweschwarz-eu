"use client";

import React, { useEffect, useState } from 'react';
import {
  SettingsContext,
  type Language,
  type Theme,
  type SettingsContextType,
} from './settings-hook';

interface SettingsProviderProps {
  children: React.ReactNode;
  initialLanguage: Language;
}

const getInitialLanguage = (fallback: Language): Language => {
  if (typeof window === 'undefined') return fallback;

  const saved = localStorage.getItem('language') as Language | null;
  if (saved === 'en' || saved === 'de') return saved;

  const navigatorLanguage = navigator.language?.substring(0, 2).toLowerCase();
  if (navigatorLanguage === 'de') return 'de';

  return fallback;
};

const getInitialTheme = (): Theme => {
  if (typeof window === 'undefined') return 'light';

  const saved = localStorage.getItem('theme') as Theme | null;
  if (saved === 'light' || saved === 'dark') return saved;

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

export const SettingsProvider: React.FC<SettingsProviderProps> = ({ children, initialLanguage }) => {
  const [language, setLanguageState] = useState<Language>(() => getInitialLanguage(initialLanguage));
  const [theme, setThemeState] = useState<Theme>(() => getInitialTheme());

  // Keep <html lang> in sync with current language
  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.documentElement.setAttribute('lang', language);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('language', language);
    }
  }, [language]);

  // Sync theme to DOM + localStorage
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const root = window.document.documentElement;

    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('theme', theme);
    }
  }, [theme]);

  // Language setting function
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('language', lang);
    }
  };

  // Theme setting function
  const setTheme = (theme: Theme) => {
    setThemeState(theme);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('theme', theme);
    }
  };

  // Translation helper
  const t = (text: { en: string; de: string }): string => {
    return text[language];
  };

  return (
    <SettingsContext.Provider value={{ language, theme, setLanguage, setTheme, t }}>
      {children}
    </SettingsContext.Provider>
  );
};
// Ensure useSettings is NOT re-exported or defined here.
// It should be imported directly from './settings-hook' by components that need it.
