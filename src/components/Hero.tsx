
import { ArrowDown } from 'lucide-react';
import { FloatingLogos } from './FloatingLogos';

export function Hero() {
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
      className="relative flex min-h-screen items-center justify-center overflow-hidden pattern-bg py-10 sm:py-20 text-white"
    >
      <div className="curved-pattern" aria-hidden="true"></div>
      
      {/* Add the FloatingLogos component */}
      <FloatingLogos />
      
      <div className="container relative z-10 mx-auto px-4 sm:px-6 py-16 sm:py-32 text-center">
        <div className="mx-auto max-w-4xl">
          <h1 className="animate-fade-in mb-4 text-3xl sm:text-4xl md:text-6xl font-extrabold">
            <span className="block">Buildathon</span>
            <span className="mt-2 block text-generator-gold">AI Tools Stack</span>
          </h1>
          
          <p className="animate-fade-in animate-delay-100 mb-6 sm:mb-8 text-base sm:text-lg md:text-xl opacity-90 px-2">
            Accelerate your innovation journey with our curated collection of AI tools.
            Build, create, and launch your ideas in record time.
          </p>
          
          <div className="animate-fade-in animate-delay-200 flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4 px-4">
            <a
              href="#tools"
              onClick={handleNavClick}
              className="inline-flex items-center justify-center rounded-lg bg-generator-gold px-5 py-2.5 sm:px-6 sm:py-3 text-sm sm:text-base font-medium text-generator-darkGreen transition-all hover:bg-white hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-generator-green"
            >
              Explore Tools
            </a>
            <a
              href="#about"
              onClick={handleNavClick}
              className="inline-flex items-center justify-center rounded-lg border border-generator-gold bg-transparent px-5 py-2.5 sm:px-6 sm:py-3 text-sm sm:text-base font-medium text-generator-gold transition-all hover:bg-generator-darkGreen hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-generator-green"
            >
              Learn More
            </a>
          </div>
        </div>
        
        <div className="absolute bottom-8 left-0 right-0 mx-auto flex justify-center animate-float">
          <a href="#about" onClick={handleNavClick} className="flex flex-col items-center text-generator-gold">
            <span className="mb-2 text-xs sm:text-sm">Scroll Down</span>
            <ArrowDown size={16} className="sm:w-5 sm:h-5" />
          </a>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
}
