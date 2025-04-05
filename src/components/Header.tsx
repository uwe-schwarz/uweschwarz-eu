
import React, { useState, useEffect } from 'react';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { useSettings } from '@/contexts/SettingsContext';
import { siteContent } from '@/content/content';
import { Button } from '@/components/ui/button';

const Header = () => {
  const { language, setLanguage, theme, setTheme, t } = useSettings();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Toggle for handling theme changes
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };
  
  // Toggle for handling language changes
  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'de' : 'en');
  };

  // Detect scroll for header styling
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle mobile menu toggling
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    
    // Prevent scrolling when menu is open
    if (!isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = 'unset';
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="text-2xl font-display font-bold text-foreground">
          <span className="text-gradient">Oldman</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {siteContent.navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-foreground hover:text-primary transition-colors link-underline"
            >
              {t(item.label)}
            </a>
          ))}
        </nav>

        {/* Control Buttons */}
        <div className="hidden md:flex items-center space-x-2">
          {/* Language Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleLanguage}
            className="text-foreground hover:text-primary"
          >
            {language === 'en' ? 'DE' : 'EN'}
          </Button>
          
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="text-foreground hover:text-primary"
            aria-label={t(theme === 'light' 
              ? siteContent.translations.themeSwitch.light 
              : siteContent.translations.themeSwitch.dark
            )}
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex items-center"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <Menu size={24} className="text-foreground" />
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-background z-40 flex flex-col">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-800">
            <a href="#hero" className="text-2xl font-display font-bold text-foreground" onClick={closeMobileMenu}>
              <span className="text-gradient">Oldman</span>
            </a>
            <button onClick={toggleMobileMenu} aria-label="Close menu">
              <X size={24} className="text-foreground" />
            </button>
          </div>
          <div className="flex-1 flex flex-col justify-center items-center space-y-6 py-8">
            {siteContent.navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-xl font-medium text-foreground hover:text-primary transition-colors"
                onClick={closeMobileMenu}
              >
                {t(item.label)}
              </a>
            ))}
          </div>
          <div className="container mx-auto px-4 py-6 flex justify-center space-x-4 border-t border-gray-200 dark:border-gray-800">
            <Button
              variant="outline"
              size="default"
              onClick={() => { toggleLanguage(); closeMobileMenu(); }}
              className="w-full sm:w-auto"
            >
              {language === 'en' ? 'Deutsch' : 'English'}
            </Button>
            <Button
              variant="outline"
              size="default"
              onClick={() => { toggleTheme(); closeMobileMenu(); }}
              className="w-full sm:w-auto"
            >
              {theme === 'light' ? (
                <><Moon size={16} className="mr-2" /> Dark Mode</>
              ) : (
                <><Sun size={16} className="mr-2" /> Light Mode</>
              )}
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
