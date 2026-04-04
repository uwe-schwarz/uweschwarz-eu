"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";
import { ArrowDown } from "lucide-react";
import { FileTextIcon } from "@/components/icons/file-text";
import MagicRings from "@/components/MagicRings";
import { Button } from "@/components/ui/button";
import { useSettings } from "@/contexts/settings-hook";
import { siteContent } from "@/content/content";
import { useFitText } from "@/hooks/use-fit-text";
import { withLanguagePrefix } from "@/lib/i18n";

const ProfilePicture = React.memo(({ alt }: { alt: string }) => (
  <div className="w-full h-full rounded-full bg-background flex items-center justify-center overflow-hidden relative">
    <Image
      alt={alt}
      className="object-cover"
      fill
      priority
      sizes="(min-width:1200px) 360px, (min-width:1024px) 334px, (min-width:768px) 360px, 300px"
      src="/profile.webp"
    />
  </div>
));

ProfilePicture.displayName = "ProfilePicture";

const formatTemplate = (template: string, values: Record<string, number | string>) => {
  return Object.entries(values).reduce((message, [key, value]) => {
    return message.replaceAll(`{${key}}`, String(value));
  }, template);
};

interface MagicRingPosition {
  height: number;
  left: number;
  top: number;
  width: number;
}

const clampColorChannel = (value: number) => {
  return Math.max(0, Math.min(255, Math.round(value)));
};

const toHexChannel = (value: number) => {
  return clampColorChannel(value).toString(16).padStart(2, "0");
};

const hslTripletToHex = (triplet: string): string | null => {
  const [hueRaw, saturationRaw, lightnessRaw] = triplet.split(/\s+/);

  if (!hueRaw || !saturationRaw || !lightnessRaw) {
    return null;
  }

  const hue = Number.parseFloat(hueRaw);
  const saturation = Number.parseFloat(saturationRaw) / 100;
  const lightness = Number.parseFloat(lightnessRaw) / 100;

  if (Number.isNaN(hue) || Number.isNaN(saturation) || Number.isNaN(lightness)) {
    return null;
  }

  const chroma = (1 - Math.abs(2 * lightness - 1)) * saturation;
  const normalizedHue = ((hue % 360) + 360) % 360;
  const segment = normalizedHue / 60;
  const secondComponent = chroma * (1 - Math.abs((segment % 2) - 1));
  const match = lightness - chroma / 2;

  let red = 0;
  let green = 0;
  let blue = 0;

  if (segment >= 0 && segment < 1) {
    red = chroma;
    green = secondComponent;
  } else if (segment < 2) {
    red = secondComponent;
    green = chroma;
  } else if (segment < 3) {
    green = chroma;
    blue = secondComponent;
  } else if (segment < 4) {
    green = secondComponent;
    blue = chroma;
  } else if (segment < 5) {
    red = secondComponent;
    blue = chroma;
  } else {
    red = chroma;
    blue = secondComponent;
  }

  return `#${toHexChannel((red + match) * 255)}${toHexChannel((green + match) * 255)}${toHexChannel((blue + match) * 255)}`;
};

const getMagicRingFallbackColors = (theme: "light" | "dark"): { color: string; colorTwo: string } => {
  return theme === "dark"
    ? {
        color: "#8fe8c1",
        colorTwo: "#b49cff",
      }
    : {
        color: "#1d6948",
        colorTwo: "#5741aa",
      };
};

const getMagicRingColors = (theme: "light" | "dark"): { color: string; colorTwo: string } => {
  if (typeof window === "undefined") {
    return getMagicRingFallbackColors(theme);
  }

  const styles = window.getComputedStyle(window.document.documentElement);
  const primary = styles.getPropertyValue("--primary").trim();
  const accent = styles.getPropertyValue("--accent").trim();

  if (!primary || !accent) {
    return getMagicRingFallbackColors(theme);
  }

  return {
    color: hslTripletToHex(accent) ?? "#d1d9f5",
    colorTwo: hslTripletToHex(primary) ?? "#1d6948",
  };
};

