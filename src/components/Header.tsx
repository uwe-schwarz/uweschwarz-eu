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

const Header = () => {
  const { language, setLanguage, theme, setTheme, t } = useSettings();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const isMobile = useIsMobile();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const homeHref = withLanguagePrefix(language, "/");
  const isHomePage = pathname === homeHref;
  const [activeSection, setActiveSection] = useState<string>("hero");

  const navigationItems = useMemo(() => siteContent.navigation, []);

  const getPersistedLanguage = (): "en" | "de" | null => {
    try {
      const saved = localStorage.getItem("language");
      return saved === "en" || saved === "de" ? saved : null;
    } catch {
      return null;
    }
  };

  const getPersistedTheme = (): "light" | "dark" | null => {
    try {
      const saved = localStorage.getItem("theme");
      return saved === "light" || saved === "dark" ? saved : null;
    } catch {
      return null;
    }
  };

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
    if (!isHomePage) return;
    const handleScroll = () => {
      const sectionIds = navigationItems.map(item => item.href.replace('#', ''));
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
        isScrolled
          ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link
          href={homeHref as Route}
          className="text-2xl font-display font-bold text-foreground"
        >
          <span className="text-gradient text-4xl">Uwe Schwarz</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navigationItems.map((item) => {
            const hash = item.href.replace('#', '');

            if (isHomePage) {
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`text-lg font-medium text-foreground hover:text-primary transition-colors link-underline${activeSection === hash ? ' link-underline-active' : ''}`}
                >
                  {t(item.label)}
                </a>
              );
            }

            return (
              <Link
                key={item.href}
                href={`${homeHref}${item.href}` as Route}
                className="text-lg font-medium text-foreground hover:text-primary transition-colors link-underline"
              >
                {t(item.label)}
              </Link>
            );
          })}
        </nav>

        {/* Control Buttons */}
        <div className="hidden md:flex items-center space-x-2">
          {/* Language Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleLanguage}
          >
            {language === "en" ? "DE" : "EN"}
          </Button>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label={t(
              theme === "light"
                ? siteContent.translations.themeSwitch.dark
                : siteContent.translations.themeSwitch.light
            )}
          >
            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobile && (
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label="Open menu"
              >
                <Menu size={24} className="text-foreground" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-full bg-background dark:bg-gray-900 p-0"
            >
              <div className="flex flex-col h-full">
                <div className="border-b border-gray-200 dark:border-gray-800 py-4 px-6">
                  <Link href={homeHref as Route} className="text-2xl font-display font-bold">
                    <span className="text-gradient">Uwe Schwarz</span>
                  </Link>
                </div>

                <div className="flex-1 flex flex-col justify-center items-center space-y-6 py-8">
                  {navigationItems.map((item) => {
                    const hash = item.href.replace('#', '');

                    if (isHomePage) {
                      return (
                        <a
                          key={item.href}
                          href={item.href}
                          className={`text-xl font-medium text-foreground hover:text-primary transition-colors${activeSection === hash ? ' link-underline link-underline-active' : ''}`}
                        >
                          {t(item.label)}
                        </a>
                      );
                    }

                    return (
                      <Link
                        key={item.href}
                        href={`${homeHref}${item.href}` as Route}
                        className="text-xl font-medium text-foreground hover:text-primary transition-colors"
                      >
                        {t(item.label)}
                      </Link>
                    );
                  })}
                </div>

                <div className="border-t border-gray-200 dark:border-gray-800 p-6 flex gap-4">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={toggleLanguage}
                  >
                    {language === "en" ? "Deutsch" : "English"}
                  </Button>

                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={toggleTheme}
                  >
                    {theme === "light" ? (
                      <>
                        <Moon size={16} className="mr-2" /> Dark
                      </>
                    ) : (
                      <>
                        <Sun size={16} className="mr-2" /> Light
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
