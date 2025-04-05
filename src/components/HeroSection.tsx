import React from 'react';
import { ArrowDown, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSettings } from '@/contexts/SettingsContext';
import { siteContent } from '@/content/content';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
const HeroSection = () => {
  const {
    t
  } = useSettings();
  const {
    hero
  } = siteContent;
  return <section id="hero" className="min-h-screen flex items-center pt-20 bg-grid relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full filter blur-3xl animate-float"></div>
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-accent/20 rounded-full filter blur-3xl animate-float animation-delay-1000"></div>
      
      {/* Content Container */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center">
          {/* Text Content */}
          <div className="lg:w-1/2 animate-fade-in">
            <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary dark:bg-primary/20 text-sm font-medium mb-4">
              {t(hero.greeting)}
            </span>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4">
              {hero.name} 
              <span className="block text-gradient mt-2">
                {t(hero.title)}
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-lg mb-8">
              {t(hero.description)}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="rounded-full shadow-lg hover-scale">
                <a href="#projects">
                  {t(hero.ctaPrimary)}
                </a>
              </Button>
              
              <Button asChild variant="outline" size="lg" className="rounded-full shadow-sm hover-scale">
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <FileText className="w-4 h-4 mr-2" />
                  {t(hero.ctaSecondary)}
                </a>
              </Button>
            </div>
          </div>
          
          {/* Hero Image/Profile Picture */}
          <div className="lg:w-1/2 mt-10 lg:mt-0 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-lg aspect-square">
              {/* Background glow effect */}
              <div className="w-full h-full rounded-full bg-gradient-to-br from-primary to-accent/70 shadow-xl filter blur-sm absolute"></div>
              
              {/* Profile picture container */}
              <div className="w-[95%] h-[95%] rounded-full bg-background absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center overflow-hidden">
                <div className="w-[75%] h-[75%] rounded-full bg-gradient-to-br from-primary/20 to-accent/20 p-1">
                  <div className="w-full h-full rounded-full bg-background flex items-center justify-center overflow-hidden">
                    {/* Profile image */}
                    <Avatar className="w-full h-full">
                      <AvatarImage src="/lovable-uploads/1e329b14-e37b-47f0-b130-26f5547b63a5.png" alt="Profile picture" className="object-cover w-full h-full" />
                      <AvatarFallback className="text-4xl md:text-5xl font-bold">OM</AvatarFallback>
                    </Avatar>
                  </div>
                </div>
              </div>
              
              {/* Decorative coding elements */}
              <div className="absolute -bottom-4 -right-4 p-4 bg-card rounded-lg shadow-lg transform rotate-3 animate-float">
                <code className="text-xs sm:text-sm text-primary/80">&lt;<span className="text-accent">code</span>/&gt;</code>
              </div>
              
              <div className="absolute -top-4 -left-4 p-4 bg-card rounded-lg shadow-lg transform -rotate-6 animate-float animation-delay-500">
                <code className="text-xs sm:text-sm text-primary/80">{"const dev = 💻"}</code>
              </div>
              
              <div className="absolute top-1/2 right-0 p-3 bg-card rounded-lg shadow-lg transform rotate-12 animate-float animation-delay-1000">
                <code className="text-xs sm:text-sm text-primary/80">{"🤖 AI"}</code>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
          <span className="text-sm text-muted-foreground mb-2">Scroll</span>
          <ArrowDown className="w-5 h-5 text-primary animate-bounce" />
        </div>
      </div>
    </section>;
};
export default HeroSection;