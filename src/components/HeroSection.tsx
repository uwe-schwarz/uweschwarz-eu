"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import type { CSSProperties } from "react";
import { FileText, MessageSquareText } from "lucide-react";
import { AnimatePresence, m, useReducedMotion } from "motion/react";
import HeroDiagram from "@/components/HeroDiagram";
import { Button } from "@/components/ui/button";
import { useSettings } from "@/contexts/settings-hook";
import { siteContent } from "@/content/content";
import { Link } from "@/i18n/navigation";

const ROLE_INTERVAL_MS = 2800;

const formatTemplate = (template: string, values: Record<string, number | string>) => {
  return Object.entries(values).reduce((message, [key, value]) => {
    return message.replaceAll(`{${key}}`, String(value));
  }, template);
};

// The dependency visual check freezes rotating copy and ambient motion.
const subscribeToNothing = () => () => {};
const getVisualRegressionSnapshot = () => window.document.documentElement.dataset.visualRegression === "true";
const getServerVisualRegressionSnapshot = () => false;

const enterStep = (step: number) => ({ "--enter-step": step }) as CSSProperties;

const HeroSection = () => {
  const { t } = useSettings();
  const { hero } = siteContent;
  const prefersReducedMotion = useReducedMotion();
  const isVisualRegression = useSyncExternalStore(
    subscribeToNothing,
    getVisualRegressionSnapshot,
    getServerVisualRegressionSnapshot,
  );
  const [roleIndex, setRoleIndex] = useState(0);
  const isRotating = !isVisualRegression && !prefersReducedMotion;

  useEffect(() => {
    if (!isRotating) {
      return;
    }

    const interval = window.setInterval(() => {
      setRoleIndex((previous) => (previous + 1) % hero.titleElements.length);
    }, ROLE_INTERVAL_MS);

    return () => window.clearInterval(interval);
  }, [hero.titleElements.length, isRotating]);

  const roles = hero.titleElements.map((role) => t(role));
  const currentRole = roles[isRotating ? roleIndex : 0];
  const percentAvailable = Math.min(Math.max(hero.availability.currentPercentAvailable, 0), 100);
  const currentAvailability = formatTemplate(t(hero.availability.currentLine), { percent: percentAvailable });
  const fullAvailability = formatTemplate(t(hero.availability.fullLine), {
    date: hero.availability.fullyAvailableDate,
  });

  return (
    <section
      className="relative isolate overflow-hidden pb-20 pt-[calc(var(--header-height)+3.5rem)] lg:min-h-dvh lg:pb-16"
      id="hero"
    >
      <div className="section-shell grid items-center gap-y-16 lg:min-h-[calc(100dvh-10rem)] lg:grid-cols-12 lg:gap-x-10">
        <div className="lg:col-span-7">
          <h1 className="hero-enter text-[3.4rem] sm:text-8xl xl:text-[8.5rem]" style={enterStep(0)}>
            {hero.name.split(" ").map((part) => (
              <span className="block" key={part}>
                {part}
              </span>
            ))}
          </h1>

          {/* Screen readers get every role once; the rotation is visual only. */}
          <p className="hero-enter mt-6 text-xl sm:text-2xl" style={enterStep(1)}>
            <span className="sr-only">{roles.join(", ")}</span>
            <span aria-hidden="true" className="relative inline-grid overflow-hidden py-1 type-heading">
              {/* Invisible copies reserve the widest role so the line never reflows */}
              {roles.map((role) => (
                <span className="invisible col-start-1 row-start-1 whitespace-nowrap" key={role}>
                  {role}
                </span>
              ))}
              <AnimatePresence initial={false} mode="popLayout">
                <m.span
                  animate={{ opacity: 1, y: "0%" }}
                  // Shrink to the role so the gradient spans its own text, not the reserved width
                  className="col-start-1 row-start-1 justify-self-start whitespace-nowrap text-ink-gradient"
                  exit={{ opacity: 0, y: "-90%" }}
                  initial={{ opacity: 0, y: "90%" }}
                  key={currentRole}
                  transition={{ damping: 22, stiffness: 260, type: "spring" }}
                >
                  {currentRole}
                </m.span>
              </AnimatePresence>
            </span>
          </p>

          <p
            className="hero-enter mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl"
            style={enterStep(2)}
          >
            {t(hero.pitch)}
          </p>

          <div className="hero-enter mt-9 flex flex-wrap gap-3" style={enterStep(3)}>
            <Button asChild size="lg">
              <a href="#contact">
                <MessageSquareText aria-hidden="true" />
                {t(hero.ctaPrimary)}
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/cv">
                <FileText aria-hidden="true" />
                {t(hero.ctaSecondary)}
              </Link>
            </Button>
          </div>

          <div
            className="hero-enter mt-10 flex max-w-md items-center gap-4 rounded-2xl border border-border bg-card/80 px-4 py-3 backdrop-blur-sm"
            style={enterStep(4)}
          >
            <span aria-hidden="true" className="status-light shrink-0" />
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline justify-between gap-3 text-sm">
                <span className="font-semibold">{currentAvailability}</span>
                <span className="text-muted-foreground">{fullAvailability}</span>
              </div>
              <progress
                aria-label={t(hero.availability.title)}
                className="mt-2 block h-1.5 w-full overflow-hidden rounded-full bg-primary/15 [&::-moz-progress-bar]:rounded-full [&::-moz-progress-bar]:bg-primary [&::-webkit-progress-bar]:rounded-full [&::-webkit-progress-bar]:bg-primary/15 [&::-webkit-progress-value]:rounded-full [&::-webkit-progress-value]:bg-primary"
                max={100}
                value={percentAvailable}
              />
            </div>
          </div>
        </div>

        <div className="hero-enter lg:col-span-5" style={enterStep(2)}>
          <HeroDiagram isFrozen={isVisualRegression} />
        </div>
      </div>
    </section>
  );
};

HeroSection.displayName = "HeroSection";

export default HeroSection;
