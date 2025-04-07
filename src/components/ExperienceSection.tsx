
import React from 'react';
import { siteContent } from '@/content/content';
import { useSettings } from '@/contexts/SettingsContext';
import { Briefcase, FileText, Download } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  VerticalTimeline, 
  VerticalTimelineElement 
} from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { Button } from '@/components/ui/button';

const ExperienceSection = () => {
  const { t, language } = useSettings();
  const { experiences, resumeDownloads } = siteContent;
  
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
        <div className="relative max-w-6xl mx-auto pb-12">
          <VerticalTimeline 
            lineColor="var(--primary)" 
            animate={false} 
            className="custom-timeline"
          >
            {experiences.map((exp, index) => (
              <VerticalTimelineElement
                key={index}
                className={`vertical-timeline-element--work ${index % 2 === 0 ? 'left-card' : 'right-card'}`}
                contentStyle={{ 
                  background: 'linear-gradient(to bottom right, var(--primary-40), var(--accent-40))',
                  backdropFilter: 'blur(8px)',
                  borderRadius: 'var(--radius)',
                  border: '1px solid var(--border)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  padding: 0,
                  marginTop: index > 0 ? '-30px' : '0',
                }}
                contentArrowStyle={{ 
                  borderRight: index % 2 === 0 ? '7px solid var(--primary-40)' : 'none',
                  borderLeft: index % 2 === 1 ? '7px solid var(--primary-40)' : 'none',
                }}
                date={t(exp.period)}
                dateClassName="experience-date"
                iconStyle={{ 
                  background: 'var(--primary)', 
                  color: '#fff', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  boxShadow: '0 0 0 4px var(--background), 0 0 0 5px var(--primary-40)'
                }}
                icon={<Briefcase size={20} />}
                iconClassName="experience-icon"
                position={index % 2 === 0 ? 'left' : 'right'}
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

      {/* Add CSS to customize the timeline appearance */}
      <style jsx global>{`
        /* Custom timeline styling */
        .custom-timeline::before {
          background: linear-gradient(to bottom, transparent, var(--primary), transparent) !important;
          width: 3px !important;
        }
        
        /* Adjust spacing between timeline elements */
        .vertical-timeline-element {
          margin: 0 !important;
        }
        
        /* Ensure date is visible with appropriate styling */
        .experience-date {
          color: var(--foreground);
          opacity: 0.8;
          font-weight: 500;
          margin-top: 4px;
        }
        
        /* Custom styling for left cards */
        .left-card {
          margin-right: 2rem !important;
        }
        
        /* Custom styling for right cards */
        .right-card {
          margin-left: 2rem !important;
        }
        
        /* Responsive adjustments */
        @media only screen and (max-width: 1169px) {
          .vertical-timeline-element-content {
            margin-top: 0 !important;
          }
          
          .left-card, .right-card {
            margin-left: 0 !important;
            margin-right: 0 !important;
          }
          
          .vertical-timeline-element-content-arrow {
            border-right: 7px solid var(--primary-40) !important;
            border-left: none !important;
          }
          
          .vertical-timeline--two-columns .vertical-timeline-element-content {
            margin-left: 40px !important;
          }
        }
      `}</style>
    </section>
  );
};

export default ExperienceSection;
