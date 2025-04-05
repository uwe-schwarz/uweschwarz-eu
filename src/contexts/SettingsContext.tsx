
import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'de';
type Theme = 'light' | 'dark';

interface SettingsContextType {
  language: Language;
  theme: Theme;
  setLanguage: (lang: Language) => void;
  setTheme: (theme: Theme) => void;
  t: (text: { en: string; de: string }) => string;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Get initial language from browser
  const getBrowserLanguage = (): Language => {
    const navigatorLanguage = navigator.language.substring(0, 2).toLowerCase();
    return navigatorLanguage === 'de' ? 'de' : 'en';
  };

  // Get initial theme from system preference
  const getInitialTheme = (): Theme => {
    if (typeof window === 'undefined') return 'light';
    
    const savedTheme = window.localStorage.getItem('theme') as Theme;
    if (savedTheme) return savedTheme;

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  const [language, setLanguageState] = useState<Language>('en');
  const [theme, setThemeState] = useState<Theme>('light');

  useEffect(() => {
    setLanguageState(getBrowserLanguage());
    setThemeState(getInitialTheme());
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    
    localStorage.setItem('theme', theme);
  }, [theme]);

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

export const useSettings = (): SettingsContextType => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
