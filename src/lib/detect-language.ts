import type { Language } from "@/contexts/settings-hook";

import { DEFAULT_LANGUAGE, isSupportedLanguage } from "@/lib/i18n";

/**
 * Parse the Accept-Language header and return the preferred supported language.
 * Falls back to English when nothing usable is found.
 */
export const detectPreferredLanguage = (acceptLanguage?: string | null): Language => {
  if (!acceptLanguage) {
    return DEFAULT_LANGUAGE;
  }

  // Split on commas, keep the q value if present, and sort by highest quality
  const choices = acceptLanguage
    .split(",")
    .map((part) => {
      const [tag, qValue] = part.trim().split(";q=");
      const quality = qValue ? Number.parseFloat(qValue) || 0 : 1;
      return { quality, tag: tag.toLowerCase() };
    })
    .sort((a, b) => b.quality - a.quality);

  for (const { tag } of choices) {
    const base = tag.slice(0, 2) as Language;
    if (isSupportedLanguage(base)) {
      return base;
    }
  }

  return DEFAULT_LANGUAGE;
};
