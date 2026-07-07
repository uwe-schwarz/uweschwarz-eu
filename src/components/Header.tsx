"use client";

import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import type { RefObject } from "react";
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

// Displacement map for the liquid-glass refraction: red/blue gradients encode
// the displacement vectors, the blurred inner rect flattens the center so only
// the pill's rim refracts.
const buildGlassMap = (width: number, height: number) => {
  const radius = Math.round(Math.min(width, height) / 2);
  const borderRatio = 0.07;
  const lightness = 50;
  const alpha = 0.93;
  const blur = 11;
  const inset = Math.min(width, height) * (borderRatio * 0.5);
  const svg = `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="red" x1="100%" y1="0%" x2="0%" y2="0%"><stop offset="0%" stop-color="#000"/><stop offset="100%" stop-color="red"/></linearGradient><linearGradient id="blue" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#000"/><stop offset="100%" stop-color="blue"/></linearGradient></defs><rect x="0" y="0" width="${width}" height="${height}" fill="black"/><rect x="0" y="0" width="${width}" height="${height}" rx="${radius}" fill="url(#red)"/><rect x="0" y="0" width="${width}" height="${height}" rx="${radius}" fill="url(#blue)" style="mix-blend-mode:difference"/><rect x="${inset}" y="${inset}" width="${width - inset * 2}" height="${height - inset * 2}" rx="${radius}" fill="hsl(0 0% ${lightness}% / ${alpha})" style="filter:blur(${blur}px)"/></svg>`;

  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
};

const useNavGlassMap = (navRef: RefObject<HTMLDivElement | null>, glassMapRef: RefObject<SVGFEImageElement | null>) => {
  useEffect(() => {
    const navBar = navRef.current;
    const glassMap = glassMapRef.current;
    if (!navBar || !glassMap) {
      return;
    }

    const syncGlassMap = () => {
      const rect = navBar.getBoundingClientRect();
      const width = Math.max(1, Math.round(rect.width));
      const height = Math.max(1, Math.round(rect.height));
      const uri = buildGlassMap(width, height);
      glassMap.setAttribute("href", uri);
      glassMap.setAttributeNS("http://www.w3.org/1999/xlink", "href", uri);
    };

    let mapTimer = 0;
    const scheduleGlassMap = () => {
      window.clearTimeout(mapTimer);
      mapTimer = window.setTimeout(syncGlassMap, 140);
    };

    syncGlassMap();
    const resizeObserver = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(scheduleGlassMap);
    resizeObserver?.observe(navBar);
    window.addEventListener("resize", scheduleGlassMap, { passive: true });

    return () => {
      window.clearTimeout(mapTimer);
      resizeObserver?.disconnect();
      window.removeEventListener("resize", scheduleGlassMap);
    };
  }, [glassMapRef, navRef]);
};

const NavLiquidGlassFilter = ({ glassMapRef }: { glassMapRef: RefObject<SVGFEImageElement | null> }) => (
  <svg aria-hidden="true" className="nav-glass-defs" focusable="false" height="0" width="0">
    <defs>
      <filter colorInterpolationFilters="sRGB" height="160%" id="nav-liquid-glass" width="160%" x="-30%" y="-30%">
        <feImage
          data-nav-glass-map="true"
          height="100%"
          preserveAspectRatio="none"
          ref={glassMapRef}
          result="map"
          width="100%"
          x="0"
          y="0"
        />
        <feDisplacementMap
          in="SourceGraphic"
          in2="map"
          result="dispRed"
          scale="-50"
          xChannelSelector="R"
          yChannelSelector="B"
        />
        <feColorMatrix in="dispRed" result="red" type="matrix" values="1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0" />
        <feDisplacementMap
          in="SourceGraphic"
          in2="map"
          result="dispGreen"
          scale="-47"
          xChannelSelector="R"
          yChannelSelector="B"
        />
        <feColorMatrix in="dispGreen" result="green" type="matrix" values="0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 1 0" />
        <feDisplacementMap
          in="SourceGraphic"
          in2="map"
          result="dispBlue"
          scale="-44"
          xChannelSelector="R"
          yChannelSelector="B"
        />
        <feColorMatrix in="dispBlue" result="blue" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 1 0" />
        <feBlend in="red" in2="green" mode="screen" result="rg" />
        <feBlend in="rg" in2="blue" mode="screen" result="output" />
        <feGaussianBlur in="output" stdDeviation="0.7" />
      </filter>
    </defs>
  </svg>
);

const Header = () => {
  const { language, setLanguage, setTheme, t, theme } = useSettings();
  const router = useRouter();
  const isScrolled = useSyncExternalStore(subscribeToScroll, getScrolledSnapshot, getServerScrolledSnapshot);
  const isMobile = useIsMobile();
  const pathname = usePathname();
  const navRef = useRef<HTMLDivElement | null>(null);
  const glassMapRef = useRef<SVGFEImageElement | null>(null);
  const homeHref = withLanguagePrefix(language, "/");
  const isHomePage = pathname === homeHref;

  useNavGlassMap(navRef, glassMapRef);

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
      <header
        className={`fixed top-0 left-0 right-0 z-50 px-3 pt-3 sm:px-4 sm:pt-4${isScrolled ? " nav-glass-on" : ""}`}
      >
        <div
          className="liquid-glass-nav container mx-auto flex items-center justify-between gap-4 px-4 py-2.5 sm:px-6"
          ref={navRef}
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
                  <a
                    aria-current={isActive ? "page" : undefined}
                    className={itemClassName}
                    href={item.href}
                    key={item.href}
                  >
                    {t(item.label)}
                  </a>
                );
              }

              return (
                <Link
                  aria-current={isActive ? "page" : undefined}
                  className={itemClassName}
                  href={`${homeHref}${item.href}` as Route}
                  key={item.href}
                >
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
          <NavLiquidGlassFilter glassMapRef={glassMapRef} />
        </div>
      </header>
    </>
  );
};

Header.displayName = "Header";

export default Header;
