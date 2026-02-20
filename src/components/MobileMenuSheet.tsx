"use client";

import { useState } from "react";
import Link from "next/link";
import type { Route } from "next";
import { Menu, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import type { Language, Theme } from "@/contexts/settings-hook";
import type { LocalizedString } from "@/lib/localization";

interface MobileMenuNavigationItem {
  href: string;
  label: LocalizedString;
}

interface MobileMenuSheetProps {
  activeSection: string;
  homeHref: string;
  isHomePage: boolean;
  language: Language;
  navigationItems: Array<MobileMenuNavigationItem>;
  onToggleLanguage: () => void;
  onToggleTheme: () => void;
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

  return (
    <Sheet onOpenChange={setOpen} open={open}>
      <SheetTrigger asChild>
        <Button aria-label="Open menu" className="md:hidden" size="icon" variant="ghost">
          <Menu className="text-foreground" size={24} />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full bg-background dark:bg-gray-900 p-0" side="left">
        <SheetTitle className="sr-only">{language === "de" ? "Navigationsmenü" : "Navigation menu"}</SheetTitle>
        <div className="flex flex-col h-full">
          <div className="border-b border-gray-200 dark:border-gray-800 py-4 px-6">
            <Link className="text-2xl font-display font-bold" href={homeHref as Route}>
              <span className="text-gradient">Uwe Schwarz</span>
            </Link>
          </div>

          <div className="flex-1 flex flex-col justify-center items-center space-y-6 py-8">
            {navigationItems.map((item) => {
              const hash = item.href.replace("#", "");

              if (isHomePage) {
                return (
                  <a
                    className={`text-xl font-medium text-foreground hover:text-primary transition-colors${activeSection === hash ? " link-underline link-underline-active" : ""}`}
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
                  className="text-xl font-medium text-foreground hover:text-primary transition-colors"
                  href={`${homeHref}${item.href}` as Route}
                  key={item.href}
                  onClick={() => setOpen(false)}
                >
                  {t(item.label)}
                </Link>
              );
            })}
          </div>

          <div className="border-t border-gray-200 dark:border-gray-800 p-6 flex gap-4">
            <Button className="flex-1" onClick={onToggleLanguage} variant="outline">
              {language === "en" ? "Deutsch" : "English"}
            </Button>

            <Button className="flex-1" onClick={onToggleTheme} variant="outline">
              {theme === "light" ? (
                <>
                  <Moon className="mr-2" size={16} /> Dark
                </>
              ) : (
                <>
                  <Sun className="mr-2" size={16} /> Light
                </>
              )}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

MobileMenuSheet.displayName = "MobileMenuSheet";

export default MobileMenuSheet;
