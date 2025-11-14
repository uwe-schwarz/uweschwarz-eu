"use client";

import React, { useState, useEffect } from 'react';
import {
  SettingsContext,
  type Language,
  type Theme,
  type SettingsContextType,
} from './settings-hook';

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Start with default values to avoid hydration mismatch
  // These will be updated after mount with actual user preferences
  const [language, setLanguageState] = useState<Language>('en');
  const [theme, setThemeState] = useState<Theme>('light');
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize from browser/localStorage after component mounts (client-side only)
  // This is wrapped in useEffect to avoid hydration mismatch - we need consistent
  // server/client initial render, then update to actual preferences after mount
  useEffect(() => {
    // Get language from localStorage or browser
    const savedLanguage = localStorage.getItem('language') as Language;
    let newLanguage: Language;
    if (savedLanguage === 'en' || savedLanguage === 'de') {
      newLanguage = savedLanguage;
    } else {
      const navigatorLanguage = navigator.language.substring(0, 2).toLowerCase();
      newLanguage = navigatorLanguage === 'de' ? 'de' : 'en';
    }

    // Get theme from localStorage or system preference
    const savedTheme = localStorage.getItem('theme') as Theme;
    let newTheme: Theme;
    if (savedTheme) {
      newTheme = savedTheme;
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      newTheme = 'dark';
    } else {
      newTheme = 'light';
    }

    // Batch state updates together
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Initialization after mount to avoid hydration mismatch
    setLanguageState(newLanguage);
    setThemeState(newTheme);
    setIsInitialized(true);
  }, []);

  // Set <html lang> attribute whenever language changes
  useEffect(() => {
    if (isInitialized) {
      document.documentElement.setAttribute('lang', language);
    }
  }, [language, isInitialized]);

  useEffect(() => {
    if (!isInitialized) return;

    const root = window.document.documentElement;

    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    localStorage.setItem('theme', theme);
  }, [theme, isInitialized]);

  // Language setting function
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  // Theme setting function
  const setTheme = (theme: Theme) => {
    setThemeState(theme);
    localStorage.setItem('theme', theme);
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
