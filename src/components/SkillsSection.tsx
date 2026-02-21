"use client";

import React, { useState } from "react";
import { siteContent } from "@/content/content";
import { skillsWithIcons, type SkillWithIcon } from "@/content/skills-with-icons";
import { useSettings } from "@/contexts/settings-hook";
import { Briefcase, ShieldCheck, Bot, Network, Wrench, Flag } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

type TabValue = "management" | "languages" | "security" | "ai" | "infrastructure" | "tools";
interface SkillsTabIds {
  panelId: string;
  triggerId: string;
}

const createSkillsTabIds = (value: TabValue): SkillsTabIds => ({
  panelId: `skills-panel-${value}`,
  triggerId: `skills-trigger-${value}`,
});

const skillsTabIds: Record<TabValue, SkillsTabIds> = {
  ai: createSkillsTabIds("ai"),
  infrastructure: createSkillsTabIds("infrastructure"),
  languages: createSkillsTabIds("languages"),
  management: createSkillsTabIds("management"),
  security: createSkillsTabIds("security"),
  tools: createSkillsTabIds("tools"),
};

const skillsByCategory = skillsWithIcons.reduce<Record<TabValue, Array<SkillWithIcon>>>(
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

const SkillsSection = () => {
  const { t } = useSettings();
  const { skillsSection } = siteContent;
  const [activeTab, setActiveTab] = useState<TabValue>("management");

  return (
    <section className="section-padding" id="skills">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl text-center mb-4">
          <span className="text-gradient">{t(skillsSection.title)}</span>
        </h2>

        <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-16">{t(skillsSection.subtitle)}</p>

        <div className="max-w-4xl mx-auto">
          <Tabs className="w-full" onValueChange={(value) => setActiveTab(value as TabValue)} value={activeTab}>
            <div className="flex justify-center mb-8">
              <TabsList className="flex-nowrap h-12 md:h-auto">
                <TabsTrigger
                  aria-controls={skillsTabIds.management.panelId}
                  aria-label={t(skillsSection.categories.management)}
                  className="gap-2 text-lg md:flex-col md:gap-1 md:text-sm xl:flex-row xl:gap-2 xl:text-base"
                  id={skillsTabIds.management.triggerId}
                  name={t(skillsSection.categories.management)}
                  value="management"
                >
                  <Briefcase className="w-5 h-5" />
                  <span className="hidden md:block">{t(skillsSection.categories.management)}</span>
                </TabsTrigger>
                <TabsTrigger
                  aria-controls={skillsTabIds.languages.panelId}
                  aria-label={t(skillsSection.categories.languages)}
                  className="gap-2 text-lg md:flex-col md:gap-1 md:text-sm xl:flex-row xl:gap-2 xl:text-base"
                  id={skillsTabIds.languages.triggerId}
                  name={t(skillsSection.categories.languages)}
                  value="languages"
                >
                  <Flag className="w-5 h-5" />
                  <span className="hidden md:block">{t(skillsSection.categories.languages)}</span>
                </TabsTrigger>
                <TabsTrigger
                  aria-controls={skillsTabIds.security.panelId}
                  aria-label={t(skillsSection.categories.security)}
                  className="gap-2 text-lg md:flex-col md:gap-1 md:text-sm xl:flex-row xl:gap-2 xl:text-base"
                  id={skillsTabIds.security.triggerId}
                  name={t(skillsSection.categories.security)}
                  value="security"
                >
                  <ShieldCheck className="w-5 h-5" />
                  <span className="hidden md:block">{t(skillsSection.categories.security)}</span>
                </TabsTrigger>
                <TabsTrigger
                  aria-controls={skillsTabIds.ai.panelId}
                  aria-label={t(skillsSection.categories.ai)}
                  className="gap-2 text-lg md:flex-col md:gap-1 md:text-sm xl:flex-row xl:gap-2 xl:text-base"
                  id={skillsTabIds.ai.triggerId}
                  name={t(skillsSection.categories.ai)}
                  value="ai"
                >
                  <Bot className="w-5 h-5" />
                  <span className="hidden md:block">{t(skillsSection.categories.ai)}</span>
                </TabsTrigger>
                <TabsTrigger
                  aria-controls={skillsTabIds.infrastructure.panelId}
                  aria-label={t(skillsSection.categories.infrastructure)}
                  className="gap-2 text-lg md:flex-col md:gap-1 md:text-sm xl:flex-row xl:gap-2 xl:text-base"
                  id={skillsTabIds.infrastructure.triggerId}
                  name={t(skillsSection.categories.infrastructure)}
                  value="infrastructure"
                >
                  <Network className="w-5 h-5" />
                  <span className="hidden md:block">{t(skillsSection.categories.infrastructure)}</span>
                </TabsTrigger>
                <TabsTrigger
                  aria-controls={skillsTabIds.tools.panelId}
                  aria-label={t(skillsSection.categories.tools)}
                  className="gap-2 text-lg md:flex-col md:gap-1 md:text-sm xl:flex-row xl:gap-2 xl:text-base"
                  id={skillsTabIds.tools.triggerId}
                  name={t(skillsSection.categories.tools)}
                  value="tools"
                >
                  <Wrench className="w-5 h-5" />
                  <span className="hidden md:block">{t(skillsSection.categories.tools)}</span>
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent
              aria-labelledby={skillsTabIds.management.triggerId}
              className="mt-0"
              id={skillsTabIds.management.panelId}
              value="management"
            >
              <SkillsGrid skills={skillsByCategory.management} />
            </TabsContent>
            <TabsContent
              aria-labelledby={skillsTabIds.languages.triggerId}
              className="mt-0"
              id={skillsTabIds.languages.panelId}
              value="languages"
            >
              <SkillsGrid skills={skillsByCategory.languages} />
            </TabsContent>
            <TabsContent
              aria-labelledby={skillsTabIds.security.triggerId}
              className="mt-0"
              id={skillsTabIds.security.panelId}
              value="security"
            >
              <SkillsGrid skills={skillsByCategory.security} />
            </TabsContent>
            <TabsContent
              aria-labelledby={skillsTabIds.ai.triggerId}
              className="mt-0"
              id={skillsTabIds.ai.panelId}
              value="ai"
            >
              <SkillsGrid skills={skillsByCategory.ai} />
            </TabsContent>
            <TabsContent
              aria-labelledby={skillsTabIds.infrastructure.triggerId}
              className="mt-0"
              id={skillsTabIds.infrastructure.panelId}
              value="infrastructure"
            >
              <SkillsGrid skills={skillsByCategory.infrastructure} />
            </TabsContent>
            <TabsContent
              aria-labelledby={skillsTabIds.tools.triggerId}
              className="mt-0"
              id={skillsTabIds.tools.panelId}
              value="tools"
            >
              <SkillsGrid skills={skillsByCategory.tools} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

interface SkillsGridProps {
  skills: Array<SkillWithIcon>;
}

const SkillsGrid = ({ skills }: SkillsGridProps) => {
  const { t } = useSettings();
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-6">
      {skills.map((skill) => {
        const IconComponent = skill.icon;
        return (
          <div
            className="p-4 rounded-lg border border-border bg-card flex flex-col items-center hover-scale transition-all"
            key={skill.id}
          >
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-3 text-primary">
              <IconComponent className="w-5 h-5" />
            </div>

            <h3 className="text-base font-medium mb-2">{t(skill.name)}</h3>

            <div className="flex gap-1">
              {Array.from({ length: 5 }, (_, level) => level + 1).map((level) => (
                <div
                  className={cn("w-2 h-2 rounded-full", level <= skill.level ? "bg-primary" : "bg-muted")}
                  key={`${skill.id}-${level}`}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SkillsSection;
