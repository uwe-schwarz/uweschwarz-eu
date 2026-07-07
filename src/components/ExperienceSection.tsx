"use client";

import Image from "next/image";
import Link from "next/link";
import type { Route } from "next";
import { siteContent } from "@/content/content";
import type { Experience } from "@/content/content";
import { useSettings } from "@/contexts/settings-hook";
import { FileTextIcon } from "@/components/icons/file-text";
import { MapPinIcon } from "@/components/icons/map-pin";
import { CalendarDaysIcon } from "@/components/icons/calendar-days";
import { ArchiveIcon } from "@/components/icons/archive";
import { Badge } from "@/components/ui/badge";
import { withLanguagePrefix } from "@/lib/i18n";
import { getLocalizedTextKey, type LocalizedString } from "@/lib/localization";

type TranslateFn = (value: LocalizedString) => string;

interface ExperienceTimelineProps {
  achievementPrefix: LocalizedString;
  items: Array<Experience>;
  sectionKey: string;
  t: TranslateFn;
}

const ExperienceCard = ({
  achievementPrefix,
  exp,
  sectionKey,
  t,
}: {
  achievementPrefix: LocalizedString;
  exp: Experience;
  sectionKey: string;
  t: TranslateFn;
}) => (
  <article className="glass-panel hover-lift relative overflow-hidden p-6 md:p-8">
    <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-primary/60 to-accent/60" />

    <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
      <div className="min-w-0">
        <h4 className="text-xl md:text-2xl">{t(exp.title)}</h4>
        <p className="mt-1 text-base font-medium text-primary">{exp.company}</p>

        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-muted-foreground">
          <div className="inline-flex items-center gap-1.5">
            <CalendarDaysIcon size={14} />
            {t(exp.period)}
          </div>
          <div className="inline-flex items-center gap-1.5">
            <MapPinIcon size={14} />
            {t(exp.location)}
          </div>
        </div>
      </div>

      {exp.logoUrl && (
        <div className="relative h-16 w-32 shrink-0 self-center overflow-hidden rounded-xl border border-zinc-700/60 bg-zinc-900 p-2.5 md:self-start">
          <Image
            alt={`${exp.company} logo`}
            className="h-full w-full object-contain"
            height={64}
            sizes="128px"
            src={exp.logoUrl}
            width={128}
          />
        </div>
      )}
    </div>

    <ul className="mt-5 space-y-2.5">
      {exp.description.map((item) => (
        <li
          className="flex items-start gap-2.5 leading-relaxed"
          key={`${sectionKey}-${exp.company}-${getLocalizedTextKey(exp.title)}-${item.type}-${getLocalizedTextKey(item.text)}`}
        >
          <span
            aria-hidden="true"
            className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${
              item.type === "achievement" ? "bg-primary ring-4 ring-primary/20" : "bg-muted-foreground/50"
            }`}
          />
          <span className="flex-1">
            {item.type === "achievement" ? (
              <>
                <span className="font-semibold text-primary">{t(achievementPrefix)}</span> {t(item.text)}
              </>
            ) : (
              t(item.text)
            )}
          </span>
        </li>
      ))}
    </ul>

    <div className="mt-6 flex flex-wrap gap-2">
      {exp.tags.map((tag) => (
        <Badge
          className="rounded-full border-border/70 bg-muted/50 font-normal text-foreground/80"
          key={`${sectionKey}-${exp.company}-${getLocalizedTextKey(exp.title)}-${getLocalizedTextKey(tag)}`}
          variant="outline"
        >
          {t(tag)}
        </Badge>
      ))}
    </div>
  </article>
);

const ExperienceTimeline = ({ achievementPrefix, items, sectionKey, t }: ExperienceTimelineProps) => {
  if (!items.length) {
    return null;
  }

  return (
    <div className="relative mx-auto mt-12 max-w-5xl">
      <div
        aria-hidden="true"
        className="absolute left-2 top-2 hidden h-full w-px bg-linear-to-b from-primary/60 via-border to-transparent md:block"
      />

      <div className="space-y-10">
        {items.map((exp) => (
          <div
            className="relative reveal-up md:pl-12"
            key={`${sectionKey}-${exp.company}-${getLocalizedTextKey(exp.title)}-${getLocalizedTextKey(exp.period)}`}
          >
            <span
              aria-hidden="true"
              className="absolute left-2 top-9 hidden h-3.5 w-3.5 -translate-x-1/2 rounded-full border-2 border-background bg-primary shadow-[0_0_0_4px_hsl(var(--primary)/0.2)] md:block"
            />
            <ExperienceCard achievementPrefix={achievementPrefix} exp={exp} sectionKey={sectionKey} t={t} />
          </div>
        ))}
      </div>
    </div>
  );
};

const ExperienceSection = () => {
  const { language, t } = useSettings();
  const { experiences } = siteContent;
  const majorExperiences = experiences.filter((exp) => exp.projectScale !== "small");
  const smallExperiences = experiences.filter((exp) => exp.projectScale === "small");

  return (
    <section className="section-padding relative bg-muted/40" id="experience">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-14 text-center reveal-up">
          <h2 className="text-4xl md:text-5xl">
            <span className="text-gradient">{t(siteContent.experienceSectionTitle)}</span>
          </h2>
        </div>

        {majorExperiences.length > 0 && (
          <div className="space-y-4">
            <div className="mx-auto max-w-3xl space-y-2 text-center reveal-up">
              <h3 className="text-2xl md:text-3xl font-semibold text-primary">
                {t(siteContent.experienceBigProjectsTitle)}
              </h3>
              <p className="text-lg text-muted-foreground">{t(siteContent.experienceBigProjectsSubtitle)}</p>
              <p className="text-sm italic text-muted-foreground/80">{t(siteContent.experienceBigProjectsNote)}</p>
            </div>
            <ExperienceTimeline
              achievementPrefix={siteContent.experienceAchievementPrefix}
              items={majorExperiences}
              sectionKey="major"
              t={t}
            />
          </div>
        )}

        {smallExperiences.length > 0 && (
          <div className="mt-20 space-y-4">
            <div className="mx-auto max-w-3xl space-y-2 text-center reveal-up">
              <h3 className="text-2xl md:text-3xl font-semibold text-primary">
                {t(siteContent.experienceSmallProjectsTitle)}
              </h3>
              <p className="text-lg text-muted-foreground">{t(siteContent.experienceSmallProjectsSubtitle)}</p>
              <p className="text-sm italic text-muted-foreground/80">{t(siteContent.experienceSmallProjectsNote)}</p>
            </div>
            <ExperienceTimeline
              achievementPrefix={siteContent.experienceAchievementPrefix}
              items={smallExperiences}
              sectionKey="small"
              t={t}
            />
          </div>
        )}

        <div className="mt-16 flex flex-col items-center gap-4 text-center reveal-up">
          {/* More Projects */}
          <div className="inline-flex items-center gap-2 text-muted-foreground">
            <ArchiveIcon size={20} />
            <span>{t(siteContent.moreProjects)}</span>
          </div>
          {/* Download Resume */}
          <Link
            className="inline-flex items-center gap-2 text-primary transition-colors hover:text-primary/80 link-underline"
            href={withLanguagePrefix(language, "/cv") as Route}
          >
            <FileTextIcon size={20} />
            <span>{t(siteContent.downloadResume)}</span>
          </Link>
        </div>
      </div>
    </section>
  );
};
export default ExperienceSection;
