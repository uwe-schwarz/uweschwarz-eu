"use client";

import Image from "next/image";
import React from "react";
import { siteContent } from "@/content/content";
import { useSettings } from "@/contexts/settings-hook";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const ProjectsSection = () => {
  const { t } = useSettings();
  const { projects } = siteContent;

  return (
    <section className="section-padding bg-muted/40" id="projects">
      <div className="container mx-auto">
        <div className="mb-14 text-center reveal-up">
          <h2 className="text-4xl md:text-5xl">
            <span className="text-gradient">{t(siteContent.projectsSectionTitle)}</span>
          </h2>
        </div>

        <div className="relative px-12 reveal-up">
          <Carousel
            className="w-full"
            opts={{
              align: "start",
              loop: true,
            }}
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {projects.map((project) => (
                <CarouselItem
                  className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3"
                  key={`${project.title.en}-${project.title.de}`}
                >
                  <div className="glass-panel hover-lift h-full overflow-hidden">
                    {/* Project Image */}
                    <div className="aspect-video relative">
                      <div className="absolute inset-0 bg-linear-to-br from-primary/25 via-transparent to-accent/25 flex items-center justify-center">
                        {project.imageUrl && (
                          <div className="relative h-48 w-full max-w-[16rem]">
                            <Image
                              alt={`${t(project.imageAlt)}`}
                              className="object-contain"
                              fill
                              sizes="(min-width: 1024px) 320px, (min-width: 768px) 256px, 192px"
                              src={project.imageUrl}
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-xl mb-2">{t(project.title)}</h3>

                      <p className="text-muted-foreground mb-4">{t(project.description)}</p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.tags.map((tag) => (
                          <Badge
                            className="rounded-full border-border/70 bg-muted/50 font-normal text-foreground/80"
                            key={typeof tag === "string" ? tag : `${tag.en}-${tag.de}`}
                            variant="outline"
                          >
                            {t(tag)}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="flex" />
            <CarouselNext className="flex" />
          </Carousel>
        </div>

        {siteContent.projectsSectionMore && (
          <div className="text-center mt-12">
            <Button asChild className="text-primary hover:text-primary/80" variant="link">
              <a href="https://github.com/uwe-schwarz" rel="noreferrer" target="_blank">
                {t(siteContent.projectsSectionMore)}
                <ArrowRight className="ml-2" size={16} />
              </a>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
