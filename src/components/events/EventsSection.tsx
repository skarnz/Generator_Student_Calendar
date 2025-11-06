import { useState, useEffect, useMemo } from 'react';
import { EventCard } from './EventCard';
import { Search, Filter, Calendar, Users, Clock } from 'lucide-react';
import { Event } from '@/data/events';
import { isSameDay, format } from 'date-fns';

interface EventsSectionProps {
  events: Event[];
  selectedEventType: string;
  selectedAudience: string;
  selectedDate?: Date | null;
}

export function EventsSection({ events, selectedEventType, selectedAudience, selectedDate }: EventsSectionProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showPastEvents, setShowPastEvents] = useState(false);
  const [sortBy, setSortBy] = useState<'date' | 'type'>('date');
  
  const currentDate = useMemo(() => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    return date;
  }, []);
  
  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      // Parse date as local to avoid timezone issues
      const [year, month, day] = event.date.split('-').map(Number);
      const eventDate = new Date(year, month - 1, day);
      eventDate.setHours(0, 0, 0, 0);
      
      // Check if event is past either by date comparison or explicit isPastEvent flag
      const isPastByDate = eventDate < currentDate;
      const isPastExplicit = event.isPastEvent === true;
      const isPastEvent = isPastByDate || isPastExplicit;
      const matchesTimeFilter = showPastEvents ? isPastEvent : !isPastEvent;
      
      const matchesEventType = selectedEventType === 'All' || event.eventType === selectedEventType;
      const matchesAudience = selectedAudience === 'All' || event.audience.includes(selectedAudience);
      const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (event.speakerName && event.speakerName.toLowerCase().includes(searchTerm.toLowerCase()));
      
      return matchesTimeFilter && matchesEventType && matchesAudience && matchesSearch;
    });
  }, [events, selectedEventType, selectedAudience, searchTerm, showPastEvents, currentDate]);

  const sortedEvents = useMemo(() => {
    const sorted = [...filteredEvents].sort((a, b) => {
      if (sortBy === 'date') {
        const [aYear, aMonth, aDay] = a.date.split('-').map(Number);
        const [bYear, bMonth, bDay] = b.date.split('-').map(Number);
        const aDate = new Date(aYear, aMonth - 1, aDay).getTime();
        const bDate = new Date(bYear, bMonth - 1, bDay).getTime();

        // If showing past events, sort descending (most recent first)
        // If showing upcoming events, sort ascending (soonest first)
        return showPastEvents ? bDate - aDate : aDate - bDate;
      } else {
        return a.eventType.localeCompare(b.eventType);
      }
    });
    return sorted;
  }, [filteredEvents, sortBy, showPastEvents]);

  const upcomingCount = events.filter(e => {
    const [year, month, day] = e.date.split('-').map(Number);
    const eventDate = new Date(year, month - 1, day);
    eventDate.setHours(0, 0, 0, 0);
    const isPastByDate = eventDate < currentDate;
    const isPastExplicit = e.isPastEvent === true;
    const isPastEvent = isPastByDate || isPastExplicit;
    return !isPastEvent;
  }).length;
  
  const pastCount = events.filter(e => {
    const [year, month, day] = e.date.split('-').map(Number);
    const eventDate = new Date(year, month - 1, day);
    eventDate.setHours(0, 0, 0, 0);
    const isPastByDate = eventDate < currentDate;
    const isPastExplicit = e.isPastEvent === true;
    const isPastEvent = isPastByDate || isPastExplicit;
    return isPastEvent;
  }).length;
    
  return (
    <section id="events" className="py-16 sm:py-24 relative">
      {/* Background image - half of the section height */}
      <div className="absolute inset-0 z-0 h-1/2">
        <img
          src="/images/events/Main_generator_photo.jpg"
          alt="Generator events background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-gray-50" />
      </div>
      
      {/* Bottom half background */}
      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gray-50 z-0" />
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <h2 className="section-heading text-2xl sm:text-3xl md:text-4xl text-white drop-shadow-lg">
          {selectedDate 
            ? `Events on ${format(selectedDate, 'MMMM d, yyyy')}`
            : showPastEvents ? 'Past Events' : 'Upcoming Events'}
        </h2>
        
        {false && (
          <div className="text-center mb-6">
            <button
              onClick={() => window.location.reload()}
              className="text-sm text-generator-green hover:text-generator-darkGreen underline"
            >
              Clear date filter
            </button>
          </div>
        )}
        
        <div className="mb-6 flex flex-col lg:flex-row gap-3 sm:gap-4 items-start lg:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full lg:w-auto">
            <div className="relative flex-1 sm:flex-none sm:w-80">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search events, speakers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3 sm:py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-generator-green text-base sm:text-sm min-h-[44px] sm:min-h-0"
              />
            </div>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'date' | 'type')}
              className="px-4 py-3 sm:py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-generator-green text-base sm:text-sm min-h-[44px] sm:min-h-0"
            >
              <option value="date">Sort by Date</option>
              <option value="type">Sort by Type</option>
            </select>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
            <button
              onClick={() => setShowPastEvents(false)}
              className={`relative flex items-center gap-2 px-3 sm:px-5 py-2.5 sm:py-3 rounded-lg transition-all duration-300 flex-1 sm:flex-none justify-center min-h-[44px] font-medium ${
                !showPastEvents
                  ? 'bg-gradient-to-r from-generator-green to-generator-darkGreen text-white shadow-lg scale-105'
                  : 'bg-white border-2 border-gray-300 text-gray-700 hover:border-generator-green hover:text-generator-green hover:shadow-md'
              }`}
            >
              <Clock className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="text-sm sm:text-base font-semibold">
                {upcomingCount} Upcoming
              </span>
            </button>

            <button
              onClick={() => setShowPastEvents(true)}
              className={`relative flex items-center gap-2 px-3 sm:px-5 py-2.5 sm:py-3 rounded-lg transition-all duration-300 flex-1 sm:flex-none justify-center min-h-[44px] font-medium ${
                showPastEvents
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg scale-105'
                  : 'bg-white border-2 border-gray-300 text-gray-700 hover:border-purple-500 hover:text-purple-600 hover:shadow-md hover:bg-purple-50'
              }`}
            >
              <span className="text-lg">📅</span>
              <span className="text-sm sm:text-base font-semibold">
                {pastCount} Past Events
              </span>
              {!showPastEvents && pastCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500"></span>
                </span>
              )}
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2">
          {sortedEvents.map((event, index) => (
            <EventCard
              key={event.id}
              event={event}
              index={index}
            />
          ))}
        </div>
        
        {sortedEvents.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 sm:py-16 text-center px-4">
            <Calendar className="h-12 w-12 sm:h-16 sm:w-16 text-gray-300 mb-4" />
            <p className="text-base sm:text-lg lg:text-xl text-gray-500">
              {searchTerm ? 'No events match your search.' : 
               showPastEvents ? 'No past events found.' : 
               'No upcoming events found.'}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}