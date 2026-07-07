"use client";

import { GraduationCap } from "lucide-react";
import { CalendarDaysIcon } from "@/components/icons/calendar-days";
import { Badge } from "@/components/ui/badge";
import { siteContent } from "@/content/content";
import { useSettings } from "@/contexts/settings-hook";
import { getLocalizedTextKey } from "@/lib/localization";

const TrainingsSection = () => {
  const { t } = useSettings();
  const { trainings } = siteContent;

  return (
    <section className="section-padding bg-muted/40" id="trainings">
      <div className="container mx-auto">
        <div className="mb-14 flex flex-col items-center gap-4 text-center reveal-up">
          <h2 className="text-4xl md:text-5xl">
            <span className="text-gradient">{t(trainings.title)}</span>
          </h2>
          <p className="max-w-2xl text-lg text-muted-foreground">{t(trainings.subtitle)}</p>
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2">
          {trainings.items.map((training) => (
            <article
              className="glass-panel hover-lift relative flex flex-col overflow-hidden p-7 md:p-8 reveal-up"
              key={getLocalizedTextKey(training.title)}
            >
              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-primary/60 to-accent/60"
              />

              <div className="mb-5 flex items-center justify-between gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <GraduationCap className="h-6 w-6" />
                </div>
                <Badge
                  className="rounded-full border-transparent bg-accent/15 font-medium text-accent"
                  variant="outline"
                >
                  {t(training.duration)}
                </Badge>
              </div>

              <h3 className="text-2xl">{t(training.title)}</h3>

              <div className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
                <CalendarDaysIcon size={14} />
                <span>
                  {t(trainings.deliveredLabel)}: {t(training.date)}
                </span>
              </div>

              <p className="mt-4 grow leading-relaxed text-muted-foreground">{t(training.description)}</p>

              <div className="mt-6 flex flex-wrap gap-2">
                {training.tags.map((tag) => (
                  <Badge
                    className="rounded-full border-border/70 bg-muted/50 font-normal text-foreground/80"
                    key={`${getLocalizedTextKey(training.title)}-${getLocalizedTextKey(tag)}`}
                    variant="outline"
                  >
                    {t(tag)}
                  </Badge>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

TrainingsSection.displayName = "TrainingsSection";

export default TrainingsSection;
