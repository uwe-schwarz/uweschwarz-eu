"use client";

import { useState } from "react";
import type { MouseEvent } from "react";
import { Languages, Menu, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import type { Language, Theme } from "@/contexts/settings-hook";
import { Link } from "@/i18n/navigation";
import type { LocalizedString } from "@/lib/localization";

interface MobileMenuNavigationItem {
  href: string;
  label: LocalizedString;
}

const linkClassName = (isActive: boolean) =>
  `type-display block py-2 text-4xl transition-colors ${isActive ? "text-primary" : "text-foreground hover:text-primary"}`;

interface MobileMenuSheetProps {
  activeSection: string;
  homeHref: string;
  isHomePage: boolean;
  language: Language;
  navigationItems: Array<MobileMenuNavigationItem>;
  onToggleLanguage: () => void;
  onToggleTheme: (event?: MouseEvent<HTMLElement>) => void;
  t: (text: LocalizedString) => string;
  theme: Theme;
}

const MobileMenuSheet = ({
  activeSection,
  homeHref,
  isHomePage,
  language,
  navigationItems,
  onToggleLanguage,
  onToggleTheme,
  t,
  theme,
}: MobileMenuSheetProps) => {
  const [open, setOpen] = useState(false);
  const languageToggleLabel = t({
    de: language === "en" ? "Sprache auf Deutsch umstellen" : "Sprache auf Englisch umstellen",
    en: language === "en" ? "Switch language to Deutsch" : "Switch language to English",
  });
  const menuTriggerLabel = t({
    de: "Menü öffnen",
    en: "Open menu",
  });
  const themeToggleLabel = t({
    de: theme === "light" ? "Design auf Dunkelmodus umstellen" : "Design auf Hellmodus umstellen",
    en: theme === "light" ? "Switch theme to Dark mode" : "Switch theme to Light mode",
  });
  const darkModeLabel = t({
    de: "Dunkel",
    en: "Dark",
  });
  const lightModeLabel = t({
    de: "Hell",
    en: "Light",
  });

  return (
    <Sheet onOpenChange={setOpen} open={open}>
      <SheetTrigger asChild>
        <Button aria-label={menuTriggerLabel} className="lg:hidden" size="icon" variant="ghost">
          <Menu className="text-foreground" size={22} />
        </Button>
      </SheetTrigger>
      <SheetContent className="blueprint-grid flex w-full flex-col bg-background p-0 sm:max-w-md" side="right">
        <SheetTitle className="sr-only">{t({ de: "Navigationsmenü", en: "Navigation menu" })}</SheetTitle>
        <div className="flex items-center gap-2.5 px-5 pt-5">
          <span
            aria-hidden="true"
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-[0.8rem] font-bold text-primary-foreground"
          >
            US
          </span>
          <Link className="type-heading text-lg" href={homeHref} onClick={() => setOpen(false)}>
            Uwe Schwarz
          </Link>
        </div>

        <nav className="flex flex-1 flex-col justify-center px-6">
          {navigationItems.map((item) => {
            const hash = item.href.replace("#", "");

            if (isHomePage) {
              return (
                <a
                  aria-current={activeSection === hash ? "page" : undefined}
                  className={linkClassName(activeSection === hash)}
                  href={item.href}
                  key={item.href}
                  onClick={() => setOpen(false)}
                >
                  {t(item.label)}
                </a>
              );
            }

            return (
              <Link
                className={linkClassName(false)}
                href={`${homeHref}${item.href}`}
                key={item.href}
                onClick={() => setOpen(false)}
              >
                {t(item.label)}
              </Link>
            );
          })}
        </nav>

        <div className="flex gap-3 border-t border-border p-5">
          <Button aria-label={languageToggleLabel} className="flex-1" onClick={onToggleLanguage} variant="outline">
            <Languages aria-hidden="true" />
            {language === "en" ? "Deutsch" : "English"}
          </Button>

          <Button aria-label={themeToggleLabel} className="flex-1" onClick={onToggleTheme} variant="outline">
            {theme === "light" ? (
              <>
                <Moon aria-hidden="true" /> {darkModeLabel}
              </>
            ) : (
              <>
                <Sun aria-hidden="true" /> {lightModeLabel}
              </>
            )}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

MobileMenuSheet.displayName = "MobileMenuSheet";

export default MobileMenuSheet;
