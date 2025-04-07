
import React, { useEffect, useRef } from 'react';
import { siteContent } from '@/content/content';
import { useSettings } from '@/contexts/SettingsContext';
import { Briefcase, MapPin, Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

const ExperienceSection = () => {
  const {
    t
  } = useSettings();
  const {
    experiences
  } = siteContent;
  const timelineRef = useRef<HTMLDivElement>(null);

  // Animation beim Scrollen
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          entry.target.classList.remove('opacity-0');
        }
      });
    }, {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    });
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
      item.classList.add('opacity-0');
      observer.observe(item);
    });
    return () => {
      timelineItems.forEach(item => {
        observer.unobserve(item);
      });
    };
  }, []);

  // Reverse the experiences array to show newest at top (Present first)
  const reversedExperiences = [...experiences].reverse();
  return <section id="experience" className="section-padding py-20 relative bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
          <span className="text-gradient">
            {t({
            en: "Experience",
            de: "Berufserfahrung"
          })}
          </span>
        </h2>

        {/* Timeline container */}
        <div ref={timelineRef} className="relative max-w-7xl mx-auto pb-12">
          {/* Vertical timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary/30 via-primary to-primary/30 rounded"></div>
          
          {/* Current time indicator at the top */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 flex flex-col items-center mb-8">
            <div className="w-4 h-4 rounded-full bg-primary animate-pulse"></div>
            <div className="mt-2 text-gray-400 text-sm font-medium">
              {t({
              en: "Present",
              de: "Jetzt"
            })}
            </div>
          </div>
          
          {/* Space to accommodate the "Present" indicator */}
          <div className="h-12"></div>
          
          {/* Timeline Items */}
          <div className="mt-16">
            {reversedExperiences.map((exp, index) => {
            const isEven = index % 2 === 0;
            return <div key={index} className={cn("timeline-item grid grid-cols-1 md:grid-cols-12 gap-4 relative", index !== 0 ? "-mt-20 md:-mt-16" : "",
            // Overlap cards except the first one
            "transition-all duration-500 ease-out")}>
                  {/* Timeline dot */}
                  <div className="hidden md:flex absolute left-1/2 top-8 transform -translate-x-1/2 z-10">
                    <div className="w-6 h-6 rounded-full bg-primary border-4 border-background shadow-lg"></div>
                  </div>
                  
                  {/* Add dashed connector line from timeline to card (for left side) */}
                  {isEven && (
                    <div className="hidden md:block absolute left-[calc(50%-0.5px)] top-8 w-[calc(16.667%-1rem)] h-px border-t-2 border-dashed border-primary/60 z-[5]" style={{ transform: 'translateX(-100%)' }}></div>
                  )}
                  
                  {/* Add dashed connector line from timeline to card (for right side) */}
                  {!isEven && (
                    <div className="hidden md:block absolute left-[calc(50%+0.5px)] top-8 w-[calc(16.667%-1rem)] h-px border-t-2 border-dashed border-primary/60 z-[5]"></div>
                  )}
                  
                  {/* Card container positioned with more space on both sides */}
                  <div className={cn(
                    "md:col-span-5", 
                    isEven ? "md:col-start-1" : "md:col-start-7",
                  )}>
                    <Card className={cn("timeline-card overflow-hidden border border-border hover:shadow-lg transition-all duration-300", "bg-gradient-to-br from-primary/40 to-accent/40",
                // Same gradient for all cards
                "backdrop-blur-sm")}>
                      {/* Logo (if exists) */}
                      {exp.logoUrl && <div className="p-4 flex justify-center">
                          <img src={exp.logoUrl} alt={`${exp.company} logo`} className="h-12 object-contain" />
                        </div>}
                      
                      <CardContent className="p-6">
                        {/* Title & Company */}
                        <div className="mb-4">
                          <h3 className="text-2xl font-bold text-foreground">
                            {t(exp.title)}
                          </h3>
                          <p className="text-lg font-medium text-gray-300">{exp.company}</p>
                        </div>
                        
                        {/* Period & Location */}
                        <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-400">
                          <div className="flex items-center">
                            <Calendar size={14} className="mr-1" />
                            <span>{t(exp.period)}</span>
                          </div>
                          <div className="flex items-center">
                            <MapPin size={14} className="mr-1" />
                            <span>{exp.location}</span>
                          </div>
                        </div>
                        
                        {/* Description */}
                        <p className="mb-5 text-gray-300">{t(exp.description)}</p>
                        
                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                          {exp.tags.map((tag, tagIndex) => <Badge key={tagIndex} variant="secondary" className="font-normal bg-primary/60 hover:bg-primary/80 text-white">
                              {tag}
                            </Badge>)}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  {/* Connector line on small screens */}
                  <div className="md:hidden w-0.5 h-8 bg-primary absolute left-1/2 -bottom-8 transform -translate-x-1/2"></div>
                </div>;
          })}
          </div>
        </div>

        <div className="text-center mt-16">
          <a href="#" className="inline-flex items-center text-primary hover:text-primary/80 transition-colors link-underline">
            <Briefcase size={16} className="mr-2" />
            <span>{t({
              en: "Download Full Resume",
              de: "Vollständigen Lebenslauf herunterladen"
            })}</span>
          </a>
        </div>
      </div>
    </section>;
};

export default ExperienceSection;
