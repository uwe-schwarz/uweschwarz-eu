
import React, { useState } from "react";
import { siteContent } from "@/content/content";
import { useSettings } from "@/contexts/SettingsContext";
import { Code, Database, Settings, Brain, Sparkles } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

// Get the icon component based on skill name
const getSkillIcon = (iconName: string) => {
  switch (iconName) {
    case "code":
      return <Code className="w-5 h-5" />;
    case "server":
    case "database":
      return <Database className="w-5 h-5" />;
    case "settings":
    case "cog":
      return <Settings className="w-5 h-5" />;
    case "brain":
      return <Brain className="w-5 h-5" />;
    default:
      return <Sparkles className="w-5 h-5" />;
  }
};

const SkillsSection = () => {
  const { t } = useSettings();
  const { skills, skillsSection } = siteContent;
  const [activeTab, setActiveTab] = useState<
    "frontend" | "backend" | "tools" | "ai"
  >("frontend");

  // Filter skills by category
  const filteredSkills = skills.filter((skill) => skill.category === activeTab);

  return (
    <section id="skills" className="section-padding">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          <span className="text-gradient">{t(skillsSection.title)}</span>
        </h2>

        <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-16">
          {t(skillsSection.subtitle)}
        </p>

        <div className="max-w-4xl mx-auto">
          <Tabs
            defaultValue="frontend"
            onValueChange={(value) => setActiveTab(value as any)}
            className="w-full"
          >
            <div className="flex justify-center mb-8">
              <TabsList className="flex-nowrap h-12">
                <TabsTrigger value="frontend" className="gap-2 text-lg">
                  <Code className="w-5 h-5" />
                  <span className="hidden sm:inline">
                    {t(skillsSection.categories.frontend)}
                  </span>
                </TabsTrigger>
                <TabsTrigger value="backend" className="gap-2 text-lg">
                  <Database className="w-5 h-5" />
                  <span className="hidden sm:inline">
                    {t(skillsSection.categories.backend)}
                  </span>
                </TabsTrigger>
                <TabsTrigger value="tools" className="gap-2 text-lg">
                  <Settings className="w-5 h-5" />
                  <span className="hidden sm:inline">
                    {t(skillsSection.categories.tools)}
                  </span>
                </TabsTrigger>
                <TabsTrigger value="ai" className="gap-2 text-lg">
                  <Brain className="w-5 h-5" />
                  <span className="hidden sm:inline">
                    {t(skillsSection.categories.ai)}
                  </span>
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Skill content panels */}
            <TabsContent value="frontend" className="mt-0">
              <SkillsGrid skills={filteredSkills} />
            </TabsContent>
            <TabsContent value="backend" className="mt-0">
              <SkillsGrid skills={filteredSkills} />
            </TabsContent>
            <TabsContent value="tools" className="mt-0">
              <SkillsGrid skills={filteredSkills} />
            </TabsContent>
            <TabsContent value="ai" className="mt-0">
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
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
      {skills.map((skill, index) => (
        <div
          key={index}
          className="p-4 rounded-lg border border-border bg-card flex flex-col items-center hover-scale transition-all"
        >
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-3 text-primary">
            {getSkillIcon(skill.icon)}
          </div>

          <h3 className="text-base font-medium mb-2">{skill.name}</h3>

          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={cn(
                  "w-2 h-2 rounded-full",
                  i < skill.level ? "bg-primary" : "bg-muted"
                )}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkillsSection;
