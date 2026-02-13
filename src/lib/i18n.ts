import type { Language } from "@/contexts/settings-hook";

export const SUPPORTED_LANGUAGES = ["en", "de"] as const;
export const DEFAULT_LANGUAGE: Language = "en";

export const isSupportedLanguage = (value: string | null | undefined): value is Language => {
  return value === "en" || value === "de";
};

/**
 * Prefixes a path (e.g. "/cv") with "/{lang}" -> "/de/cv".
 * If the path already starts with "/{lang}", it will be normalized to that lang.
 */
export const withLanguagePrefix = (lang: Language, path: string) => {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  const segments = normalized.split("/");
  const first = segments[1];

  if (isSupportedLanguage(first)) {
    // Replace existing locale prefix.
    return `/${lang}/${segments.slice(2).join("/")}`.replace(/\/$/, "") || `/${lang}`;
  }

  return `/${lang}${normalized}`.replace(/\/$/, "");
};

/**
 * Replaces the first segment (locale) in a pathname, if present.
 * - "/de/cv" -> "/en/cv"
 * - "/cv" -> "/en/cv"
 * - "/" -> "/en"
 */
export const replacePathLanguage = (pathname: string, lang: Language) => {
  if (!pathname || pathname === "/") {
    return `/${lang}`;
  }
  return withLanguagePrefix(lang, pathname);
};
