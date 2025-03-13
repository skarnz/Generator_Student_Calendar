
import { ArrowDown } from 'lucide-react';

export function Hero() {
  return (
    <section 
      id="hero" 
      className="relative flex min-h-screen items-center justify-center overflow-hidden pattern-bg py-20 text-white"
    >
      <div className="curved-pattern" aria-hidden="true"></div>
      <div className="container relative z-10 mx-auto px-6 py-32 text-center">
        <div className="mx-auto max-w-4xl">
          <h1 className="animate-fade-in mb-4 text-4xl font-extrabold md:text-6xl">
            <span className="block">Buildathon</span>
            <span className="mt-2 block text-generator-gold">AI Tools Stack</span>
          </h1>
          
          <p className="animate-fade-in animate-delay-100 mb-8 text-lg md:text-xl opacity-90">
            Accelerate your innovation journey with our curated collection of AI tools.
            Build, create, and launch your ideas in record time.
          </p>
          
          <div className="animate-fade-in animate-delay-200 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <a
              href="#tools"
              className="inline-flex items-center justify-center rounded-lg bg-generator-gold px-6 py-3 text-base font-medium text-generator-darkGreen transition-all hover:bg-white hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-generator-green"
            >
              Explore Tools
            </a>
            <a
              href="#about"
              className="inline-flex items-center justify-center rounded-lg border border-generator-gold bg-transparent px-6 py-3 text-base font-medium text-generator-gold transition-all hover:bg-generator-darkGreen hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-generator-green"
            >
              Learn More
            </a>
          </div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 transform animate-float">
          <a href="#about" className="flex flex-col items-center text-generator-gold">
            <span className="mb-2 text-sm">Scroll Down</span>
            <ArrowDown size={20} />
          </a>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
}
