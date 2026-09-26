"use client";

import { useState } from "react";
import Image from "next/image";
import { m, useReducedMotion } from "motion/react";
import { siteContent } from "@/content/content";
import { useSettings } from "@/contexts/settings-hook";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getLocalizedTextKey } from "@/lib/localization";

type Project = (typeof siteContent.projects)[number];

const getProjectId = (project: Project) =>
  `project-${getLocalizedTextKey(project.title)
    .toLowerCase()
    .replaceAll(/[^a-z0-9]+/g, "-")
    .replaceAll(/^-|-$/g, "")}`;

const ProjectPrint = ({ alt, className, project }: { alt: string; className?: string; project: Project }) => (
  <div className={`print p-4 ${className ?? ""}`}>
    <span aria-hidden="true" className="print-tape" />
    <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
      <Image
        alt={alt}
        className="object-contain p-4"
        fill
        sizes="(min-width: 1024px) 520px, 80vw"
        src={project.imageUrl}
      />
    </div>
  </div>
);

const ProjectTags = ({ project, t }: { project: Project; t: ReturnType<typeof useSettings>["t"] }) => (
  <ul className="flex flex-wrap gap-1.5">
    {project.tags.map((tag) => (
      <li className="chip" key={`${getProjectId(project)}-${getLocalizedTextKey(tag)}`}>
        {t(tag)}
      </li>
    ))}
  </ul>
);

const ProjectsSection = () => {
  const { t } = useSettings();
  const { projects, webSections } = siteContent;
  const prefersReducedMotion = useReducedMotion();
  const [activeProject, setActiveProject] = useState(() => getProjectId(projects[0]));

  return (
    <section className="section-space relative" id="projects">
      <div className="section-shell">
        <header className="max-w-3xl">
          <h2 className="section-title">{t(webSections.projects.headline)}</h2>
          {webSections.projects.lede && <p className="section-lede">{t(webSections.projects.lede)}</p>}
        </header>

        {/* Desktop: browse the list, the print follows */}
        <Tabs
          activationMode="automatic"
          className="mt-16 hidden gap-12 lg:grid lg:grid-cols-12"
          onValueChange={setActiveProject}
          orientation="vertical"
          value={activeProject}
        >
          <TabsList
            aria-label={t(webSections.projects.headline)}
            className="col-span-6 flex h-auto flex-col items-stretch justify-start rounded-none border-t border-border bg-transparent p-0"
          >
            {projects.map((project) => {
              const projectId = getProjectId(project);

              return (
                <TabsTrigger
                  className="group relative flex h-auto flex-col items-start gap-2 whitespace-normal rounded-none border-b border-border px-0 py-5 pl-6 text-left text-muted-foreground transition-colors hover:text-foreground data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none"
                  key={projectId}
                  onPointerEnter={() => setActiveProject(projectId)}
                  value={projectId}
                >
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-1/2 h-10 w-1 -translate-y-1/2 scale-y-0 rounded-full bg-redline transition-transform duration-300 group-data-[state=active]:scale-y-100"
                  />
                  <span className="type-heading text-xl xl:text-2xl">{t(project.title)}</span>
                  <span className="text-sm font-normal text-muted-foreground">
                    {project.tags
                      .slice(0, 3)
                      .map((tag) => t(tag))
                      .join(", ")}
                  </span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          <div className="col-span-6">
            <div className="sticky top-28">
              {projects.map((project) => {
                const projectId = getProjectId(project);

                return (
                  <TabsContent className="mt-0" key={projectId} value={projectId}>
                    <m.div
                      animate={{ opacity: 1, rotate: 1.5, y: 0 }}
                      initial={prefersReducedMotion ? false : { opacity: 0, rotate: -1, y: 16 }}
                      transition={{ damping: 24, stiffness: 240, type: "spring" }}
                    >
                      <ProjectPrint alt={t(project.imageAlt)} project={project} />
                    </m.div>
                    <p className="mt-8 leading-relaxed text-muted-foreground">{t(project.description)}</p>
                    <div className="mt-5">
                      <ProjectTags project={project} t={t} />
                    </div>
                  </TabsContent>
                );
              })}
            </div>
          </div>
        </Tabs>

        {/* Mobile and tablet: swipe through the prints */}
        <div
          aria-label={t(webSections.projects.headline)}
          className="-mx-4 mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-6 pt-4 [scrollbar-width:thin] sm:-mx-8 sm:px-8 lg:hidden"
          role="region"
          tabIndex={0}
        >
          {projects.map((project) => (
            <article
              className="sheet flex w-[85%] shrink-0 snap-center flex-col p-4 sm:w-[60%]"
              key={getProjectId(project)}
            >
              <ProjectPrint alt={t(project.imageAlt)} className="rotate-1" project={project} />
              <h3 className="mt-6 text-xl">{t(project.title)}</h3>
              <p className="mt-3 grow text-[0.95rem] leading-relaxed text-muted-foreground">{t(project.description)}</p>
              <div className="mt-5">
                <ProjectTags project={project} t={t} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

ProjectsSection.displayName = "ProjectsSection";

export default ProjectsSection;
