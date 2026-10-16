"use client";

import { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { m, useReducedMotion } from "motion/react";
import { siteContent } from "@/content/content";
import { useSettings } from "@/contexts/settings-hook";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getLocalizedTextKey } from "@/lib/localization";

type Project = (typeof siteContent.projects)[number];

const HOVER_INTENT_MS = 150;

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
        className="print-art object-contain p-4"
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
  const hoverTimeoutRef = useRef<number | undefined>(undefined);

  const cancelHoverIntent = () => window.clearTimeout(hoverTimeoutRef.current);

  // Pointer hover only switches after a short dwell so sweeping across the
  // list doesn't flick through every print; click and focus stay immediate.
  const scheduleHoverSwitch = (projectId: string) => {
    cancelHoverIntent();
    hoverTimeoutRef.current = window.setTimeout(() => setActiveProject(projectId), HOVER_INTENT_MS);
  };

  const selectProject = (projectId: string) => {
    cancelHoverIntent();
    setActiveProject(projectId);
  };

  useEffect(() => cancelHoverIntent, []);

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
          onValueChange={selectProject}
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
                  onPointerEnter={(event) => {
                    if (event.pointerType === "mouse") {
                      scheduleHoverSwitch(projectId);
                    }
                  }}
                  onPointerLeave={cancelHoverIntent}
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

        <ProjectsCarousel />
      </div>
    </section>
  );
};

// Long descriptions are clamped so the swipe cards stay a similar height. The
// toggle only appears when the text is actually cut off; the clamp is visual
// only, so screen readers always get the full description.
const ClampedDescription = ({ text }: { text: string }) => {
  const { t } = useSettings();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isClamped, setIsClamped] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);
  const textId = useId();

  useEffect(() => {
    const node = textRef.current;
    if (!node || isExpanded) {
      return;
    }

    const measure = () => setIsClamped(node.scrollHeight > node.clientHeight + 1);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);

    return () => observer.disconnect();
  }, [isExpanded, text]);

  return (
    <div className="mt-3 grow">
      <p
        className={`text-[0.95rem] leading-relaxed text-muted-foreground ${isExpanded ? "" : "line-clamp-5"}`}
        id={textId}
        ref={textRef}
      >
        {text}
      </p>
      {(isClamped || isExpanded) && (
        <button
          aria-controls={textId}
          aria-expanded={isExpanded}
          className="-mx-2 mt-1 inline-flex min-h-11 items-center rounded-md px-2 py-1.5 text-sm font-semibold text-primary transition-colors hover:text-foreground focus-visible:outline-offset-2"
          onClick={() => setIsExpanded((value) => !value)}
          type="button"
        >
          {isExpanded ? t({ de: "Weniger anzeigen", en: "Show less" }) : t({ de: "Mehr lesen", en: "Read more" })}
        </button>
      )}
    </div>
  );
};

ClampedDescription.displayName = "ClampedDescription";

const formatCount = (template: string, values: Record<string, number | string>) =>
  Object.entries(values).reduce((message, [key, value]) => message.replaceAll(`{${key}}`, String(value)), template);

// Mobile and tablet: swipe through the prints. The next card peeks in from
// the right and the pager below tracks the current card.
const ProjectsCarousel = () => {
  const { t } = useSettings();
  const { projects, webSections } = siteContent;
  const prefersReducedMotion = useReducedMotion();
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    breakpoints: { "(min-width: 1024px)": { active: false } },
    containScroll: "trimSnaps",
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const total = projects.length;

  useEffect(() => {
    if (!emblaApi) {
      return;
    }

    const syncSelected = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", syncSelected);
    emblaApi.on("reInit", syncSelected);

    return () => {
      emblaApi.off("select", syncSelected);
      emblaApi.off("reInit", syncSelected);
    };
  }, [emblaApi]);

  const slideLabel = t({ de: "Projekt {current} von {total}", en: "Project {current} of {total}" });
  const dotLabel = t({ de: "Projekt {current} zeigen: {title}", en: "Show project {current}: {title}" });

  return (
    <div
      aria-label={t(webSections.projects.headline)}
      aria-roledescription={t({ de: "Karussell", en: "carousel" })}
      className="mt-12 lg:hidden"
      role="region"
    >
      <div className="-mx-4 overflow-hidden sm:-mx-8" ref={emblaRef}>
        <div className="flex touch-pan-y py-4">
          {projects.map((project, index) => (
            <div
              aria-label={formatCount(slideLabel, { current: index + 1, total })}
              aria-roledescription={t({ de: "Folie", en: "slide" })}
              className="flex min-w-0 shrink-0 grow-0 basis-[89%] pl-4 sm:basis-[60%] sm:pl-8"
              key={getProjectId(project)}
              role="group"
            >
              <article className="sheet flex w-full flex-col p-4">
                <ProjectPrint alt={t(project.imageAlt)} className="rotate-1" project={project} />
                <h3 className="mt-6 text-xl">{t(project.title)}</h3>
                <ClampedDescription text={t(project.description)} />
                <div className="mt-5">
                  <ProjectTags project={project} t={t} />
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-4">
        <ul className="flex flex-wrap items-center">
          {projects.map((project, index) => {
            const isSelected = index === selectedIndex;

            return (
              <li key={getProjectId(project)}>
                <button
                  aria-current={isSelected ? "true" : undefined}
                  aria-label={formatCount(dotLabel, { current: index + 1, title: t(project.title) })}
                  className="group flex h-8 min-w-8 items-center justify-center rounded-full"
                  onClick={() => emblaApi?.scrollTo(index, Boolean(prefersReducedMotion))}
                  type="button"
                >
                  <span
                    aria-hidden="true"
                    className={`block h-2.5 rounded-full transition-[width,background-color] duration-300 ${
                      isSelected ? "w-6 bg-primary" : "w-2.5 bg-muted-foreground group-hover:bg-foreground"
                    }`}
                  />
                </button>
              </li>
            );
          })}
        </ul>
        <p aria-live="polite" className="shrink-0 text-sm font-semibold tabular-nums text-muted-foreground">
          <span className="sr-only">{formatCount(slideLabel, { current: selectedIndex + 1, total })}</span>
          <span aria-hidden="true">
            {selectedIndex + 1} / {total}
          </span>
        </p>
      </div>
    </div>
  );
};

ProjectsCarousel.displayName = "ProjectsCarousel";

ProjectsSection.displayName = "ProjectsSection";

export default ProjectsSection;
