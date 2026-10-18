"use client";

import type { MouseEvent } from "react";
import { ArrowDownRight } from "lucide-react";
import { siteContent } from "@/content/content";
import { useSettings } from "@/contexts/settings-hook";
import { getExperienceAnchorId, requestExperienceReveal } from "@/lib/experience-anchor";

const handleClick = (event: MouseEvent<HTMLAnchorElement>, slug: string) => {
  // Let modified clicks (new tab, …) keep their native behaviour.
  if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
    return;
  }

  event.preventDefault();
  requestExperienceReveal(slug);
};

const SituationsStrip = () => {
  const { t } = useSettings();
  const { situations } = siteContent;

  return (
    <section aria-labelledby="situations-title" className="relative pb-16 sm:pb-20" id="situations">
      <div className="section-shell">
        <p className="font-mono text-xs font-semibold tracking-[0.2em] text-redline uppercase">
          {t(situations.eyebrow)}
        </p>
        <h2 className="mt-3 text-3xl sm:text-4xl" id="situations-title">
          {t(situations.title)}
        </h2>

        {/* Phones: a swipeable row that peeks at the next card; then a grid. */}
        <ol className="-mx-4 mt-8 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pb-3 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4">
          {situations.items.map((item, index) => (
            <li
              className="relative flex w-[80%] shrink-0 snap-start flex-col rounded-xl border border-border bg-card/85 p-5 transition-colors focus-within:border-primary hover:border-primary sm:w-auto"
              key={item.experienceSlug}
            >
              <span aria-hidden="true" className="absolute left-5 top-0 h-0.5 w-8 bg-redline" />
              <span aria-hidden="true" className="font-mono text-xs font-medium tracking-wider text-muted-foreground">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 text-lg">{t(item.title)}</h3>
              <p className="mt-2 grow text-[0.95rem] leading-relaxed text-muted-foreground">{t(item.text)}</p>
              <a
                className="mt-4 inline-flex min-h-11 items-center gap-1.5 self-start text-sm font-semibold text-primary link-quiet after:absolute after:inset-0 after:rounded-xl"
                href={`#${getExperienceAnchorId(item.experienceSlug)}`}
                onClick={(event) => handleClick(event, item.experienceSlug)}
              >
                {t(item.linkLabel)}
                <ArrowDownRight aria-hidden="true" className="h-4 w-4 shrink-0" />
              </a>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

SituationsStrip.displayName = "SituationsStrip";

export default SituationsStrip;
