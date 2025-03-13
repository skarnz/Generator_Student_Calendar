
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

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-6",
        scrolled ? "glass-effect shadow-sm" : "bg-transparent"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <div className="flex items-center space-x-2">
          <img 
            src="/lovable-uploads/0ae39654-597b-4a29-9627-34589cc78afe.png" 
            alt="The Generator Logo" 
            className="h-8 md:h-10 w-auto object-contain" 
          />
          <div className="hidden md:block">
            <h1 className="text-lg font-bold text-generator-green">The Generator</h1>
            <p className="text-xs text-generator-gold">Interdisciplinary AI Lab</p>
          </div>
        </div>
        
        <nav className="hidden md:flex items-center space-x-1">
          <a href="#hero" className="nav-link">Home</a>
          <a href="#about" className="nav-link">About</a>
          <a href="#tools" className="nav-link">AI Tools</a>
          <a href="#categories" className="nav-link">Categories</a>
        </nav>
        
        <div className="flex items-center">
          <a 
            href="#tools" 
            className="generator-button text-sm md:text-base animate-pulse-soft"
          >
            Explore AI Tools
          </a>
        </div>
      </div>
    </header>
  );
}
