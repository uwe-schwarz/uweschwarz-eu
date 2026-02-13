"use client";

import React, { useState } from "react";
import { siteContent } from "@/content/content";
import { useSettings } from "@/contexts/settings-hook";
import { Briefcase, ShieldCheck, Bot, Network, Wrench, Flag } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const SkillsSection = () => {
  const { t } = useSettings();
  const { skills, skillsSection } = siteContent;
  type TabValue = "management" | "languages" | "security" | "ai" | "infrastructure" | "tools";
  const [activeTab, setActiveTab] = useState<TabValue>("management");

  // Filter skills by category
  const filteredSkills = skills.filter((skill) => skill.category === activeTab);

  return (
    <section className="section-padding" id="skills">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl text-center mb-4">
          <span className="text-gradient">{t(skillsSection.title)}</span>
        </h2>

        <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-16">{t(skillsSection.subtitle)}</p>

        <div className="max-w-4xl mx-auto">
          <Tabs className="w-full" defaultValue="management" onValueChange={(value) => setActiveTab(value as TabValue)}>
            <div className="flex justify-center mb-8">
              <TabsList className="flex-nowrap h-12">
                <TabsTrigger
                  aria-label={t(skillsSection.categories.management)}
                  className="gap-2 text-lg"
                  name={t(skillsSection.categories.management)}
                  value="management"
                >
                  <Briefcase className="w-5 h-5" />
                  <span className="hidden sm:inline">{t(skillsSection.categories.management)}</span>
                </TabsTrigger>
                <TabsTrigger
                  aria-label={t(skillsSection.categories.languages)}
                  className="gap-2 text-lg"
                  name={t(skillsSection.categories.languages)}
                  value="languages"
                >
                  <Flag className="w-5 h-5" />
                  <span className="hidden sm:inline">{t(skillsSection.categories.languages)}</span>
                </TabsTrigger>
                <TabsTrigger
                  aria-label={t(skillsSection.categories.security)}
                  className="gap-2 text-lg"
                  name={t(skillsSection.categories.security)}
                  value="security"
                >
                  <ShieldCheck className="w-5 h-5" />
                  <span className="hidden sm:inline">{t(skillsSection.categories.security)}</span>
                </TabsTrigger>
                <TabsTrigger
                  aria-label={t(skillsSection.categories.ai)}
                  className="gap-2 text-lg"
                  name={t(skillsSection.categories.ai)}
                  value="ai"
                >
                  <Bot className="w-5 h-5" />
                  <span className="hidden sm:inline">{t(skillsSection.categories.ai)}</span>
                </TabsTrigger>
                <TabsTrigger
                  aria-label={t(skillsSection.categories.infrastructure)}
                  className="gap-2 text-lg"
                  name={t(skillsSection.categories.infrastructure)}
                  value="infrastructure"
                >
                  <Network className="w-5 h-5" />
                  <span className="hidden sm:inline">{t(skillsSection.categories.infrastructure)}</span>
                </TabsTrigger>
                <TabsTrigger
                  aria-label={t(skillsSection.categories.tools)}
                  className="gap-2 text-lg"
                  name={t(skillsSection.categories.tools)}
                  value="tools"
                >
                  <Wrench className="w-5 h-5" />
                  <span className="hidden sm:inline">{t(skillsSection.categories.tools)}</span>
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Skill content panels */}
            <TabsContent className="mt-0" value="security">
              <SkillsGrid skills={filteredSkills} />
            </TabsContent>
            <TabsContent className="mt-0" value="infrastructure">
              <SkillsGrid skills={filteredSkills} />
            </TabsContent>
            <TabsContent className="mt-0" value="tools">
              <SkillsGrid skills={filteredSkills} />
            </TabsContent>
            <TabsContent className="mt-0" value="ai">
              <SkillsGrid skills={filteredSkills} />
            </TabsContent>
            <TabsContent className="mt-0" value="management">
              <SkillsGrid skills={filteredSkills} />
            </TabsContent>
            <TabsContent className="mt-0" value="languages">
              <SkillsGrid skills={filteredSkills} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

interface SkillsGridProps {
  skills: typeof siteContent.skills;
}

const SkillsGrid = ({ skills }: SkillsGridProps) => {
  const { t } = useSettings();
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-6">
      {skills.map((skill, index) => {
        const IconComponent = skill.icon;
        return (
          <div
            className="p-4 rounded-lg border border-border bg-card flex flex-col items-center hover-scale transition-all"
            key={index}
          >
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-3 text-primary">
              <IconComponent className="w-5 h-5" />
            </div>

            <h3 className="text-base font-medium mb-2">{t(skill.name)}</h3>

            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <div className={cn("w-2 h-2 rounded-full", i < skill.level ? "bg-primary" : "bg-muted")} key={i} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SkillsSection;
