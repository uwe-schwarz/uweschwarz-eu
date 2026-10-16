"use client";

import type { ComponentType, Ref } from "react";
import { BrainCircuit, Gauge, GraduationCap, Split } from "lucide-react";
import { siteContent } from "@/content/content";
import { useSettings } from "@/contexts/settings-hook";
import { getLocalizedTextKey } from "@/lib/localization";

interface TrainingsSectionProps {
  ref?: Ref<HTMLElement>;
}

type TrainingIcon = ComponentType<{ "aria-hidden"?: boolean | "true"; className?: string }>;

// Keyed by the English title; unknown trainings fall back to a generic cap.
const trainingIcons: Record<string, TrainingIcon> = {
  "Agentic AI Workflows": BrainCircuit,
  "HAProxy — Load Balancing in Practice": Split,
  "MLOps, Monitoring & Cost Control": Gauge,
};

const TrainingsSection = ({ ref }: TrainingsSectionProps) => {
  const { t } = useSettings();
  const { trainings } = siteContent;

  return (
    <section className="section-space relative" id="trainings" ref={ref}>
      <div className="section-shell">
        <header className="max-w-3xl">
          <h2 className="section-title">{t(trainings.title)}</h2>
          <p className="section-lede">{t(trainings.subtitle)}</p>
        </header>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {trainings.items.map((training, index) => {
            const Icon = trainingIcons[training.title.en] ?? GraduationCap;

            return (
              <article
                className={`sheet relative flex flex-col transition-transform duration-300 hover:-translate-y-1 hover:rotate-0 ${
                  index % 2 === 0 ? "xl:-rotate-[0.6deg]" : "xl:rotate-[0.6deg]"
                }`}
                key={getLocalizedTextKey(training.title)}
              >
                <div className="flex grow flex-col p-7">
                  <div className="flex items-center justify-between gap-3">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                      <Icon aria-hidden="true" className="h-6 w-6" />
                    </span>
                    <span className="-rotate-3 rounded-md border-2 border-redline/70 px-2.5 py-1 text-xs font-bold text-redline">
                      {t(training.duration)}
                    </span>
                  </div>

                  <h3 className="mt-7 text-2xl">{t(training.title)}</h3>
                  <p className="mt-4 grow leading-relaxed text-muted-foreground">{t(training.description)}</p>
                </div>

                {/* Perforation: tear here for the workshop */}
                <div aria-hidden="true" className="relative h-0">
                  <span className="absolute -left-3 -top-3 h-6 w-6 rounded-full border border-border bg-background [clip-path:inset(0_0_0_50%)]" />
                  <span className="absolute -right-3 -top-3 h-6 w-6 rounded-full border border-border bg-background [clip-path:inset(0_50%_0_0)]" />
                  <span className="absolute inset-x-5 top-0 border-t-2 border-dashed border-border" />
                </div>

                <ul className="flex flex-wrap gap-1.5 p-7 pt-6">
                  {training.tags.map((tag) => (
                    <li className="chip" key={`${getLocalizedTextKey(training.title)}-${getLocalizedTextKey(tag)}`}>
                      {t(tag)}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

TrainingsSection.displayName = "TrainingsSection";

export default TrainingsSection;