const HeroSection = () => {
  const { language, t, theme } = useSettings();
  const { hero } = siteContent;
  const sectionRef = useRef<HTMLElement | null>(null);
  const portraitRef = useRef<HTMLDivElement | null>(null);
  const isVisualRegression =
    typeof document !== "undefined" && window.document.documentElement.dataset.visualRegression === "true";

  // State for the rotating title
  const [titleIndex, setTitleIndex] = useState(0);
  const [magicRingColors, setMagicRingColors] = useState(() => getMagicRingFallbackColors(theme));
  const [magicRingPosition, setMagicRingPosition] = useState<MagicRingPosition | null>(null);
  const updateMagicRingPosition = useCallback(() => {
    const section = sectionRef.current;
    const portrait = portraitRef.current;

    if (!section || !portrait) {
      return;
    }

    const portraitRect = portrait.getBoundingClientRect();
    const sectionRect = section.getBoundingClientRect();
    const centerX = portraitRect.left - sectionRect.left + portraitRect.width / 2;
    const centerY = portraitRect.top - sectionRect.top + portraitRect.height / 2;
    const size = Math.min(Math.max(sectionRect.height * 1.9, portraitRect.width * 4.8), 2200);

    setMagicRingPosition({
      height: size,
      left: centerX,
      top: centerY,
      width: size,
    });
  }, []);

  // Set up title rotation effect
  useEffect(() => {
    if (isVisualRegression) {
      return;
    }

    const interval = setInterval(() => {
      setTitleIndex((prevIndex) => (prevIndex + 1) % hero.titleElements.length);
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, [hero.titleElements.length, isVisualRegression]);

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      setMagicRingColors(getMagicRingColors(theme));
    });

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [theme]);

  useEffect(() => {
    const section = sectionRef.current;
    const portrait = portraitRef.current;

    if (!section || !portrait) {
      return;
    }

    updateMagicRingPosition();

    const resizeObserver = new ResizeObserver(updateMagicRingPosition);
    resizeObserver.observe(section);
    resizeObserver.observe(portrait);
    window.addEventListener("resize", updateMagicRingPosition);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateMagicRingPosition);
    };
  }, [updateMagicRingPosition]);

  // FitText Hook for dynamic title
  const currentTitle = t(hero.titleElements[titleIndex]);
  const { fontSize, ref: fitTextRef } = useFitText({
    depKey: currentTitle,
    maxFontSize: 48,
    minFontSize: 18,
  });
  const percentAvailable = Math.min(Math.max(hero.availability.currentPercentAvailable, 0), 100);
  const availabilitySummary = `${formatTemplate(t(hero.availability.currentLine), {
    percent: percentAvailable,
  })} · ${formatTemplate(t(hero.availability.fullLine), {
    date: hero.availability.fullyAvailableDate,
  })}`;

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      updateMagicRingPosition();
    });

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [availabilitySummary, currentTitle, language, updateMagicRingPosition]);

  return (
    <section
      className="min-h-screen flex items-center pt-20 bg-grid relative overflow-hidden isolate"
      id="hero"
      ref={sectionRef}
    >
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 overflow-visible opacity-80" data-visual-regression="hero-rings">
          <div
            className="absolute"
            style={
              magicRingPosition
                ? {
                    height: `${magicRingPosition.height}px`,
                    left: `${magicRingPosition.left}px`,
                    top: `${magicRingPosition.top}px`,
                    transform: "translate(-50%, -50%)",
                    width: `${magicRingPosition.width}px`,
                  }
                : {
                    inset: 0,
                  }
            }
          >
            <MagicRings
              attenuation={25}
              baseRadius={0.075}
              blur={0.2}
              clickBurst={false}
              color={magicRingColors.color}
              colorTwo={magicRingColors.colorTwo}
              fadeIn={0.45}
              fadeOut={0.2}
              followMouse={false}
              lineThickness={2}
              noiseAmount={0.3}
              opacity={1}
              parallax={0.02}
              radiusStep={0.08}
              ringCount={5}
              ringGap={1.35}
              rotation={-18}
              scaleRate={0.11}
              speed={0.7}
            />
          </div>
        </div>
        <div className="absolute inset-0 bg-linear-to-b from-background/5 via-background/25 to-background/70" />
      </div>

      {/* Content Container */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-start">
          {/* Text Content */}
          <div className="lg:w-1/2 max-w-xl animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display mb-4">
              {hero.name}
              <br />
              <span
                className="block text-gradient mt-2 h-[1.2em]"
                key={titleIndex}
                ref={fitTextRef}
                style={{
                  display: "inline-block",
                  fontSize,
                  lineHeight: 1.2,
                  whiteSpace: "nowrap",
                  width: "100%",
                }}
              >
                {currentTitle}
              </span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-lg mb-8">{t(hero.description)}</p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild className="rounded-full shadow-lg hover-scale" size="lg">
                <a href="#experience">{t(hero.ctaPrimary)}</a>
              </Button>

              <Button asChild className="rounded-full shadow-sm hover-scale" size="lg" variant="outline">
                <Link href={withLanguagePrefix(language, "/cv") as Route}>
                  <FileTextIcon className="mr-2" size={16} />
                  {t(hero.ctaSecondary)}
                </Link>
              </Button>
            </div>

            <div className="mt-8 border-t border-border/40 pt-6">
              <div className="max-w-lg">
                <p className="text-sm font-medium text-foreground">{t(hero.availability.title)}</p>
                <div
                  aria-label={t(hero.availability.title)}
                  aria-valuemax={100}
                  aria-valuemin={0}
                  aria-valuenow={percentAvailable}
                  className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-primary/15"
                  role="progressbar"
                >
                  <div
                    className="h-full rounded-full bg-linear-to-r from-primary to-accent transition-all duration-500 ease-out"
                    style={{ width: `${percentAvailable}%` }}
                  />
                </div>

                <p className="mt-2 text-sm md:text-base leading-relaxed text-muted-foreground">{availabilitySummary}</p>
              </div>
            </div>
          </div>

          {/* Hero Image/Profile Picture */}
          <div className="lg:w-1/2 mt-10 lg:mt-0 flex justify-center lg:justify-end">
            <div
              className="relative shrink-0"
              style={{
                height: "clamp(18rem, 36vw, 30rem)",
                width: "clamp(18rem, 36vw, 30rem)",
              }}
            >
              <div className="absolute inset-0 rounded-full bg-linear-to-br from-primary/8 via-transparent to-accent/10" />
              <div className="absolute inset-[8%] flex items-center justify-center rounded-full" ref={portraitRef}>
                <div className="h-full w-full rounded-full bg-linear-to-br from-primary/20 to-accent/20 p-1.5">
                  <div className="h-full w-full rounded-full flex items-center justify-center overflow-hidden">
                    <ProfilePicture alt={t(hero.imageAlt)} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 hidden lg:flex flex-col items-center z-20">
        <span className="text-sm text-muted-foreground mb-2">{t(hero.scrollText)}</span>
        <ArrowDown className="w-5 h-5 text-primary animate-bounce" />
      </div>
    </section>
  );
};
HeroSection.displayName = "HeroSection";

export default HeroSection;
