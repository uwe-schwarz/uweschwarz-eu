"use client";

import { useId, useRef, useState } from "react";
import type { Ref } from "react";
import Image from "next/image";
import { BadgeCheck, ChevronDown, FileText, MapPin } from "lucide-react";
import { AnimatePresence, m } from "motion/react";
import { useHydrationSafeReducedMotion } from "@/hooks/use-hydration-safe-reduced-motion";
import { siteContent } from "@/content/content";
import type { Experience } from "@/content/content";
import { useSettings } from "@/contexts/settings-hook";
import { Link } from "@/i18n/navigation";
import { getLocalizedTextKey, type LocalizedString } from "@/lib/localization";

type TranslateFn = (value: LocalizedString) => string;

const VISIBLE_RESULTS = 2;

// Content lists engagements newest first; older ones sit behind "show more".
const VISIBLE_KEY_PROJECTS = 3;

// Stable ref callback: runs only when the first revealed entry mounts, i.e. right after "show more".
const focusOnMount = (node: HTMLHeadingElement | null) => {
  node?.focus();
};

const formatPeriod = (period: string) => period.replace(" - ", " – ");

const getExperienceKey = (exp: Experience) =>
  `${exp.company}-${getLocalizedTextKey(exp.title)}-${getLocalizedTextKey(exp.period)}`;

interface ExperienceEntryProps {
  exp: Experience;
  /** Receives focus after "show more" reveals this entry. */
  headingRef?: Ref<HTMLHeadingElement>;
  t: TranslateFn;
}

const ExperienceEntry = ({ exp, headingRef, t }: ExperienceEntryProps) => {
  const { webSections } = siteContent;
  const [isOpen, setIsOpen] = useState(false);
  const detailsId = useId();
  const prefersReducedMotion = useHydrationSafeReducedMotion();
  const [summary, ...details] = exp.description.filter((item) => item.type === "text");
  const allAchievements = exp.description.filter((item) => item.type === "achievement");
  // The first results stay visible; any further ones live in the details.
  const highlights = allAchievements.slice(0, VISIBLE_RESULTS);
  const achievements = allAchievements.slice(VISIBLE_RESULTS);
  const achievementLabel = t(siteContent.experienceAchievementPrefix);

  return (
    <li className="group relative grid gap-2 pb-12 last:pb-0 md:grid-cols-[9.5rem_1fr] md:gap-10">
      <p className="pl-8 pt-1 text-sm font-semibold tabular-nums text-muted-foreground md:pl-0 md:text-right">
        {formatPeriod(t(exp.period))}
      </p>

      <div className="relative pl-8 md:pl-10">
        {/* Rail and node */}
        <span aria-hidden="true" className="absolute bottom-[-3rem] left-[5px] top-3 w-px bg-rail group-last:hidden" />
        <span
          aria-hidden="true"
          className="absolute left-0 top-1.5 h-[11px] w-[11px] rounded-full border-2 border-primary bg-background"
        />

        <article>
          <div className="flex items-start justify-between gap-5">
            <div className="min-w-0">
              <h4 className="text-xl sm:text-2xl" ref={headingRef} tabIndex={headingRef ? -1 : undefined}>
                {t(exp.title)}
              </h4>
              <p className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.95rem]">
                <span className="font-semibold text-primary">{exp.company}</span>
                <span className="inline-flex items-center gap-1 text-muted-foreground">
                  <MapPin aria-hidden="true" className="h-3.5 w-3.5" />
                  {t(exp.location)}
                </span>
              </p>
            </div>

            {exp.logoUrl && (
              // Decorative: the company name is already in the text next to it.
              // Brand colours in both themes; dark-ink marks get a soft halo
              // (filter only), so size and position never change.
              <div className="relative hidden h-12 w-32 shrink-0 sm:block">
                <Image
                  alt=""
                  className={`object-contain object-right ${exp.logoNeedsDarkHalo ? "logo-halo" : ""}`}
                  fill
                  sizes="128px"
                  src={exp.logoUrl}
                />
              </div>
            )}
          </div>

          {summary && <p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">{t(summary.text)}</p>}

          {highlights.length > 0 && (
            <ul className="mt-4 max-w-3xl space-y-2.5">
              {highlights.map((item) => (
                <li
                  className="flex gap-3 font-medium leading-relaxed text-foreground"
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

          <button
            aria-controls={detailsId}
            aria-expanded={isOpen}
            className="-mx-2 mt-2.5 inline-flex min-h-11 items-center gap-1.5 rounded-md px-2 py-1.5 text-sm font-semibold text-primary transition-colors hover:text-foreground focus-visible:outline-offset-2"
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
                          <span aria-hidden="true" className="mt-[0.7rem] h-px w-3 shrink-0 bg-muted-foreground" />
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
  /** Entries shown before "show more"; all entries when omitted. */
  initialVisible?: number;
  items: Array<Experience>;
  note: LocalizedString;
  subtitle: LocalizedString;
  t: TranslateFn;
  title: LocalizedString;
}

const ExperienceGroup = ({ initialVisible, items, note, subtitle, t, title }: ExperienceGroupProps) => {
  const { webSections } = siteContent;
  const [isExpanded, setIsExpanded] = useState(false);
  const listId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const visibleCount = initialVisible ?? items.length;
  const hiddenCount = Math.max(items.length - visibleCount, 0);
  const visibleItems = isExpanded ? items : items.slice(0, visibleCount);

  if (!items.length) {
    return null;
  }

  const toggle = () => {
    if (isExpanded) {
      setIsExpanded(false);
      // The list shrinks above the button; keep it (and focus) in view.
      requestAnimationFrame(() => toggleRef.current?.scrollIntoView({ block: "nearest" }));
      return;
    }

    setIsExpanded(true);
  };

  return (
    <div className="mt-20">
      <div className="mb-10 md:ml-[calc(9.5rem+2.5rem)]">
        <h3 className="text-2xl sm:text-3xl">{t(title)}</h3>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          {t(subtitle)} {t(note)}
        </p>
      </div>
      <ol id={listId}>
        {visibleItems.map((exp, index) => (
          <ExperienceEntry
            exp={exp}
            headingRef={index === visibleCount ? focusOnMount : undefined}
            key={getExperienceKey(exp)}
            t={t}
          />
        ))}
      </ol>
      {hiddenCount > 0 && (
        <div className="mt-10 pl-8 md:ml-[calc(9.5rem+2.5rem)] md:pl-10">
          <button
            aria-controls={listId}
            aria-expanded={isExpanded}
            className="inline-flex min-h-11 items-center gap-1.5 rounded-md border border-dashed border-primary px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary/10"
            onClick={toggle}
            ref={toggleRef}
            type="button"
          >
            {isExpanded
              ? t(webSections.experience.showFewerProjects)
              : t(webSections.experience.showMoreProjects).replace("{count}", String(hiddenCount))}
            <span className="sr-only">{` – ${t(title)}`}</span>
            <ChevronDown
              aria-hidden="true"
              className={`h-4 w-4 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
            />
          </button>
        </div>
      )}
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
              className="redline-note absolute -bottom-12 right-0 hidden rotate-[-4deg] md:block xl:-right-40 xl:bottom-4"
            >
              {t(webSections.experience.note)}
            </p>
          )}
        </header>

        <ExperienceGroup
          initialVisible={VISIBLE_KEY_PROJECTS}
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
