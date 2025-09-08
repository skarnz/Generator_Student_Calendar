
import { ArrowDown } from 'lucide-react';
import { FloatingImages } from './FloatingImages';
import { CalendarMiniView } from '../calendar/CalendarMiniView';

interface HeroProps {
  onDateSelect?: (date: Date) => void;
}

export function Hero({ onDateSelect }: HeroProps) {
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
    <section 
      id="hero" 
      className="relative flex min-h-screen items-center justify-center overflow-x-hidden pattern-bg py-8 sm:py-10 lg:py-20 text-white"
    >
      <div className="curved-pattern" aria-hidden="true"></div>
      
      {/* Floating community images */}
      <FloatingImages />
      
      <div className="container relative z-10 mx-auto px-4 sm:px-6 py-8 sm:py-16 lg:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <div className="relative">
            <div className="p-4 sm:p-6 lg:p-8">
              <h1 
                className="animate-fade-in mb-3 sm:mb-4 text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-extrabold leading-tight"
                style={{
                  textShadow: '2px 2px 8px rgba(0, 0, 0, 0.8), 0 0 20px rgba(0, 0, 0, 0.6)'
                }}
              >
                <span className="block">The Generator</span>
                <span className="mt-1 sm:mt-2 block text-generator-gold">Events Calendar 2025-26</span>
              </h1>
              
              <p 
                className="animate-fade-in animate-delay-100 mb-0 text-sm sm:text-base md:text-lg lg:text-xl opacity-90 px-1 sm:px-2 leading-relaxed"
                style={{
                  textShadow: '1px 1px 4px rgba(0, 0, 0, 0.7), 0 0 12px rgba(0, 0, 0, 0.5)'
                }}
              >
                Join us for workshops, talks, buildathons, and networking events.
                Build your entrepreneurial journey with our vibrant community.
              </p>
            </div>
          </div>
          
          <div className="animate-fade-in animate-delay-200 flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4 px-4 mt-6 sm:mt-8 mb-8 sm:mb-12 flex-wrap">
            <a
              href="#events"
              onClick={handleNavClick}
              className="inline-flex items-center justify-center rounded-lg bg-generator-gold px-5 py-3 sm:px-6 sm:py-3 text-sm sm:text-base font-medium text-generator-darkGreen transition-all hover:bg-white hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-generator-green min-h-[44px] sm:min-h-0"
            >
              View Events
            </a>
            <a
              href="https://forms.gle/D5mFsPjBNXrhzKqu9"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg border border-generator-gold bg-transparent px-5 py-3 sm:px-6 sm:py-3 text-sm sm:text-base font-medium text-generator-gold transition-all hover:bg-generator-darkGreen hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-generator-green min-h-[44px] sm:min-h-0"
            >
              Join Associates
            </a>
            <a
              href="https://chat.whatsapp.com/GdnB3cExacMA5XfqsXh4pO?mode=ems_copy_c"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg border border-generator-gold bg-transparent px-5 py-3 sm:px-6 sm:py-3 text-sm sm:text-base font-medium text-generator-gold transition-all hover:bg-generator-darkGreen hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-generator-green min-h-[44px] sm:min-h-0 mt-3 sm:mt-0"
            >
              Join Our WhatsApp for Updates and Opportunities!
            </a>
          </div>
        </div>
        
        {/* Calendar Mini View - positioned above gradient */}
        <div className="animate-fade-in animate-delay-300 mx-auto max-w-2xl mb-8 sm:mb-12 lg:mb-16">
          <CalendarMiniView onDateSelect={onDateSelect} />
        </div>
        
        <div className="absolute bottom-4 sm:bottom-8 left-0 right-0 mx-auto flex justify-center animate-float">
          <a href="#about" onClick={handleNavClick} className="flex flex-col items-center text-generator-gold touch-manipulation">
            <span className="mb-2 text-xs sm:text-sm">List View & Learn More</span>
            <ArrowDown size={16} className="sm:w-5 sm:h-5" />
          </a>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full h-16 sm:h-20 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
}
