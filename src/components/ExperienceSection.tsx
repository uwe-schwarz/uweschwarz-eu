"use client";

import { useId, useState } from "react";
import Image from "next/image";
import { BadgeCheck, ChevronDown, FileText, MapPin } from "lucide-react";
import { AnimatePresence, m, useReducedMotion } from "motion/react";
import { siteContent } from "@/content/content";
import type { Experience } from "@/content/content";
import { useSettings } from "@/contexts/settings-hook";
import { Link } from "@/i18n/navigation";
import { getLocalizedTextKey, type LocalizedString } from "@/lib/localization";

type TranslateFn = (value: LocalizedString) => string;

const formatPeriod = (period: string) => period.replace(" - ", " – ");

const getExperienceKey = (exp: Experience) =>
  `${exp.company}-${getLocalizedTextKey(exp.title)}-${getLocalizedTextKey(exp.period)}`;

interface ExperienceEntryProps {
  exp: Experience;
  t: TranslateFn;
}

const ExperienceEntry = ({ exp, t }: ExperienceEntryProps) => {
  const { webSections } = siteContent;
  const [isOpen, setIsOpen] = useState(false);
  const detailsId = useId();
  const prefersReducedMotion = useReducedMotion();
  const [summary, ...details] = exp.description.filter((item) => item.type === "text");
  const achievements = exp.description.filter((item) => item.type === "achievement");
  const achievementLabel = t(siteContent.experienceAchievementPrefix);

  return (
    <li className="group relative grid gap-2 pb-12 last:pb-0 md:grid-cols-[9.5rem_1fr] md:gap-10">
      <p className="pl-8 pt-1 text-sm font-semibold tabular-nums text-muted-foreground md:pl-0 md:text-right">
        {formatPeriod(t(exp.period))}
      </p>

      <div className="relative pl-8 md:pl-10">
        {/* Rail and node */}
        <span
          aria-hidden="true"
          className="absolute bottom-[-3rem] left-[5px] top-3 w-px bg-primary/30 group-last:hidden"
        />
        <span
          aria-hidden="true"
          className="absolute left-0 top-1.5 h-[11px] w-[11px] rounded-full border-2 border-primary bg-background"
        />

        <article>
          <div className="flex items-start justify-between gap-5">
            <div className="min-w-0">
              <h4 className="text-xl sm:text-2xl">{t(exp.title)}</h4>
              <p className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.95rem]">
                <span className="font-semibold text-primary">{exp.company}</span>
                <span className="inline-flex items-center gap-1 text-muted-foreground">
                  <MapPin aria-hidden="true" className="h-3.5 w-3.5" />
                  {t(exp.location)}
                </span>
              </p>
            </div>

            {exp.logoUrl && (
              <div
                className={`relative hidden h-12 w-24 shrink-0 overflow-hidden rounded-lg border p-2 sm:block ${
                  exp.logoBackground === "light" ? "border-border bg-white" : "border-white/10 bg-[#0c1733]"
                }`}
              >
                <Image
                  alt={`${exp.company} logo`}
                  className="h-full w-full object-contain"
                  height={48}
                  sizes="96px"
                  src={exp.logoUrl}
                  width={96}
                />
              </div>
            )}
          </div>

          {summary && <p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">{t(summary.text)}</p>}

          <button
            aria-controls={detailsId}
            aria-expanded={isOpen}
            className="mt-4 inline-flex items-center gap-1.5 rounded-full text-sm font-semibold text-primary transition-colors hover:text-foreground"
            onClick={() => setIsOpen((previous) => !previous)}
            type="button"
          >
            {t(isOpen ? webSections.experience.hideDetails : webSections.experience.showDetails)}
            <ChevronDown
              aria-hidden="true"
              className={`h-4 w-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
            />
          </button>

          <AnimatePresence initial={false} mode="popLayout">
            {isOpen && (
              <m.div
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, transition: { duration: 0.12 }, y: -6 }}
                id={detailsId}
                initial={prefersReducedMotion ? false : { opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
              >
                <div className="sheet mt-4 max-w-3xl p-5 sm:p-6">
                  {details.length > 0 && (
                    <ul className="space-y-2.5">
                      {details.map((item) => (
                        <li
                          className="flex gap-3 leading-relaxed"
                          key={`${getExperienceKey(exp)}-${getLocalizedTextKey(item.text)}`}
                        >
                          <span aria-hidden="true" className="mt-[0.7rem] h-px w-3 shrink-0 bg-muted-foreground/60" />
                          <span>{t(item.text)}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {achievements.length > 0 && (
                    <ul className={`space-y-2.5 ${details.length > 0 ? "mt-5 border-t border-border pt-5" : ""}`}>
                      {achievements.map((item) => (
                        <li
                          className="flex gap-3 leading-relaxed"
                          key={`${getExperienceKey(exp)}-${getLocalizedTextKey(item.text)}`}
                        >
                          <BadgeCheck aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-redline" />
                          <span>
                            <span className="sr-only">{achievementLabel} </span>
                            {t(item.text)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}

                  <ul className="mt-5 flex flex-wrap gap-1.5">
                    {exp.tags.map((tag) => (
                      <li className="chip" key={`${getExperienceKey(exp)}-${getLocalizedTextKey(tag)}`}>
                        {t(tag)}
                      </li>
                    ))}
                  </ul>
                </div>
              </m.div>
            )}
          </AnimatePresence>
        </article>
      </div>
    </li>
  );
};

interface ExperienceGroupProps {
  items: Array<Experience>;
  note: LocalizedString;
  subtitle: LocalizedString;
  t: TranslateFn;
  title: LocalizedString;
}

const ExperienceGroup = ({ items, note, subtitle, t, title }: ExperienceGroupProps) => {
  if (!items.length) {
    return null;
  }

  return (
    <div className="mt-20">
      <div className="mb-10 md:ml-[calc(9.5rem+2.5rem)]">
        <h3 className="text-2xl sm:text-3xl">{t(title)}</h3>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          {t(subtitle)} {t(note)}
        </p>
      </div>
      <ol>
        {items.map((exp) => (
          <ExperienceEntry exp={exp} key={getExperienceKey(exp)} t={t} />
        ))}
      </ol>
    </div>
  );
};

const ExperienceSection = () => {
  const { t } = useSettings();
  const { experiences, webSections } = siteContent;
  const majorExperiences = experiences.filter((exp) => exp.projectScale !== "small");
  const smallExperiences = experiences.filter((exp) => exp.projectScale === "small");

  return (
    <section className="section-space relative" id="experience">
      <div className="section-shell">
        <header className="relative max-w-4xl">
          <h2 className="section-title">{t(webSections.experience.headline)}</h2>
          {webSections.experience.lede && <p className="section-lede">{t(webSections.experience.lede)}</p>}
          {webSections.experience.note && (
            <p
              aria-hidden="true"
              className="redline-note absolute -bottom-12 right-0 hidden rotate-[-4deg] text-2xl md:block xl:-right-40 xl:bottom-4"
            >
              {t(webSections.experience.note)}
            </p>
          )}
        </header>

        <ExperienceGroup
          items={majorExperiences}
          note={siteContent.experienceBigProjectsNote}
          subtitle={siteContent.experienceBigProjectsSubtitle}
          t={t}
          title={siteContent.experienceBigProjectsTitle}
        />
        <ExperienceGroup
          items={smallExperiences}
          note={siteContent.experienceSmallProjectsNote}
          subtitle={siteContent.experienceSmallProjectsSubtitle}
          t={t}
          title={siteContent.experienceSmallProjectsTitle}
        />

        <div className="mt-16 flex flex-col gap-3 text-muted-foreground sm:flex-row sm:items-center sm:justify-between md:ml-[calc(9.5rem+2.5rem)]">
          <p>{t(siteContent.moreProjects)}</p>
          <Link className="inline-flex items-center gap-2 font-semibold text-primary link-quiet" href="/cv">
            <FileText aria-hidden="true" className="h-4 w-4" />
            {t(siteContent.downloadResume)}
          </Link>
        </div>
      </div>
    </section>
  );
};

ExperienceSection.displayName = "ExperienceSection";

export default ExperienceSection;
