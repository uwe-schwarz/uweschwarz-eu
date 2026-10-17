"use client";

import { useState } from "react";
import { siteContent, type SkillLayer } from "@/content/content";
import { skillsWithIcons, type SkillWithIcon } from "@/content/skills-with-icons";
import { useSettings } from "@/contexts/settings-hook";

type SkillCategory = SkillWithIcon["category"];

interface LayerDefinition {
  category: SkillCategory;
  id: SkillLayer;
}

// Drawn top to bottom. Security is not a layer but a band across all of them.
const STACK_LAYERS: Array<LayerDefinition> = [
  { category: "management", id: "architecture" },
  { category: "ai", id: "application" },
  { category: "tools", id: "platform" },
  { category: "infrastructure", id: "infrastructure" },
];

const SECURITY_BAND: LayerDefinition = { category: "security", id: "security" };

// Phones show core skills plus this many others; the rest sit behind "+N more".
const MOBILE_EXTRA_SKILLS = 2;

const isCoreSkill = (skill: SkillWithIcon) => skill.core === true;

const getChipClassName = (core: boolean) =>
  `inline-flex min-h-[1.625rem] items-center rounded-md border px-2 py-0.5 text-[0.8125rem] leading-tight ${
    core
      ? "border-primary bg-primary font-semibold text-primary-foreground"
      : "border-border bg-background/70 text-muted-foreground"
  }`;

// Core skills first, original content order otherwise.
const getLayerSkills = (category: SkillCategory) => {
  const skills = skillsWithIcons.filter((skill) => skill.category === category);
  return [...skills.filter(isCoreSkill), ...skills.filter((skill) => !isCoreSkill(skill))];
};

const languageSkills = skillsWithIcons.filter((skill) => skill.category === "languages");

const SkillChip = ({ coreLabel, skill }: { coreLabel: string; skill: SkillWithIcon }) => {
  const { t } = useSettings();
  const core = isCoreSkill(skill);

  return (
    <span className={getChipClassName(core)}>
      {t(skill.name)}
      {core && <span className="sr-only">{` (${coreLabel})`}</span>}
    </span>
  );
};

const SkillLayerGroup = ({ layer }: { layer: LayerDefinition }) => {
  const { t } = useSettings();
  const [expanded, setExpanded] = useState(false);
  const copy = siteContent.webSections.skills;
  const skills = getLayerSkills(layer.category);
  const visibleOnMobile = skills.filter(isCoreSkill).length + MOBILE_EXTRA_SKILLS;
  const hiddenCount = Math.max(skills.length - visibleOnMobile, 0);
  const name = t(copy.layers[layer.id]);
  const coreLabel = t(copy.coreLabel);
  const headingId = `skills-layer-${layer.id}`;
  const listId = `skills-list-${layer.id}`;
  const isBand = layer.id === "security";

  return (
    <section
      aria-labelledby={headingId}
      className={
        isBand
          ? "border-t border-dashed border-redline/60 bg-redline/[0.04] p-4 lg:px-5 lg:py-3 xl:col-start-2 xl:row-span-4 xl:row-start-1 xl:border-l xl:border-t-0"
          : "border-t border-border p-4 first:border-t-0 lg:grid lg:grid-cols-[9.5rem_minmax(0,1fr)] lg:items-start lg:gap-4 lg:px-5 lg:py-3"
      }
    >
      <h3
        className="flex items-baseline gap-2 text-sm leading-snug font-semibold lg:flex-col lg:items-start lg:gap-0.5"
        id={headingId}
      >
        {isBand && (
          <>
            <span className="font-mono text-xs font-medium tracking-wider text-redline">
              {t(copy.crossCutting)}
            </span>{" "}
          </>
        )}
        <span>{name}</span>
      </h3>

      <ul className={`mt-3 flex flex-wrap gap-1.5 lg:gap-1 ${isBand ? "lg:mt-2.5" : "lg:mt-0"}`} id={listId}>
        {skills.map((skill, index) => (
          <li className={!expanded && index >= visibleOnMobile ? "max-lg:hidden" : undefined} key={skill.id}>
            <SkillChip coreLabel={coreLabel} skill={skill} />
          </li>
        ))}
        {hiddenCount > 0 && (
          <li className="lg:hidden">
            <button
              aria-controls={listId}
              aria-expanded={expanded}
              className="inline-flex min-h-[1.625rem] items-center rounded-md border border-dashed border-primary px-2.5 py-0.5 text-[0.8125rem] font-semibold text-primary transition-colors hover:bg-primary/10"
              onClick={() => setExpanded((value) => !value)}
              type="button"
            >
              {expanded ? t(copy.showLess) : t(copy.showMore).replace("{count}", String(hiddenCount))}
              <span className="sr-only">{` – ${name}`}</span>
            </button>
          </li>
        )}
      </ul>
    </section>
  );
};

