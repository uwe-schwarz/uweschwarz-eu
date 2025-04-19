import React from 'react';
import { siteContent } from '@/content/content';
import { useSettings } from '@/contexts/SettingsContext';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const ProjectsSection = () => {
  const { t } = useSettings();
  const { projects } = siteContent;

  return (
    <section id="projects" className="section-padding bg-muted/30">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          <span className="text-gradient">
            {t(siteContent.projectsSectionTitle)}
          </span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div 
              key={index}
              className="bg-card rounded-xl overflow-hidden shadow-md border border-border hover-scale transition-all"
            >
              {/* Project Image */}
              <div className="aspect-video relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-accent/40 flex items-center justify-center">
                  <p className="text-center px-4 text-white">
                    [Project image placeholder]<br/>
                    <span className="text-xs block mt-1">
                      Image prompt for project: "{t(project.imageAlt)}, minimalist illustration style with tech theme"
                    </span>
                  </p>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{t(project.title)}</h3>
                
                <p className="text-muted-foreground mb-4">
                  {t(project.description)}
                </p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, tagIndex) => (
                    <Badge key={tagIndex} variant="outline" className="font-normal">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                {/* Links */}
                <div className="flex gap-4">
                  {project.demoUrl && (
                    <Button asChild variant="default" size="sm" className="gap-2">
                      <a href={project.demoUrl} target="_blank" rel="noreferrer">
                        <ExternalLink size={14} />
                        <span>{t(siteContent.projectsLabels.demo)}</span>
                      </a>
                    </Button>
                  )}
                  
                  {project.repoUrl && (
                    <Button asChild variant="outline" size="sm" className="gap-2">
                      <a href={project.repoUrl} target="_blank" rel="noreferrer">
                        <Github size={14} />
                        <span>{t(siteContent.projectsLabels.code)}</span>
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button asChild variant="link" className="text-primary hover:text-primary/80">
            <a href="https://github.com" target="_blank" rel="noreferrer">
              {t(siteContent.projectsSectionMore)}
              <ArrowRight size={16} className="ml-2" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
