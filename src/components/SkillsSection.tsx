
import React, { useState } from "react";
import { siteContent } from "@/content/content";
import { useSettings } from "@/contexts/SettingsContext";
import { AlertTriangle, BookCheck, Bot, Box, Bug, Brain, Briefcase, Cloud, Database, FileCheck2, FileText, FlaskConical, GitBranch, GitCompareArrows, Globe, Landmark, Laptop, ListChecks, Mail, MessageCircle, Network, Route, ScanSearch, Settings, Server, ServerCog, Shield, ShieldCheck, Siren, Sparkles, Swords, Terminal, Users, Wrench } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

// Get the icon component based on skill name
const getSkillIcon = (iconName: string) => {
  switch (iconName) {
    case "alert-triangle":
      return <AlertTriangle className="w-5 h-5" />;
    case "book-check":
      return <BookCheck className="w-5 h-5" />;
    case "bug":
      return <Bug className="w-5 h-5" />;
    case "brain":
      return <Brain className="w-5 h-5" />;
    case "briefcase":
      return <Briefcase className="w-5 h-5" />;
    case "bot":
      return <Bot className="w-5 h-5" />;
    case "box":
      return <Box className="w-5 h-5" />;
    case "cloud":
      return <Cloud className="w-5 h-5" />;
    case "database":
      return <Database className="w-5 h-5" />;
    case "file-check-2":
      return <FileCheck2 className="w-5 h-5" />;
    case "file-text":
      return <FileText className="w-5 h-5" />;
    case "flask-conical":
      return <FlaskConical className="w-5 h-5" />;
    case "git-branch":
      return <GitBranch className="w-5 h-5" />;
    case "git-compare-arrows":
      return <GitCompareArrows className="w-5 h-5" />;
    case "globe":
      return <Globe className="w-5 h-5" />;
    case "landmark":
      return <Landmark className="w-5 h-5" />;
    case "list-checks":
      return <ListChecks className="w-5 h-5" />;
    case "laptop":
      return <Laptop className="w-5 h-5" />;
    case "mail":
      return <Mail className="w-5 h-5" />;
    case "message-circle":
      return <MessageCircle className="w-5 h-5" />;
    case "network":
      return <Network className="w-5 h-5" />;
    case "route":
      return <Route className="w-5 h-5" />;
    case "scan-search":
      return <ScanSearch className="w-5 h-5" />;
    case "settings":
      return <Settings className="w-5 h-5" />;
    case "server":
      return <Server className="w-5 h-5" />;
    case "server-cog":
      return <ServerCog className="w-5 h-5" />;
    case "shield":
      return <Shield className="w-5 h-5" />;
    case "shield-check":
      return <ShieldCheck className="w-5 h-5" />;
    case "siren":
      return <Siren className="w-5 h-5" />;
    case "sparkles":
      return <Sparkles className="w-5 h-5" />;
    case "swords":
      return <Swords className="w-5 h-5" />;
    case "terminal":
      return <Terminal className="w-5 h-5" />;
    case "users":
      return <Users className="w-5 h-5" />;
    case "wrench":
      return <Wrench className="w-5 h-5" />;
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
            defaultValue="security"
            onValueChange={(value) => setActiveTab(value as any)}
            className="w-full"
          >
            <div className="flex justify-center mb-8">
              <TabsList className="flex-nowrap h-12">
                <TabsTrigger value="security" className="gap-2 text-lg">
                  <ShieldCheck className="w-5 h-5" />
                  <span className="hidden sm:inline">
                    {t(skillsSection.categories.security)}
                  </span>
                </TabsTrigger>
                <TabsTrigger value="infrastructure" className="gap-2 text-lg">
                  <Network className="w-5 h-5" />
                  <span className="hidden sm:inline">
                    {t(skillsSection.categories.infrastructure)}
                  </span>
                </TabsTrigger>
                <TabsTrigger value="tools" className="gap-2 text-lg">
                  <Wrench className="w-5 h-5" />
                  <span className="hidden sm:inline">
                    {t(skillsSection.categories.tools)}
                  </span>
                </TabsTrigger>
                <TabsTrigger value="management" className="gap-2 text-lg">
                  <Briefcase className="w-5 h-5" />
                  <span className="hidden sm:inline">
                    {t(skillsSection.categories.management)}
                  </span>
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Skill content panels */}
            <TabsContent value="security" className="mt-0">
              <SkillsGrid skills={filteredSkills} />
            </TabsContent>
            <TabsContent value="infrastructure" className="mt-0">
              <SkillsGrid skills={filteredSkills} />
            </TabsContent>
            <TabsContent value="tools" className="mt-0">
              <SkillsGrid skills={filteredSkills} />
            </TabsContent>
            <TabsContent value="management" className="mt-0">
              <SkillsGrid skills={filteredSkills} />
            </TabsContent>
            <TabsContent value="side_projects" className="mt-0">
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