// Drawn like a drawing's title block: a labelled header cell, then one cell per swatch.
const SkillsLegend = () => {
  const { t } = useSettings();
  const copy = siteContent.webSections.skills;
  const titleId = "skills-legend-title";
  const entries = [
    { core: true, label: t(copy.legendCore) },
    { core: false, label: t(copy.legendOther) },
  ];

  return (
    <div
      aria-labelledby={titleId}
      className="grid w-full grid-cols-1 overflow-hidden rounded-md border border-input bg-card text-foreground sm:w-auto sm:grid-cols-[auto_auto_auto] lg:ml-auto"
      role="group"
    >
      <p
        className="flex items-center border-b border-input bg-redline/[0.06] px-3 py-1.5 font-mono text-xs font-semibold tracking-[0.2em] text-redline uppercase sm:border-r sm:border-b-0"
        id={titleId}
      >
        {t(copy.legendTitle)}
      </p>
      <ul className="contents">
        {entries.map((entry) => (
          <li
            className="flex items-center gap-2.5 border-input px-3 py-2 not-last:border-b sm:not-last:border-r sm:not-last:border-b-0"
            key={entry.label}
          >
            <span aria-hidden="true" className={getChipClassName(entry.core)}>
              Aa
            </span>
            <span>{entry.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const SkillsSection = () => {
  const { t } = useSettings();
  const { skillsSection, webSections } = siteContent;
  const copy = webSections.skills;

  return (
    <section className="section-space relative" id="skills">
      <div className="section-shell">
        <header className="relative max-w-4xl">
          <h2 className="section-title">{t(copy.headline)}</h2>
          <p className="section-lede">{t(skillsSection.subtitle)}</p>
          {copy.note && (
            <p
              aria-hidden="true"
              className="redline-note relative z-20 mt-5 inline-block rotate-[-3deg] xl:absolute xl:-right-16 xl:bottom-5 xl:mt-0"
            >
              {t(copy.note)}
            </p>
          )}
        </header>

        <div className="relative mt-10">
          {/* Dimension line along the stack height, drawing-style */}
          <div
            aria-hidden="true"
            className="absolute inset-y-0 -left-7 hidden w-3 flex-col items-center text-redline/70 xl:flex"
          >
            <span className="h-px w-3 bg-current" />
            <span className="w-px flex-1 bg-current" />
            <span className="h-px w-3 bg-current" />
          </div>

          {/* Security band runs alongside the layers from xl, below them before that */}
          <div className="sheet overflow-hidden rounded-xl xl:grid xl:grid-cols-[minmax(0,1fr)_18rem] xl:grid-rows-[repeat(4,auto)]">
            {STACK_LAYERS.map((layer) => (
              <SkillLayerGroup key={layer.id} layer={layer} />
            ))}
            <SkillLayerGroup layer={SECURITY_BAND} />
          </div>

          {/* Languages on the left, the legend title block on the right */}
          <div className="mt-4 flex flex-wrap items-start gap-x-6 gap-y-4 px-1 text-sm text-muted-foreground lg:items-center">
            <p>
              <span className="font-mono text-xs tracking-wider text-redline">
                {t(skillsSection.categories.languages)}:
              </span>{" "}
              {languageSkills.map((skill) => t(skill.name)).join(" · ")}
            </p>
            <SkillsLegend />
          </div>
        </div>
      </div>
    </section>
  );
};

SkillsSection.displayName = "SkillsSection";

export default SkillsSection;
