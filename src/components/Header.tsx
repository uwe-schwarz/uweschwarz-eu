"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { Route } from "next";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Moon, Sun, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useSettings } from "@/contexts/settings-hook";
import { siteContent } from "@/content/content";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { replacePathLanguage, withLanguagePrefix } from "@/lib/i18n";
import { getPersistedLanguage, getPersistedTheme } from "@/lib/persisted-preferences";

const Header = () => {
  const { language, setLanguage, setTheme, t, theme } = useSettings();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const isMobile = useIsMobile();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const homeHref = withLanguagePrefix(language, "/");
  const isHomePage = pathname === homeHref;
  const [activeSection, setActiveSection] = useState<string>("hero");

  const navigationItems = useMemo(() => siteContent.navigation, []);

  // Toggle for handling theme changes
  const toggleTheme = () => {
    const current = getPersistedTheme() ?? theme;
    setTheme(current === "light" ? "dark" : "light");
  };

  // Toggle for handling language changes
  const toggleLanguage = () => {
    const current = getPersistedLanguage() ?? language;
    const nextLanguage = current === "en" ? "de" : "en";
    setLanguage(nextLanguage);

    const query = searchParams?.toString();
    const hash = typeof window !== "undefined" ? window.location.hash : "";
    const nextPath = replacePathLanguage(pathname, nextLanguage);
    router.push(`${nextPath}${query ? `?${query}` : ""}${hash}` as Route);
  };

  // Detect scroll for header styling
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isHomePage) {
      return;
    }
    const handleScroll = () => {
      const sectionIds = navigationItems.map((item) => item.href.replace("#", ""));
      let current = sectionIds[0];
      for (const id of sectionIds) {
        const section = document.getElementById(id);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 80 && rect.bottom > 80) {
            current = id;
            break;
          }
        }
      }
      setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage, navigationItems]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link className="text-2xl font-display font-bold text-foreground" href={homeHref as Route}>
          <span className="text-gradient text-4xl">Uwe Schwarz</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navigationItems.map((item) => {
            const hash = item.href.replace("#", "");

            if (isHomePage) {
              return (
                <a
                  className={`text-lg font-medium text-foreground hover:text-primary transition-colors link-underline${activeSection === hash ? " link-underline-active" : ""}`}
                  href={item.href}
                  key={item.href}
                >
                  {t(item.label)}
                </a>
              );
            }

            return (
              <Link
                className="text-lg font-medium text-foreground hover:text-primary transition-colors link-underline"
                href={`${homeHref}${item.href}` as Route}
                key={item.href}
              >
                {t(item.label)}
              </Link>
            );
          })}
        </nav>

        {/* Control Buttons */}
        <div className="hidden md:flex items-center space-x-2">
          {/* Language Toggle */}
          <Button onClick={toggleLanguage} size="sm" variant="ghost">
            {language === "en" ? "DE" : "EN"}
          </Button>

          {/* Theme Toggle */}
          <Button
            aria-label={t(
              theme === "light"
                ? siteContent.translations.themeSwitch.dark
                : siteContent.translations.themeSwitch.light,
            )}
            onClick={toggleTheme}
            size="icon"
            variant="ghost"
          >
            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobile && (
          <Sheet>
            <SheetTrigger asChild>
              <Button aria-label="Open menu" className="md:hidden" size="icon" variant="ghost">
                <Menu className="text-foreground" size={24} />
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full bg-background dark:bg-gray-900 p-0" side="left">
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
                      >
                        {t(item.label)}
                      </Link>
                    );
                  })}
                </div>

                <div className="border-t border-gray-200 dark:border-gray-800 p-6 flex gap-4">
                  <Button className="flex-1" onClick={toggleLanguage} variant="outline">
                    {language === "en" ? "Deutsch" : "English"}
                  </Button>

                  <Button className="flex-1" onClick={toggleTheme} variant="outline">
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
        )}
      </div>
    </header>
  );
};

export default Header;
