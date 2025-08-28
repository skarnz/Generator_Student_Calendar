
import { useState, useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { Hero } from '@/components/layout/Hero';
import { About } from '@/components/About';
import { EventsSection } from '@/components/events/EventsSection';
import { FilterSection } from '@/components/FilterSection';
import { Footer } from '@/components/layout/Footer';
import { events, eventTypes, audiences } from '@/data/events';

const Index = () => {
  const [selectedEventType, setSelectedEventType] = useState('All');
  const [selectedAudience, setSelectedAudience] = useState('All');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate content loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
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

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-white">
        <div className="text-center">
          <div className="mb-4 h-12 w-12 sm:h-16 sm:w-16 animate-pulse rounded-full bg-generator-green mx-auto"></div>
          <h2 className="text-lg sm:text-xl font-medium text-generator-darkGreen">Loading Generator Events...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="pt-16 sm:pt-0">
        <Hero onDateSelect={setSelectedDate} />
        <About />
        <FilterSection 
          eventTypes={eventTypes}
          audiences={audiences}
          selectedEventType={selectedEventType}
          selectedAudience={selectedAudience}
          onSelectEventType={setSelectedEventType}
          onSelectAudience={setSelectedAudience}
        />
        <EventsSection 
          events={events} 
          selectedEventType={selectedEventType}
          selectedAudience={selectedAudience}
          selectedDate={selectedDate}
        />
      </main>
      <Footer />
      
      {/* Back to top button */}
      <a
        href="#hero"
        onClick={handleNavClick}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-generator-green text-white shadow-lg transition-all hover:bg-generator-darkGreen"
        aria-label="Back to top"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 sm:h-6 sm:w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 15l7-7 7 7"
          />
        </svg>
      </a>
    </div>
  );
}

export default Index;
