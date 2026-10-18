"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { Ref } from "react";
import Image from "next/image";
import { BadgeCheck, ChevronDown, FileText, MapPin } from "lucide-react";
import { AnimatePresence, m } from "motion/react";
import { useHydrationSafeReducedMotion } from "@/hooks/use-hydration-safe-reduced-motion";
import { siteContent } from "@/content/content";
import type { Experience } from "@/content/content";
import { useSettings } from "@/contexts/settings-hook";
import { Link } from "@/i18n/navigation";
import { EXPERIENCE_REVEAL_EVENT, getExperienceAnchorId, getExperienceSlugFromHash } from "@/lib/experience-anchor";
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
    <li
      className="group relative grid gap-2 pb-12 last:pb-0 md:grid-cols-[9.5rem_1fr] md:gap-10"
      id={getExperienceAnchorId(exp.slug)}
    >
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
              {/* Focusable from script: "show more" and situation links move focus here */}
              <h4 className="text-xl sm:text-2xl" ref={headingRef} tabIndex={-1}>
                {t(exp.title)}
              </h4>
              <p className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.95rem]">
                <span className="inline-flex items-center gap-2 font-semibold text-primary">
                  {exp.logoUrl && (
                    // Phones: a small inline mark; the large logo takes over from sm.
                    // Fixed box so the line never shifts while the logo loads
                    <span aria-hidden="true" className="relative inline-block h-5 w-14 shrink-0 sm:hidden">
                      <Image
                        alt=""
                        className={`object-contain object-left ${exp.logoNeedsDarkHalo ? "logo-halo" : ""}`}
                        fill
                        sizes="56px"
                        src={exp.logoUrl}
                      />
                    </span>
                  )}
                  {exp.company}
                </span>
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

          {summary && <p className="mt-4 max-w-[65ch] leading-relaxed text-muted-foreground">{t(summary.text)}</p>}

          {highlights.length > 0 && (
            <ul className="mt-4 max-w-[65ch] space-y-2.5">
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
  isExpanded: boolean;
  /** Focus the first revealed entry; off when a link reveals a specific entry. */
  isFocusOnRevealEnabled: boolean;
  items: Array<Experience>;
  note?: LocalizedString;
  onToggle: (isExpanded: boolean) => void;
  /** Collapsed toggle label with a {count} placeholder. */
  showMoreLabel: LocalizedString;
  subtitle: LocalizedString;
  t: TranslateFn;
  title: LocalizedString;
}

const ExperienceGroup = ({
  initialVisible,
  isExpanded,
  isFocusOnRevealEnabled,
  items,
  note,
  onToggle,
  showMoreLabel,
  subtitle,
  t,
  title,
}: ExperienceGroupProps) => {
  const { webSections } = siteContent;
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
      onToggle(false);
      // The list shrinks above the button; keep it (and focus) in view.
      requestAnimationFrame(() => toggleRef.current?.scrollIntoView({ block: "nearest" }));
      return;
    }

    onToggle(true);
  };

  return (
    <div className="mt-20">
      <div className="mb-10 md:ml-[calc(9.5rem+2.5rem)]">
        <h3 className="text-2xl sm:text-3xl">{t(title)}</h3>
        <p className="mt-2 max-w-[65ch] text-muted-foreground">
          {t(subtitle)}
          {note && ` ${t(note)}`}
        </p>
      </div>
      <ol id={listId}>
        {visibleItems.map((exp, index) => (
          <ExperienceEntry
            exp={exp}
            headingRef={isFocusOnRevealEnabled && index === visibleCount ? focusOnMount : undefined}
            key={getExperienceKey(exp)}
            t={t}
          />
        ))}
      </ol>
      {/* Aligned with the entries when there are any, else with the group heading */}
      {hiddenCount > 0 && (
        <div className={`md:ml-[calc(9.5rem+2.5rem)] ${visibleItems.length ? "mt-10 pl-8 md:pl-10" : ""}`}>
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
              : t(showMoreLabel).replace("{count}", String(hiddenCount))}
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

type GroupKey = "major" | "small";

const majorExperiences = siteContent.experiences.filter((exp) => exp.projectScale !== "small");
const smallExperiences = siteContent.experiences.filter((exp) => exp.projectScale === "small");

// Groups that must expand so the entry is rendered at all.
const getGroupsToExpand = (slug: string): Partial<Record<GroupKey, boolean>> | null => {
  const majorIndex = majorExperiences.findIndex((exp) => exp.slug === slug);
  if (majorIndex !== -1) {
    return majorIndex >= VISIBLE_KEY_PROJECTS ? { major: true } : {};
  }

  return smallExperiences.some((exp) => exp.slug === slug) ? { small: true } : null;
};

const ExperienceSection = () => {
  const { t } = useSettings();
  const { webSections } = siteContent;
  const [expandedGroups, setExpandedGroups] = useState<Record<GroupKey, boolean>>({ major: false, small: false });
  // A fresh object per request, so revealing the same entry twice still scrolls.
  // While set, the link target gets focus instead of the first revealed entry.
  const [revealRequest, setRevealRequest] = useState<{ slug: string } | null>(null);

  // Runs after the expanded groups have rendered the target.
  useEffect(() => {
    if (!revealRequest) {
      return;
    }

    const target = document.getElementById(getExperienceAnchorId(revealRequest.slug));
    if (!target) {
      return;
    }

    // Lazy content above can shift the layout during a long smooth scroll;
    // line the target up once more when the scroll settles.
    // A small drift is layout shift; a big one is an unrelated (earlier)
    // scroll, so keep waiting a moment for the real end of this one.
    const scrollMargin = Number.parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
    const getDrift = () => Math.abs(target.getBoundingClientRect().top - scrollMargin);
    const stop = () => {
      window.removeEventListener("scrollend", realign);
      window.clearTimeout(timeout);
    };
    const realign = () => {
      const drift = getDrift();
      if (drift > 2 && drift < 160) {
        target.scrollIntoView({ behavior: "instant", block: "start" });
      }
      if (drift < 160) {
        stop();
      }
    };

    window.addEventListener("scrollend", realign);
    const timeout = window.setTimeout(stop, 3000);
    target.scrollIntoView({ block: "start" });
    target.querySelector<HTMLElement>("h4")?.focus({ preventScroll: true });

    return stop;
  }, [revealRequest]);

  useEffect(() => {
    const reveal = (slug: string | null) => {
      const groups = slug ? getGroupsToExpand(slug) : null;
      if (!slug || !groups) {
        return;
      }

      setRevealRequest({ slug });
      setExpandedGroups((previous) => ({ ...previous, ...groups }));
    };

    const handleReveal = (event: Event) => reveal((event as CustomEvent<string>).detail);
    const handleHashChange = () => reveal(getExperienceSlugFromHash(window.location.hash));

    window.addEventListener(EXPERIENCE_REVEAL_EVENT, handleReveal);
    window.addEventListener("hashchange", handleHashChange);
    // Deep links on load: the browser cannot find a collapsed target itself.
    const frame = window.requestAnimationFrame(handleHashChange);

    return () => {
      window.removeEventListener(EXPERIENCE_REVEAL_EVENT, handleReveal);
      window.removeEventListener("hashchange", handleHashChange);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  const toggleGroup = (group: GroupKey) => (isExpanded: boolean) => {
    setRevealRequest(null);
    setExpandedGroups((previous) => ({ ...previous, [group]: isExpanded }));
  };

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
          isExpanded={expandedGroups.major}
          isFocusOnRevealEnabled={!revealRequest}
          items={majorExperiences}
          note={siteContent.experienceBigProjectsNote}
          onToggle={toggleGroup("major")}
          showMoreLabel={webSections.experience.showMoreProjects}
          subtitle={siteContent.experienceBigProjectsSubtitle}
          t={t}
          title={siteContent.experienceBigProjectsTitle}
        />
        {/* Side projects start fully collapsed behind one toggle */}
        <ExperienceGroup
          initialVisible={0}
          isExpanded={expandedGroups.small}
          isFocusOnRevealEnabled={!revealRequest}
          items={smallExperiences}
          onToggle={toggleGroup("small")}
          showMoreLabel={webSections.experience.showSmallProjects}
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
