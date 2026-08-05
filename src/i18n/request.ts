import { lang } from "next/root-params";
import { getRequestConfig } from "next-intl/server";

import { isSupportedLanguage } from "@/lib/i18n";

export default getRequestConfig(async () => {
  const locale = await lang();

  if (!isSupportedLanguage(locale)) {
    throw new Error(`Unsupported route locale: ${locale}`);
  }

  return {
    locale,
    messages: {},
  };
});
