
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute('href');
    if (href && href.startsWith('#')) {
      const targetId = href.substring(1);
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        if (mobileMenuOpen) {
          setMobileMenuOpen(false);
        }
      }
    }
  };

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-3 px-4 sm:py-4 sm:px-6 bg-white shadow-sm",
        scrolled ? "" : ""
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <div className="flex items-center">
          <img 
            src="/images/logos/generator-logo.png" 
            alt="The Generator Logo" 
            className="h-8 sm:h-10 md:h-12 w-auto object-contain" 
          />
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-2">
          <a 
            href="#hero" 
            onClick={handleNavClick} 
            className="relative px-4 py-2 text-generator-darkGreen font-medium transition-all duration-300 hover:text-generator-gold group"
          >
            Home
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-generator-gold scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
          </a>
          <a 
            href="#about" 
            onClick={handleNavClick} 
            className="relative px-4 py-2 text-generator-darkGreen font-medium transition-all duration-300 hover:text-generator-gold group"
          >
            About
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-generator-gold scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
          </a>
          <a 
            href="#events" 
            onClick={handleNavClick} 
            className="relative px-4 py-2 text-generator-darkGreen font-medium transition-all duration-300 hover:text-generator-gold group"
          >
            Events
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-generator-gold scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
          </a>
          <a 
            href="https://g1000-portal.vercel.app/" 
            target="_blank"
            rel="noopener noreferrer"
            className="relative px-4 py-2 text-generator-darkGreen font-medium transition-all duration-300 hover:text-generator-gold group"
          >
            G1000 Portal
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-generator-gold scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
          </a>
        </nav>
        
        {/* Desktop CTA */}
        <div className="hidden md:flex items-center">
          <a 
            href="#events" 
            onClick={handleNavClick}
            className="generator-button text-sm md:text-base animate-pulse-soft"
          >
            View All Events
          </a>
        </div>

        {/* Mobile Navigation Toggle */}
        <div className="flex md:hidden items-center space-x-2 sm:space-x-4">
          <a 
            href="#events" 
            onClick={handleNavClick}
            className="generator-button text-xs px-2 sm:px-3 py-2 sm:py-1.5 animate-pulse-soft min-h-[44px] sm:min-h-0 flex items-center"
          >
            Events
          </a>
          <button 
            className="text-generator-darkGreen p-2 focus:outline-none min-h-[44px] min-w-[44px] flex items-center justify-center"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="mobile-nav-menu md:hidden absolute top-full left-0 right-0 bg-white shadow-lg py-4 px-6 transition-all transform z-50 border-t border-gray-100">
          <nav className="flex flex-col space-y-1">
            <a 
              href="#hero" 
              onClick={handleNavClick} 
              className="text-center py-3 min-h-[44px] flex items-center justify-center text-generator-darkGreen font-medium rounded-lg hover:bg-generator-gold hover:text-generator-darkGreen transition-all duration-200"
            >
              Home
            </a>
            <a 
              href="#about" 
              onClick={handleNavClick} 
              className="text-center py-3 min-h-[44px] flex items-center justify-center text-generator-darkGreen font-medium rounded-lg hover:bg-generator-gold hover:text-generator-darkGreen transition-all duration-200"
            >
              About
            </a>
            <a 
              href="#events" 
              onClick={handleNavClick} 
              className="text-center py-3 min-h-[44px] flex items-center justify-center text-generator-darkGreen font-medium rounded-lg hover:bg-generator-gold hover:text-generator-darkGreen transition-all duration-200"
            >
              Events
            </a>
            <a 
              href="https://g1000-portal.vercel.app/" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-center py-3 min-h-[44px] flex items-center justify-center text-generator-darkGreen font-medium rounded-lg hover:bg-generator-gold hover:text-generator-darkGreen transition-all duration-200"
            >
              G1000 Portal
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
