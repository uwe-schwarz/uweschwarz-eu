import { defineRouting } from "next-intl/routing";

import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES } from "@/lib/i18n";

export const routing = defineRouting({
  defaultLocale: DEFAULT_LANGUAGE,
  localeCookie: {
    maxAge: 60 * 60 * 24 * 365,
    name: "language",
    sameSite: "lax",
  },
  localePrefix: "always",
  locales: SUPPORTED_LANGUAGES,
});
