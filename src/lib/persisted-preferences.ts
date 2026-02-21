import type { Language, Theme } from "@/contexts/settings-hook";

export const PERSISTED_PREFERENCE_SCHEMA_VERSION = "v1";

export const STORAGE_KEYS = {
  language: `user-settings:language:${PERSISTED_PREFERENCE_SCHEMA_VERSION}`,
  theme: `user-settings:theme:${PERSISTED_PREFERENCE_SCHEMA_VERSION}`,
} as const;

export const LEGACY_STORAGE_KEYS = {
  language: "language",
  theme: "theme",
} as const;

const readStorageValue = (currentKey: string, legacyKey: string): string | null => {
  try {
    const currentValue = localStorage.getItem(currentKey);
    if (currentValue !== null) {
      return currentValue;
    }

    const legacyValue = localStorage.getItem(legacyKey);
    if (legacyValue === null) {
      return null;
    }

    try {
      localStorage.setItem(currentKey, legacyValue);
      localStorage.removeItem(legacyKey);
    } catch {
      // ignore migration errors and keep using the legacy value
    }

    return legacyValue;
  } catch {
    return null;
  }
};

export const getPersistedLanguage = (): Language | null => {
  const saved = readStorageValue(STORAGE_KEYS.language, LEGACY_STORAGE_KEYS.language);
  return saved === "en" || saved === "de" ? saved : null;
};

export const getPersistedTheme = (): Theme | null => {
  const saved = readStorageValue(STORAGE_KEYS.theme, LEGACY_STORAGE_KEYS.theme);
  return saved === "light" || saved === "dark" ? saved : null;
};

export const setPersistedLanguage = (language: Language): void => {
  setPersistedValue(STORAGE_KEYS.language, LEGACY_STORAGE_KEYS.language, language);
};

export const setPersistedTheme = (theme: Theme): void => {
  setPersistedValue(STORAGE_KEYS.theme, LEGACY_STORAGE_KEYS.theme, theme);
};

const setPersistedValue = (currentKey: string, legacyKey: string, value: string): void => {
  try {
    localStorage.setItem(currentKey, value);
    localStorage.removeItem(legacyKey);
  } catch {
    // ignore storage write errors
  }
};
