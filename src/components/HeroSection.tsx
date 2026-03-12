"use client";

import React, { useEffect, useRef, useState } from "react";
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

const calculatePosition = (position: number, distance: number) => {
  const angle = (position / 100) * 2 * Math.PI; // Convert percentage to radians
  const radius = (distance / 100) * 50; // Scale distance percentage to fit container

  // Calculate position around the circle
  const x = 50 + radius * Math.sin(angle);
  const y = 50 - radius * Math.cos(angle);

  return {
    left: `${x}%`,
    top: `${y}%`,
    transform: "translate(-50%, -50%)",
  };
};

const formatTemplate = (template: string, values: Record<string, number | string>) => {
  return Object.entries(values).reduce((message, [key, value]) => {
    return message.replaceAll(`{${key}}`, String(value));
  }, template);
};

const decodeDecorativeLabel = (label: string) => label.replaceAll("&nbsp;", "\u00a0");

interface MagicRingPosition {
  height: number;
  left: number;
  top: number;
  width: number;
}

const HeroSection = () => {
  const { language, t, theme } = useSettings();
  const { hero } = siteContent;
  const sectionRef = useRef<HTMLElement | null>(null);
  const portraitRef = useRef<HTMLDivElement | null>(null);

  // State for the rotating title
  const [titleIndex, setTitleIndex] = useState(0);
  const [magicRingPosition, setMagicRingPosition] = useState<MagicRingPosition | null>(null);

  // Set up title rotation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex((prevIndex) => (prevIndex + 1) % hero.titleElements.length);
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, [hero.titleElements.length]);

  useEffect(() => {
    const section = sectionRef.current;
    const portrait = portraitRef.current;

    if (!section || !portrait) {
      return;
    }

    const updateMagicRingPosition = () => {
      const portraitRect = portrait.getBoundingClientRect();
      const sectionRect = section.getBoundingClientRect();
      const size = Math.max(sectionRect.width, sectionRect.height) * 1.35;

      setMagicRingPosition({
        height: size,
        left: portraitRect.left - sectionRect.left + portraitRect.width / 2,
        top: portraitRect.top - sectionRect.top + portraitRect.height / 2,
        width: size,
      });
    };

    updateMagicRingPosition();

    const resizeObserver = new ResizeObserver(updateMagicRingPosition);
    resizeObserver.observe(section);
    resizeObserver.observe(portrait);
    window.addEventListener("resize", updateMagicRingPosition);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateMagicRingPosition);
    };
  }, []);

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
  const magicRingColors =
    theme === "dark"
      ? {
          color: "#8fe8c1",
          colorTwo: "#b49cff",
        }
      : {
          color: "#1d6948",
          colorTwo: "#5741aa",
        };

  return (
    <section
      className="min-h-screen flex items-center pt-20 bg-grid relative overflow-hidden isolate"
      id="hero"
      ref={sectionRef}
    >
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div
          className="absolute opacity-80"
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
            attenuation={11}
            baseRadius={0.24}
            blur={0.5}
            clickBurst={false}
            color={magicRingColors.color}
            colorTwo={magicRingColors.colorTwo}
            fadeIn={0.45}
            fadeOut={0.3}
            followMouse={false}
            lineThickness={1.2}
            noiseAmount={0.03}
            opacity={theme === "dark" ? 0.78 : 0.42}
            parallax={0.02}
            radiusStep={0.09}
            ringCount={7}
            ringGap={1.35}
            rotation={-18}
            scaleRate={0.11}
            speed={0.7}
          />
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
            <div className="relative w-full max-w-lg aspect-square" ref={portraitRef}>
              {/* Background glow effect */}
              <div className="w-full h-full rounded-full bg-linear-to-br from-primary to-accent/70 shadow-xl filter blur-sm absolute"></div>

              {/* Profile picture container */}
              <div className="w-[95%] h-[95%] rounded-full bg-background absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center overflow-hidden">
                <div className="w-[75%] h-[75%] rounded-full bg-linear-to-br from-primary/20 to-accent/20 p-1">
                  <div className="w-full h-full rounded-full bg-background flex items-center justify-center overflow-hidden">
                    {/* Profile image */}
                    <ProfilePicture alt={t(hero.imageAlt)} />
                  </div>
                </div>
              </div>

              {/* Dynamically positioned decorative elements - now without animation-delay for immediate positioning */}
              {hero.decorativeElements.map((element, index) => {
                const posStyle = calculatePosition(element.position, element.distance);
                const key = `${element.code}-${element.position}-${element.distance}`;
                return (
                  <div
                    className="absolute p-4 card-glass rounded-lg shadow-lg transform rotate-3 animate-float"
                    key={key}
                    style={{
                      ...posStyle,
                      transform: `${posStyle.transform} rotate(${index * 9 - 6}deg)`,
                    }}
                  >
                    <code className="text-xs sm:text-sm text-gradient">{decodeDecorativeLabel(element.code)}</code>
                  </div>
                );
              })}
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
