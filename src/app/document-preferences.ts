import { LEGACY_STORAGE_KEYS, STORAGE_KEYS } from "@/lib/persisted-preferences";

// This script runs before React and cannot import persisted-preferences.ts in
// the browser. Keep its migration behavior and key format in sync with
// readStorageValue using STORAGE_KEYS.theme and LEGACY_STORAGE_KEYS.theme.
export const themeInitScript = `
(() => {
  try {
    const storageKey = '${STORAGE_KEYS.theme}';
    const legacyKey = '${LEGACY_STORAGE_KEYS.theme}';
    let versionedValue = null;
    let legacyValue = null;
    try {
      versionedValue = localStorage.getItem(storageKey);
      legacyValue = localStorage.getItem(legacyKey);
    } catch {}
    const stored = versionedValue ?? legacyValue;

    if (!versionedValue && legacyValue) {
      try {
        localStorage.setItem(storageKey, legacyValue);
        localStorage.removeItem(legacyKey);
      } catch {}
    }

    const cookie = document.cookie.match(/(?:^|;\\s*)theme=(dark|light)(?:;|$)/)?.[1];
    const explicit = stored === 'dark' || stored === 'light' ? stored : cookie;
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldDark = explicit ? explicit === 'dark' : !!prefersDark;
    document.documentElement.classList.toggle('dark', shouldDark);
  } catch {}
})();
`;
