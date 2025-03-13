
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
            src="/lovable-uploads/0ae39654-597b-4a29-9627-34589cc78afe.png" 
            alt="The Generator Logo" 
            className="h-8 sm:h-10 md:h-12 w-auto object-contain" 
          />
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          <a href="#hero" onClick={handleNavClick} className="nav-link">Home</a>
          <a href="#about" onClick={handleNavClick} className="nav-link">About</a>
          <a href="#tools" onClick={handleNavClick} className="nav-link">AI Tools</a>
          <a href="#categories" onClick={handleNavClick} className="nav-link">Categories</a>
        </nav>
        
        {/* Desktop CTA */}
        <div className="hidden md:flex items-center">
          <a 
            href="#tools" 
            onClick={handleNavClick}
            className="generator-button text-sm md:text-base animate-pulse-soft"
          >
            Explore AI Tools
          </a>
        </div>

        {/* Mobile Navigation Toggle */}
        <div className="flex md:hidden items-center space-x-4">
          <a 
            href="#tools" 
            onClick={handleNavClick}
            className="generator-button text-xs px-3 py-1.5 animate-pulse-soft"
          >
            Explore
          </a>
          <button 
            className="text-generator-darkGreen p-1 focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-md py-4 px-6 transition-all transform">
          <nav className="flex flex-col space-y-4">
            <a href="#hero" onClick={handleNavClick} className="nav-link text-center py-2">Home</a>
            <a href="#about" onClick={handleNavClick} className="nav-link text-center py-2">About</a>
            <a href="#tools" onClick={handleNavClick} className="nav-link text-center py-2">AI Tools</a>
            <a href="#categories" onClick={handleNavClick} className="nav-link text-center py-2">Categories</a>
          </nav>
        </div>
      )}
    </header>
  );
}
