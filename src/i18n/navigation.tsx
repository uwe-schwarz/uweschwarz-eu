import { createContext, useContext } from "react";
import type { ComponentProps } from "react";

import { useSettings, type Language } from "@/contexts/settings-hook";
import { withLanguagePrefix } from "@/lib/i18n";

export const PathnameContext = createContext("/");

export const usePathname = () => useContext(PathnameContext);

export const getPathname = ({ href, locale }: { href: string; locale: Language }) => withLanguagePrefix(locale, href);

interface LinkProps extends ComponentProps<"a"> {
  href: string;
  locale?: Language;
}

export function Link({ href, locale, ...props }: LinkProps) {
  const { language } = useSettings();
  const localizedHref =
    href.startsWith("/") && !href.startsWith("//") ? withLanguagePrefix(locale ?? language, href) : href;

  return <a href={localizedHref} {...props} />;
}
