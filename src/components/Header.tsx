"use client";

import { useCallback, useEffect, useMemo, useState, useSyncExternalStore } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import type { Route } from "next";
import { usePathname, useRouter } from "next/navigation";
import { Moon, Sun } from "lucide-react";
import { useSettings } from "@/contexts/settings-hook";
import { siteContent } from "@/content/content";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { replacePathLanguage, withLanguagePrefix } from "@/lib/i18n";
import { getPersistedLanguage, getPersistedTheme } from "@/lib/persisted-preferences";

const MobileMenuSheet = dynamic(() => import("@/components/MobileMenuSheet"), {
  ssr: false,
});

const getScrolledSnapshot = () => (typeof window !== "undefined" ? window.scrollY > 10 : false);
const getServerScrolledSnapshot = () => false;

const subscribeToScroll = (onStoreChange: () => void) => {
  if (typeof window === "undefined") {
    return () => {};
  }

  window.addEventListener("scroll", onStoreChange, { passive: true });
  return () => window.removeEventListener("scroll", onStoreChange);
};

const Header = () => {
  const { language, setLanguage, setTheme, t, theme } = useSettings();
  const router = useRouter();
  const isScrolled = useSyncExternalStore(subscribeToScroll, getScrolledSnapshot, getServerScrolledSnapshot);
  const isMobile = useIsMobile();
  const pathname = usePathname();
  const homeHref = withLanguagePrefix(language, "/");
  const isHomePage = pathname === homeHref;

  const navigationItems = siteContent.navigation;
  const sectionIds = useMemo(() => navigationItems.map((item) => item.href.replace("#", "")), [navigationItems]);
  const [activeSection, setActiveSection] = useState<string>(sectionIds[0] ?? "hero");

  // Toggle for handling theme changes
  const toggleTheme = useCallback(() => {
    const current = getPersistedTheme() ?? theme;
    setTheme(current === "light" ? "dark" : "light");
  }, [setTheme, theme]);

  // Toggle for handling language changes
  const toggleLanguage = useCallback(() => {
    const current = getPersistedLanguage() ?? language;
    const nextLanguage = current === "en" ? "de" : "en";
    setLanguage(nextLanguage);

    const query = typeof window !== "undefined" ? window.location.search.slice(1) : "";
    const hash = typeof window !== "undefined" ? window.location.hash : "";
    const nextPath = replacePathLanguage(pathname, nextLanguage);
    router.push(`${nextPath}${query ? `?${query}` : ""}${hash}` as Route);
  }, [language, pathname, router, setLanguage]);

  useEffect(() => {
    if (!isHomePage || sectionIds.length === 0) {
      return;
    }

    if (typeof IntersectionObserver === "undefined") {
      const updateActiveSectionFromScroll = () => {
        let nextActive = sectionIds[0];

        for (const id of sectionIds) {
          const section = document.getElementById(id);
          if (!section) {
            continue;
          }

          const rect = section.getBoundingClientRect();
          if (rect.top <= 80 && rect.bottom > 80) {
            nextActive = id;
            break;
          }
        }

        setActiveSection((previous) => (previous === nextActive ? previous : nextActive));
      };

      window.addEventListener("scroll", updateActiveSectionFromScroll, { passive: true });
      return () => window.removeEventListener("scroll", updateActiveSectionFromScroll);
    }

    const visibleSections = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const sectionId = (entry.target as HTMLElement).id;
          if (entry.isIntersecting) {
            visibleSections.set(sectionId, entry.intersectionRatio);
          } else {
            visibleSections.delete(sectionId);
          }
        }

        let nextActiveSection = sectionIds[0];
        let maxRatio = -1;

        for (const sectionId of sectionIds) {
          const ratio = visibleSections.get(sectionId);
          if (ratio !== undefined && ratio > maxRatio) {
            maxRatio = ratio;
            nextActiveSection = sectionId;
          }
        }

        if (maxRatio >= 0) {
          setActiveSection((previous) => (previous === nextActiveSection ? previous : nextActiveSection));
        }
      },
      {
        rootMargin: "-80px 0px -50% 0px",
        threshold: [0, 0.2, 0.4, 0.6, 0.8, 1],
      },
    );

    for (const sectionId of sectionIds) {
      const section = document.getElementById(sectionId);
      if (section) {
        observer.observe(section);
      }
    }

    return () => observer.disconnect();
  }, [isHomePage, sectionIds]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 px-3 pt-3 sm:px-4 sm:pt-4">
        <div
          className={`container mx-auto flex items-center justify-between gap-4 rounded-full border px-4 py-2.5 transition-all duration-300 sm:px-6 ${
            isScrolled
              ? "border-border/70 bg-background/70 shadow-lg shadow-black/[0.06] backdrop-blur-xl dark:shadow-black/25"
              : "border-transparent bg-transparent"
          }`}
        >
          <Link className="font-display font-bold text-foreground" href={homeHref as Route}>
            <span className="text-gradient text-2xl sm:text-3xl">Uwe Schwarz</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navigationItems.map((item) => {
              const hash = item.href.replace("#", "");
              const isActive = isHomePage && activeSection === hash;
              const itemClassName = `rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors lg:px-4 lg:text-base ${
                isActive ? "bg-primary/15 text-primary" : "text-foreground/80 hover:bg-muted/80 hover:text-foreground"
              }`;

              if (isHomePage) {
                return (
                  <a className={itemClassName} href={item.href} key={item.href}>
                    {t(item.label)}
                  </a>
                );
              }

              return (
                <Link className={itemClassName} href={`${homeHref}${item.href}` as Route} key={item.href}>
                  {t(item.label)}
                </Link>
              );
            })}
          </nav>

          {/* Control Buttons */}
          <div className="hidden md:flex items-center gap-1">
            {/* Language Toggle */}
            <Button className="rounded-full" onClick={toggleLanguage} size="sm" variant="ghost">
              {language === "en" ? "DE" : "EN"}
            </Button>

            {/* Theme Toggle */}
            <Button
              aria-label={t(
                theme === "light"
                  ? siteContent.translations.themeSwitch.dark
                  : siteContent.translations.themeSwitch.light,
              )}
              className="rounded-full"
              onClick={toggleTheme}
              size="icon"
              variant="ghost"
            >
              {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
            </Button>
          </div>

          {/* Mobile Menu */}
          {isMobile && (
            <MobileMenuSheet
              activeSection={activeSection}
              homeHref={homeHref}
              isHomePage={isHomePage}
              language={language}
              navigationItems={navigationItems}
              onToggleLanguage={toggleLanguage}
              onToggleTheme={toggleTheme}
              t={t}
              theme={theme}
            />
          )}
        </div>
      </header>
    </>
  );
};

Header.displayName = "Header";

export default Header;
