"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";
import { ArrowDown } from "lucide-react";
import { FileTextIcon } from "@/components/icons/file-text";
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

const HeroSection = () => {
  const { language, t } = useSettings();
  const { hero } = siteContent;

  // State for the rotating title
  const [titleIndex, setTitleIndex] = useState(0);

  // Set up title rotation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex((prevIndex) => (prevIndex + 1) % hero.titleElements.length);
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, [hero.titleElements.length]);

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

  return (
    <section className="min-h-screen flex items-center pt-20 bg-grid relative overflow-hidden" id="hero">
      {/* Background Elements */}
      <div className="absolute w-64 h-64 bg-primary/50 rounded-full filter blur-3xl animate-[move-bg-1_25s_ease-in-out_infinite]"></div>
      <div className="absolute w-72 h-72 bg-accent/50 rounded-full filter blur-3xl animate-[move-bg-2_30s_ease-in-out_infinite]"></div>

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
            <div className="relative w-full max-w-lg aspect-square">
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
                return (
                  <div
                    className="absolute p-4 card-glass rounded-lg shadow-lg transform rotate-3 animate-float"
                    key={index}
                    style={{
                      ...posStyle,
                      transform: `${posStyle.transform} rotate(${index * 9 - 6}deg)`,
                    }}
                  >
                    <code
                      className="text-xs sm:text-sm text-gradient"
                      dangerouslySetInnerHTML={{ __html: element.code }}
                    />
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
