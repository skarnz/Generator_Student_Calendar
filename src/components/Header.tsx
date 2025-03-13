
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

export function Header() {
  const [scrolled, setScrolled] = useState(false);

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
      }
    }
  };

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-6 bg-white shadow-sm",
        scrolled ? "" : ""
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <div className="flex items-center">
          <img 
            src="/lovable-uploads/0ae39654-597b-4a29-9627-34589cc78afe.png" 
            alt="The Generator Logo" 
            className="h-10 md:h-12 w-auto object-contain" 
          />
        </div>
        
        <nav className="hidden md:flex items-center space-x-1">
          <a href="#hero" onClick={handleNavClick} className="nav-link">Home</a>
          <a href="#about" onClick={handleNavClick} className="nav-link">About</a>
          <a href="#tools" onClick={handleNavClick} className="nav-link">AI Tools</a>
          <a href="#categories" onClick={handleNavClick} className="nav-link">Categories</a>
        </nav>
        
        <div className="flex items-center">
          <a 
            href="#tools" 
            onClick={handleNavClick}
            className="generator-button text-sm md:text-base animate-pulse-soft"
          >
            Explore AI Tools
          </a>
        </div>
      </div>
    </header>
  );
}
