
import React from 'react';
import { siteContent } from '@/content/content';
import { useSettings } from '@/contexts/SettingsContext';
import { Briefcase, MapPin, Calendar, FileText, Download } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  VerticalTimeline, 
  VerticalTimelineElement 
} from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const ExperienceSection = () => {
  const { t, language } = useSettings();
  const { experiences, resumeDownloads } = siteContent;

  // Reverse the experiences array to show newest at top (Present first)
  const reversedExperiences = [...experiences].reverse();
  
  return (
    <section id="experience" className="section-padding py-20 relative bg-background">
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
        <div className="relative max-w-7xl mx-auto pb-12">
          <VerticalTimeline lineColor="var(--primary)" animate={false}>
            {/* Present indicator at the top */}
            <VerticalTimelineElement
              className="vertical-timeline-element--present"
              iconStyle={{ background: 'var(--primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              icon={<div className="w-3 h-3 bg-background rounded-full animate-pulse"></div>}
              contentStyle={{ background: 'transparent', boxShadow: 'none', padding: 0, marginBottom: '-20px' }}
              contentArrowStyle={{ display: 'none' }}
            >
              <div className="text-center text-gray-400 text-sm font-medium">
                {t({
                  en: "Present",
                  de: "Jetzt"
                })}
              </div>
            </VerticalTimelineElement>
            
            {/* Experience items */}
            {reversedExperiences.map((exp, index) => (
              <VerticalTimelineElement
                key={index}
                className="vertical-timeline-element--work"
                date={t(exp.period)}
                iconStyle={{ background: 'var(--primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                icon={<Briefcase size={20} />}
                contentStyle={{ 
                  background: 'linear-gradient(to bottom right, var(--primary-40), var(--accent-40))',
                  backdropFilter: 'blur(8px)',
                  borderRadius: 'var(--radius)',
                  border: '1px solid var(--border)'
                }}
                contentArrowStyle={{ borderRight: '7px solid var(--primary-40)' }}
              >
                <Card className="bg-transparent border-none shadow-none">
                  <CardContent className="p-6">
                    {/* Logo (if exists) */}
                    {exp.logoUrl && (
                      <div className="mb-4 flex justify-center">
                        <img src={exp.logoUrl} alt={`${exp.company} logo`} className="h-12 object-contain" />
                      </div>
                    )}
                    
                    {/* Title & Company */}
                    <div className="mb-4">
                      <h3 className="text-2xl font-bold text-foreground">
                        {t(exp.title)}
                      </h3>
                      <p className="text-lg font-medium text-gray-300">{exp.company}</p>
                    </div>
                    
                    {/* Location */}
                    <div className="flex items-center mb-4 text-sm text-gray-400">
                      <MapPin size={14} className="mr-1" />
                      <span>{exp.location}</span>
                    </div>
                    
                    {/* Description */}
                    <p className="mb-5 text-gray-300">{t(exp.description)}</p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {exp.tags.map((tag, tagIndex) => (
                        <Badge 
                          key={tagIndex} 
                          variant="secondary" 
                          className="font-normal bg-primary/60 hover:bg-primary/80 text-white"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </VerticalTimelineElement>
            ))}
          </VerticalTimeline>
        </div>

        {/* CV Download Links */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-12">
          {resumeDownloads && resumeDownloads[language] && (
            <>
              {resumeDownloads[language].pdf && (
                <Button variant="outline" asChild>
                  <a 
                    href={resumeDownloads[language].pdf} 
                    className="inline-flex items-center" 
                    download
                  >
                    <FileText size={16} className="mr-2" />
                    <span>{t({
                      en: "Download PDF Resume",
                      de: "Lebenslauf als PDF herunterladen"
                    })}</span>
                  </a>
                </Button>
              )}
              
              {resumeDownloads[language].docx && (
                <Button variant="outline" asChild>
                  <a 
                    href={resumeDownloads[language].docx} 
                    className="inline-flex items-center" 
                    download
                  >
                    <Download size={16} className="mr-2" />
                    <span>{t({
                      en: "Download DOCX Resume",
                      de: "Lebenslauf als DOCX herunterladen"
                    })}</span>
                  </a>
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
