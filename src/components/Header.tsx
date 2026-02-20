"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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

const Header = () => {
  const { language, setLanguage, setTheme, t, theme } = useSettings();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const isMobile = useIsMobile();
  const pathname = usePathname();
  const homeHref = withLanguagePrefix(language, "/");
  const isHomePage = pathname === homeHref;
  const topSentinelRef = useRef<HTMLDivElement>(null);

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

  // Detect scroll for header styling without per-frame polling.
  useEffect(() => {
    const sentinel = topSentinelRef.current;
    if (!sentinel) {
      return;
    }

    if (typeof IntersectionObserver === "undefined") {
      const updateScrolledState = () => {
        const nextScrolled = window.scrollY > 10;
        setIsScrolled((previous) => (previous === nextScrolled ? previous : nextScrolled));
      };

      updateScrolledState();
      window.addEventListener("scroll", updateScrolledState, { passive: true });
      return () => window.removeEventListener("scroll", updateScrolledState);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const nextScrolled = !entry.isIntersecting;
        setIsScrolled((previous) => (previous === nextScrolled ? previous : nextScrolled));
      },
      {
        rootMargin: "-10px 0px 0px 0px",
        threshold: [0, 1],
      },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

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

      updateActiveSectionFromScroll();
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
      <div aria-hidden className="absolute left-0 top-0 h-px w-px pointer-events-none" ref={topSentinelRef} />
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

export default Header;
