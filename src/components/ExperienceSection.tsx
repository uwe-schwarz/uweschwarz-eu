"use client";

import Image from "next/image";
import React, { useEffect } from "react";
import Link from "next/link";
import type { Route } from "next";
import { siteContent } from "@/content/content";
import type { Experience } from "@/content/content";
import { useSettings } from "@/contexts/settings-hook";
import { FileTextIcon } from "@/components/icons/file-text";
import { MapPinIcon } from "@/components/icons/map-pin";
import { CalendarDaysIcon } from "@/components/icons/calendar-days";
import { ArchiveIcon } from "@/components/icons/archive";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { withLanguagePrefix } from "@/lib/i18n";

const ExperienceSection = () => {
  const { language, t } = useSettings();
  const { experiences } = siteContent;
  const majorExperiences = experiences.filter((exp) => exp.projectScale !== "small");
  const smallExperiences = experiences.filter((exp) => exp.projectScale === "small");

  // Animation beim Scrollen
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
            entry.target.classList.remove("opacity-0");
          }
        });
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      },
    );
    const timelineItems = document.querySelectorAll(".timeline-item");
    timelineItems.forEach((item) => {
      item.classList.add("opacity-0");
      observer.observe(item);
    });
    return () => {
      timelineItems.forEach((item) => {
        observer.unobserve(item);
      });
    };
  }, []);

  const renderExperienceTimeline = (items: Array<Experience>, sectionKey: string) => {
    if (!items.length) {
      return null;
    }

    return (
      <div className="relative max-w-7xl mx-auto pb-12" key={sectionKey}>
        <div className="absolute md:block hidden left-0 transform -translate-x-1/2 h-full w-1 bg-linear-to-b from-primary/30 via-primary/70 to-secondary/30 rounded"></div>
        <div className="absolute md:block hidden left0 transform -translate-x-1/2 w-1 pointer-events-none h-full">
          <div className="relative h-full w-full">
            <div className="absolute top-0 left-0 w-full h-20 bg-linear-to-b from-transparent via-primary to-transparent animate-timeline-glow"></div>
          </div>
        </div>

        <div className="mt-16">
          {items.map((exp, index) => (
            <div
              className={cn(
                "timeline-item grid grid-cols-1 md:grid-cols-12 gap-8 relative",
                index !== 0 ? "-mt-20 md:mt-10" : "",
                "mb-16 md:mb-0",
                "transition-all duration-500 ease-out",
              )}
              key={`${sectionKey}-${index}`}
            >
              {/* Timeline dot */}
              <div className="absolute top-8 transform -translate-x-1/2 z-10">
                <div className="w-6 h-6 rounded-full bg-primary border-4 border-background shadow-lg"></div>
              </div>

              <div className={cn("md:col-span-11", "md:col-start-2")}>
                <div
                  className={cn("hidden md:block absolute top-11 border-t-2 border-dashed border-primary/60 z-5")}
                  style={{
                    left: "15px",
                    right: "calc(100% - (100%/12) - 0rem)",
                    width: "auto",
                  }}
                ></div>

                <Card
                  className={cn(
                    "overflow-hidden border border-border transition-all duration-300 rounded-lg hover-scale",
                    "shadow-xl border-4 border-white dark:border-gray-800",
                    // Add shadow like in the About section
                    "bg-linear-to-br from-primary/40 to-accent/40",
                    "backdrop-blur-sm",
                  )}
                >
                  {/* Logo (if exists) - positioned right, offset from the corner with flowing text */}
                  {exp.logoUrl && (
                    <Image
                      alt={`${exp.company} logo`}
                      className="object-contain mx-auto mt-6 md:mx-0 md:float-right md:ml-2 md:mb-2 md:mr-6 w-24 h-auto"
                      height={48}
                      src={exp.logoUrl}
                      width={96}
                    />
                  )}

                  <CardContent className="p-6">
                    {/* Title & Company */}
                    <div className="mb-4">
                      <h3 className="text-2xl">{t(exp.title)}</h3>
                      <p className="text-lg font-medium">{exp.company}</p>
                    </div>

                    {/* Period & Location */}
                    <div
                      className={cn(
                        "flex flex-col items-start gap-2 mb-4 text-sm text-card-foreground/70 text-left",
                        "md:flex-row md:gap-4 md:items-center",
                      )}
                    >
                      <div className="flex items-center">
                        <CalendarDaysIcon className="mr-1" size={14} />
                        <span>{t(exp.period)}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPinIcon className="mr-1" size={14} />
                        <span>{t(exp.location)}</span>
                      </div>
                    </div>

                    {/* Description */}
                    <ul className="mb-5 space-y-2 text-left list-none">
                      {exp.description.map((item, i) => (
                        <li className="flex items-start gap-2" key={i}>
                          {/* Symbol */}
                          <span
                            className={`mt-1 text-xs ${
                              item.type === "achievement" ? "text-primary" : "text-muted-foreground"
                            }`}
                          >
                            {item.type === "achievement" ? (
                              <svg
                                fill="currentColor"
                                height="16"
                                viewBox="0 0 16 16"
                                width="16"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M13.485 1.929a1 1 0 0 1 .086 1.408l-7.071 8a1 1 0 0 1-1.485.041l-3-3a1 1 0 1 1 1.414-1.414l2.293 2.293 6.364-7.192a1 1 0 0 1 1.408-.086z" />
                              </svg>
                            ) : (
                              <svg
                                fill="currentColor"
                                height="16"
                                viewBox="0 0 16 16"
                                width="16"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M5 3.5L11 8L5 12.5V3.5Z" />
                              </svg>
                            )}
                          </span>
                          <span className="flex-1">
                            {item.type === "achievement" ? (
                              <>
                                <span className="font-semibold text-primary">
                                  {t(siteContent.experienceAchievementPrefix)}
                                </span>{" "}
                                {t(item.text)}
                              </>
                            ) : (
                              t(item.text)
                            )}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {exp.tags.map((tag, tagIndex) => (
                        <Badge
                          className="font-normal bg-secondary hover:bg-secondary/80 text-foreground"
                          key={tagIndex}
                          variant="secondary"
                        >
                          {t(tag)}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <section className="section-padding py-20 relative bg-background" id="experience">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl text-center mb-16">
          <span className="text-gradient">{t(siteContent.experienceSectionTitle)}</span>
        </h2>

        {majorExperiences.length > 0 && (
          <div className="space-y-6">
            <div className="max-w-4xl mx-auto text-center space-y-3">
              <h3 className="text-3xl md:text-4xl font-semibold text-primary">
                {t(siteContent.experienceBigProjectsTitle)}
              </h3>
              <p className="text-lg text-muted-foreground">{t(siteContent.experienceBigProjectsSubtitle)}</p>
              <p className="text-sm italic text-muted-foreground">{t(siteContent.experienceBigProjectsNote)}</p>
            </div>
            {renderExperienceTimeline(majorExperiences, "major")}
          </div>
        )}

        {smallExperiences.length > 0 && (
          <div className="space-y-6 pt-12 border-t border-border/40">
            <div className="max-w-4xl mx-auto text-center space-y-3">
              <h3 className="text-3xl md:text-4xl font-semibold text-primary">
                {t(siteContent.experienceSmallProjectsTitle)}
              </h3>
              <p className="text-lg text-muted-foreground">{t(siteContent.experienceSmallProjectsSubtitle)}</p>
              <p className="text-sm italic text-muted-foreground">{t(siteContent.experienceSmallProjectsNote)}</p>
            </div>
            {renderExperienceTimeline(smallExperiences, "small")}
          </div>
        )}

        <div className="text-center mt-8">
          {/* More Projects */}
          <div className="inline-flex items-center text-primary hover:text-primary/80 transition-colors">
            <ArchiveIcon className="mr-2" size={24} />
            <span>{t(siteContent.moreProjects)}</span>
          </div>
          <div className="mt-4"></div>
          {/* Download Resume */}
          <Link
            className="inline-flex items-center text-primary hover:text-primary/80 transition-colors link-underline"
            href={withLanguagePrefix(language, "/cv") as Route}
          >
            <FileTextIcon className="mr-2" size={24} />
            <span>{t(siteContent.downloadResume)}</span>
          </Link>
        </div>
      </div>

      {/* Custom CSS for mobile adjustments */}
      <style>
        {`
          @media (max-width: 768px) {
            .timeline-item {
              margin-top: 0 !important;
              margin-bottom: 2rem !important;
            }

            /* Hide timeline on mobile */
            .timeline-item .absolute {
              display: none;
            }
          }

          @keyframes timeline-glow {
            0% {
              top: 0;
              opacity: 1;
            }
            90% {
              opacity: 1;
            }
            100% {
              top: calc(100% - 5rem); /* 5rem = 80px = h-20 */
              opacity: 0;
            }
          }
          .animate-timeline-glow {
            animation: timeline-glow 10s linear infinite;
          }
        `}
      </style>
    </section>
  );
};
export default ExperienceSection;
