
import React from 'react';
import { siteContent } from '@/content/content';
import { useSettings } from '@/contexts/SettingsContext';
import { Briefcase, MapPin, Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const ExperienceSection = () => {
  const { t } = useSettings();
  const { experiences } = siteContent;

  return (
    <section id="experience" className="section-padding">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          <span className="text-gradient">
            {t({ en: "Experience", de: "Berufserfahrung" })}
          </span>
        </h2>

        <div className="max-w-3xl mx-auto">
          {/* Timeline */}
          <div className="relative">
            {/* Vertical timeline line */}
            <div className="absolute left-0 sm:left-1/2 transform sm:-translate-x-1/2 h-full w-0.5 bg-muted"></div>

            {/* Experience Items */}
            {experiences.map((experience, index) => (
              <div 
                key={index}
                className={`relative mb-16 last:mb-0 ${
                  index % 2 === 0 
                    ? 'sm:pr-8 sm:ml-auto sm:mr-auto sm:w-1/2 sm:pl-12' 
                    : 'sm:pl-8 sm:mr-auto sm:ml-auto sm:w-1/2 sm:pr-12'
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute top-6 left-0 sm:left-0 sm:-left-3 w-6 h-6 rounded-full bg-primary shadow-md transform sm:-translate-x-1/2 flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-white dark:bg-background"></div>
                </div>
                
                {/* Card */}
                <div className="p-6 bg-card rounded-lg shadow-sm border border-border hover:shadow-md hover-scale transition-all">
                  {/* Title and company */}
                  <div className="flex flex-col mb-4">
                    <h3 className="text-xl font-bold">{t(experience.title)}</h3>
                    <div className="text-lg font-medium text-primary">{experience.company}</div>
                  </div>
                  
                  {/* Period and location */}
                  <div className="flex flex-wrap gap-4 mb-4 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Calendar size={14} className="mr-1" />
                      <span>{t(experience.period)}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin size={14} className="mr-1" />
                      <span>{experience.location}</span>
                    </div>
                  </div>
                  
                  {/* Description */}
                  <p className="mb-4 text-foreground">{t(experience.description)}</p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {experience.tags.map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="secondary" className="font-normal">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <a 
              href="#" 
              className="inline-flex items-center text-primary hover:text-primary/80 transition-colors link-underline"
            >
              <Briefcase size={16} className="mr-2" />
              <span>{t({ en: "Download Full Resume", de: "Vollständigen Lebenslauf herunterladen" })}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
