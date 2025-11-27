import type { Language } from '@/contexts/settings-hook';

const SUPPORTED_LANGUAGES: Language[] = ['en', 'de'];

/**
 * Parse the Accept-Language header and return the preferred supported language.
 * Falls back to English when nothing usable is found.
 */
export const detectPreferredLanguage = (acceptLanguage?: string | null): Language => {
  if (!acceptLanguage) return 'en';

  // Split on commas, keep the q value if present, and sort by highest quality
  const choices = acceptLanguage
    .split(',')
    .map((part) => {
      const [tag, qValue] = part.trim().split(';q=');
      const quality = qValue ? Number.parseFloat(qValue) || 0 : 1;
      return { tag: tag.toLowerCase(), quality };
    })
    .sort((a, b) => b.quality - a.quality);

  for (const { tag } of choices) {
    const base = tag.slice(0, 2) as Language;
    if (SUPPORTED_LANGUAGES.includes(base)) {
      return base;
    }
  }

  return 'en';
};

