import type { Language, Theme } from "@/contexts/settings-hook";

export const getPersistedLanguage = (): Language | null => {
  try {
    const saved = localStorage.getItem("language");
    return saved === "en" || saved === "de" ? saved : null;
  } catch {
    return null;
  }
};

export const getPersistedTheme = (): Theme | null => {
  try {
    const saved = localStorage.getItem("theme");
    return saved === "light" || saved === "dark" ? saved : null;
  } catch {
    return null;
  }
};
