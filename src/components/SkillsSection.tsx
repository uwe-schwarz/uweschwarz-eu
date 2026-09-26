"use client";

import type { ComponentType } from "react";
import { Bot, DraftingCompass, Languages, Network, ShieldCheck, Wrench } from "lucide-react";
import { siteContent } from "@/content/content";
import { skillsWithIcons, type SkillWithIcon } from "@/content/skills-with-icons";
import { useSettings } from "@/contexts/settings-hook";

type SkillCategory = SkillWithIcon["category"];

const CATEGORY_ORDER: Array<SkillCategory> = ["management", "security", "ai", "infrastructure", "tools", "languages"];

const CATEGORY_ICONS: Record<SkillCategory, ComponentType<{ "aria-hidden"?: boolean | "true"; className?: string }>> = {
  ai: Bot,
  infrastructure: Network,
  languages: Languages,
  management: DraftingCompass,
  security: ShieldCheck,
  tools: Wrench,
};

const skillsByCategory = skillsWithIcons.reduce<Record<SkillCategory, Array<SkillWithIcon>>>(
  (accumulator, skill) => {
    accumulator[skill.category].push(skill);
    return accumulator;
  },
  {
    ai: [],
    infrastructure: [],
    languages: [],
    management: [],
    security: [],
    tools: [],
  },
);

const LevelMeter = ({ label, level }: { label: string; level: number }) => (
  <span aria-label={label} className="flex shrink-0 gap-0.5" role="img">
    {Array.from({ length: 5 }, (_, index) => index + 1).map((step) => (
      <span className={`h-1.5 w-2.5 rounded-full ${step <= level ? "bg-primary" : "bg-foreground/12"}`} key={step} />
    ))}
  </span>
);

const SkillsSection = () => {
  const { t } = useSettings();
  const { skillsSection, webSections } = siteContent;

  return (
    <section className="section-space relative" id="skills">
      <div className="section-shell">
        <header className="max-w-3xl">
          <h2 className="section-title">{t(webSections.skills.headline)}</h2>
          <p className="section-lede">{t(skillsSection.subtitle)}</p>
        </header>

        <div className="mt-16 gap-6 md:columns-2 xl:columns-3">
          {CATEGORY_ORDER.map((category) => {
            const CategoryIcon = CATEGORY_ICONS[category];
            const skills = skillsByCategory[category];

            return (
              <section
                aria-labelledby={`skills-${category}`}
                className="sheet mb-6 break-inside-avoid p-6"
                key={category}
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/12 text-primary">
                    <CategoryIcon aria-hidden="true" className="h-5 w-5" />
                  </span>
                  <h3 className="text-lg" id={`skills-${category}`}>
                    {t(skillsSection.categories[category])}
                  </h3>
                  <span className="ml-auto text-sm tabular-nums text-muted-foreground">{skills.length}</span>
                </div>

                <ul className="mt-5 divide-y divide-border/70">
                  {skills.map((skill) => {
                    const SkillIcon = skill.icon;

                    return (
                      <li className="flex items-center gap-3 py-2.5" key={skill.id}>
                        <SkillIcon className="h-4 w-4 shrink-0 text-muted-foreground" />
                        <span className="min-w-0 flex-1 text-[0.95rem]">{t(skill.name)}</span>
                        <LevelMeter
                          label={t(webSections.skills.levelLabel).replace("{level}", String(skill.level))}
                          level={skill.level}
                        />
                      </li>
                    );
                  })}
                </ul>
              </section>
            );
          })}
        </div>
      </div>
    </section>
  );
};

SkillsSection.displayName = "SkillsSection";

export default SkillsSection;
