import { useState, useMemo, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar, CalendarDays, CalendarRange, ChevronDown, Clock, MapPin, X } from 'lucide-react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths, addWeeks, subWeeks, addDays, subDays, isToday } from 'date-fns';
import { cn } from '@/lib/utils';
import { events, Event } from '@/data/events';
import { TodaysEvents } from './TodaysEvents';
import { AddToCalendarButton } from '@/components/ui/AddToCalendarButton';

type ViewMode = 'month' | 'week' | 'day';

interface CalendarMiniViewProps {
  onDateSelect?: (date: Date) => void;
  onEventClick?: (event: Event) => void;
}

export function CalendarMiniView({ onDateSelect, onEventClick }: CalendarMiniViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('week');
  const [expandedDate, setExpandedDate] = useState<Date | null>(null);
  const [quickExpandEvent, setQuickExpandEvent] = useState<Event | null>(null);
  
  // Prevent body scroll when quick expand popup is open
  useEffect(() => {
    if (quickExpandEvent) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      
      return () => {
        const scrollY = document.body.style.top;
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      };
    }
  }, [quickExpandEvent]);

  // Get events for the current view with parsed dates
  const eventsWithParsedDates = useMemo(() => {
    return events.map(event => {
      // Parse date as local to avoid timezone issues
      const [year, month, day] = event.date.split('-').map(Number);
      return {
        originalEvent: event, // Keep reference to original event
        ...event,
        parsedDate: new Date(year, month - 1, day)
      };
    });
  }, []);

  // Get events for a specific date
  const getEventsForDate = (date: Date) => {
    return eventsWithParsedDates.filter(event => 
      isSameDay(event.parsedDate, date)
    );
  };


  const toggleDateExpansion = (date: Date) => {
    if (expandedDate && isSameDay(expandedDate, date)) {
      setExpandedDate(null);
    } else {
      setExpandedDate(date);
    }
  };

  // Generate calendar days based on view mode
  const calendarDays = useMemo(() => {
    let start: Date, end: Date;

    switch (viewMode) {
      case 'month':
        start = startOfWeek(startOfMonth(currentDate));
        end = endOfWeek(endOfMonth(currentDate));
        break;
      case 'week':
        start = startOfWeek(currentDate);
        end = endOfWeek(currentDate);
        break;
      case 'day':
        return [currentDate];
      default:
        start = startOfWeek(startOfMonth(currentDate));
        end = endOfWeek(endOfMonth(currentDate));
    }

    return eachDayOfInterval({ start, end });
  }, [currentDate, viewMode]);

  // Navigation functions
  const navigatePrevious = () => {
    switch (viewMode) {
      case 'month':
        setCurrentDate(subMonths(currentDate, 1));
        break;
      case 'week':
        setCurrentDate(subWeeks(currentDate, 1));
        break;
      case 'day':
        setCurrentDate(subDays(currentDate, 1));
        break;
    }
  };

  const navigateNext = () => {
    switch (viewMode) {
      case 'month':
        setCurrentDate(addMonths(currentDate, 1));
        break;
      case 'week':
        setCurrentDate(addWeeks(currentDate, 1));
        break;
      case 'day':
        setCurrentDate(addDays(currentDate, 1));
        break;
    }
  };

  const navigateToToday = () => {
    setCurrentDate(new Date());
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    onDateSelect?.(date);
  };

  const scrollToEvents = () => {
    const eventsSection = document.getElementById('events');
    if (eventsSection) {
      eventsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getHeaderText = () => {
    switch (viewMode) {
      case 'month':
        return format(currentDate, 'MMMM yyyy');
      case 'week':
        const weekStart = startOfWeek(currentDate);
        const weekEnd = endOfWeek(currentDate);
        if (weekStart.getMonth() === weekEnd.getMonth()) {
          return `${format(weekStart, 'MMM d')} - ${format(weekEnd, 'd, yyyy')}`;
        } else {
          return `${format(weekStart, 'MMM d')} - ${format(weekEnd, 'MMM d, yyyy')}`;
        }
      case 'day':
        return format(currentDate, 'EEEE, MMMM d, yyyy');
    }
  };

  return (
    <div className="relative calendar-blur-container">
      {/* ENHANCED GLASS BLUR - FULLY PERSISTENT ACROSS ALL BROWSERS */}
      {/* Triple-layer approach for maximum compatibility and persistence */}
      {/* Optimized for 20px blur with GPU acceleration and mobile Safari fixes */}
      
      {/* Layer 1: Base gradient background - always visible */}
      <div 
        className="absolute inset-0 rounded-xl calendar-glass-morphism"
        style={{
          zIndex: 0,
          transform: 'translateZ(0)',
          WebkitTransform: 'translateZ(0)',
          willChange: 'transform',
          WebkitBackfaceVisibility: 'hidden',
          backfaceVisibility: 'hidden',
        }}
      />
      
      {/* Layer 2: Primary blur effect with fallbacks - Enhanced to 20px */}
      <div 
        className="absolute inset-0 rounded-xl calendar-blur-effect"
        style={{
          zIndex: 1,
          transform: 'translateZ(0)',
          WebkitTransform: 'translateZ(0)',
          willChange: 'transform',
          WebkitBackfaceVisibility: 'hidden',
          backfaceVisibility: 'hidden',
        }}
      />
      
      {/* Layer 3: Additional glass overlay for enhanced effect */}
      <div
        className="absolute inset-0 rounded-xl"
        style={{
          background: 'radial-gradient(ellipse at top left, rgba(255, 255, 255, 0.1) 0%, transparent 50%)',
          pointerEvents: 'none',
          zIndex: 2,
          transform: 'translateZ(0)',
          WebkitTransform: 'translateZ(0)',
        }}
      />
      
      {/* Content layer - MUST have highest zIndex */}
      <div 
        className="relative rounded-xl p-3 sm:p-6 shadow-2xl" 
        style={{ 
          zIndex: 3,
          transform: 'translateZ(0)',
          WebkitTransform: 'translateZ(0)',
        }}
      >
      {/* Header with navigation */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3 sm:gap-0">
        <h3 className="text-generator-darkGreen font-semibold text-sm sm:text-lg break-words max-w-full">
          {getHeaderText()}
        </h3>
        
        <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
          {/* View mode toggle */}
          <div className="flex bg-gray-100 rounded-lg p-0.5 sm:p-1">
            <button
              onClick={() => setViewMode('month')}
              className={cn(
                "p-2 sm:p-1.5 rounded transition-colors min-h-[44px] sm:min-h-0",
                viewMode === 'month' ? "bg-generator-darkGreen text-white" : "text-generator-darkGreen hover:bg-gray-200"
              )}
              title="Month view"
            >
              <CalendarDays className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('week')}
              className={cn(
                "p-2 sm:p-1.5 rounded transition-colors min-h-[44px] sm:min-h-0",
                viewMode === 'week' ? "bg-generator-darkGreen text-white" : "text-generator-darkGreen hover:bg-gray-200"
              )}
              title="Week view"
            >
              <CalendarRange className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('day')}
              className={cn(
                "p-2 sm:p-1.5 rounded transition-colors min-h-[44px] sm:min-h-0",
                viewMode === 'day' ? "bg-generator-darkGreen text-white" : "text-generator-darkGreen hover:bg-gray-200"
              )}
              title="Day view"
            >
              <Calendar className="h-4 w-4" />
            </button>
          </div>

          {/* Navigation buttons */}
          <button
            onClick={navigatePrevious}
            className="p-2 sm:p-1.5 text-generator-darkGreen hover:bg-gray-100 rounded transition-colors min-h-[44px] sm:min-h-0 min-w-[44px] sm:min-w-0"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={navigateToToday}
            className="px-2 sm:px-3 py-2 sm:py-1 text-xs sm:text-sm text-generator-darkGreen hover:bg-gray-100 rounded transition-colors min-h-[44px] sm:min-h-0"
          >
            Today
          </button>
          <button
            onClick={navigateNext}
            className="p-2 sm:p-1.5 text-generator-darkGreen hover:bg-gray-100 rounded transition-colors min-h-[44px] sm:min-h-0 min-w-[44px] sm:min-w-0"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Calendar grid */}
      <div className="space-y-2">
        {/* Day headers for month view only */}
        {viewMode === 'month' && (
          <div className="grid grid-cols-7 gap-0.5 sm:gap-1 text-center">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-xs font-medium text-generator-darkGreen py-1 px-0.5">
                {day}
              </div>
            ))}
          </div>
        )}

        {/* Calendar days */}
        <div className={cn(
          "space-y-1",
          viewMode === 'month' && "space-y-0"
        )}>
          {viewMode === 'month' ? (
            // Month view - grid layout
            <div className="grid grid-cols-7 gap-0.5 sm:gap-1">
              {calendarDays.map((day, index) => {
                const dayEvents = getEventsForDate(day);
                const isCurrentMonth = isSameMonth(day, currentDate);
                const isSelected = selectedDate && isSameDay(day, selectedDate);
                const hasEvents = dayEvents.length > 0;

                return (
                  <button
                    key={index}
                    onClick={() => handleDateClick(day)}
                    className={cn(
                      "relative p-1 sm:p-2 rounded-lg transition-all min-h-[60px] sm:min-h-[80px]",
                      "hover:bg-white/20 active:bg-white/30",
                      isCurrentMonth ? "text-generator-darkGreen" : "text-gray-400",
                      isToday(day) && "ring-2 ring-generator-darkGreen",
                      isSelected && "bg-white/30"
                    )}
                  >
                    <div className="flex flex-col items-center justify-start h-full">
                      <span className={cn(
                        "text-xs sm:text-sm font-medium mb-1",
                        isToday(day) && "text-generator-darkGreen font-bold"
                      )}>
                        {format(day, 'd')}
                      </span>
                      
                      {/* Event title bubbles */}
                      {hasEvents && (
                        <div className="flex flex-col gap-0.5 w-full px-1">
                          {dayEvents.slice(0, 2).map((event, i) => {
                            // Shorten event titles for grid view
                            const shortTitle = event.title.length > 15 
                              ? event.title.substring(0, 12) + '...' 
                              : event.title;
                            
                            // Event type colors with better contrast
                            const typeColors: Record<string, string> = {
                              'Workshop': 'bg-blue-600/70 text-white border border-blue-400/70',
                              'Major Event': 'bg-generator-darkGreen/70 text-white border border-generator-darkGreen/70',
                              'Speaker Series': 'bg-purple-600/70 text-white border border-purple-400/70',
                              'Roundtable': 'bg-green-600/70 text-white border border-green-400/70',
                              'Weekly Event': 'bg-orange-600/70 text-white border border-orange-400/70',
                              'Talk': 'bg-indigo-600/70 text-white border border-indigo-400/70',
                              'Buildathon': 'bg-red-600/70 text-white border border-red-400/70',
                              'Hackathon': 'bg-pink-600/70 text-white border border-pink-400/70',
                              'Competition': 'bg-yellow-600/70 text-white border border-yellow-400/70',
                              'Mixer': 'bg-teal-600/70 text-white border border-teal-400/70',
                              'Open House': 'bg-cyan-600/70 text-white border border-cyan-400/70',
                              'default': 'bg-gray-200 text-generator-darkGreen border border-gray-300'
                            };
                            
                            const colorClass = typeColors[event.eventType] || typeColors.default;
                            
                            return (
                              <div
                                key={event.id}
                                className={cn(
                                  "text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded-md truncate",
                                  "font-medium backdrop-blur-sm flex items-center gap-0.5",
                                  "cursor-pointer hover:scale-105 transition-transform",
                                  colorClass
                                )}
                                title={event.title}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setQuickExpandEvent(event.originalEvent);
                                }}
                              >
                                <Calendar className="h-3 w-3 flex-shrink-0 drop-shadow-sm" />
                                <span className="truncate font-semibold">{shortTitle}</span>
                              </div>
                            );
                          })}
                          {dayEvents.length > 2 && (
                            <div className="text-[8px] text-gray-500 text-center">
                              +{dayEvents.length - 2} more
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          ) : (
            // Week and Day view - expandable layout
            <div className="space-y-1">
              {calendarDays.map((day, index) => {
                const dayEvents = getEventsForDate(day);
                const isSelected = selectedDate && isSameDay(day, selectedDate);
                const hasEvents = dayEvents.length > 0;
                const isExpanded = expandedDate && isSameDay(expandedDate, day);

                return (
                  <div key={index} className="space-y-1">
                    <button
                      onClick={() => {
                        handleDateClick(day);
                        if (viewMode === 'week' || viewMode === 'day') {
                          toggleDateExpansion(day);
                        }
                      }}
                      className={cn(
                        "w-full relative p-2 sm:p-3 rounded-lg transition-all flex items-center justify-between min-h-[44px]",
                        "hover:bg-white/20 active:bg-white/30",
                        isToday(day) && "ring-2 ring-generator-darkGreen",
                        isSelected && "bg-white/30"
                      )}
                    >
                      <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                        <span className={cn(
                          "text-xs sm:text-sm font-medium truncate",
                          isToday(day) && "text-generator-darkGreen font-bold",
                          "text-generator-darkGreen"
                        )}>
                          {format(day, viewMode === 'week' ? 'EEE, MMM d' : 'EEEE, MMMM d, yyyy')}
                        </span>
                        
                        {hasEvents && (
                          <span className="text-xs text-generator-darkGreen font-semibold whitespace-nowrap">
                            {dayEvents.length} event{dayEvents.length !== 1 ? 's' : ''}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                        {hasEvents && (
                          <div className="flex gap-0.5">
                            {dayEvents.slice(0, 3).map((_, i) => (
                              <div
                                key={i}
                                className="w-1.5 h-1.5 bg-generator-darkGreen rounded-full"
                              />
                            ))}
                          </div>
                        )}
                        {(viewMode === 'week' || viewMode === 'day') && (
                          <ChevronDown className={cn(
                            "h-4 w-4 text-gray-500 transition-transform",
                            isExpanded && "transform rotate-180"
                          )} />
                        )}
                      </div>
                    </button>

                    {/* Enhanced expanded event list with 20px blur */}
                    {isExpanded && hasEvents && (
                      <div 
                        className="rounded-lg p-3 sm:p-4 space-y-2 animate-in slide-in-from-top-2 duration-300"
                        style={{
                          backgroundColor: 'rgba(255, 255, 255, 0.12)',
                          backdropFilter: 'blur(20px) saturate(180%)',
                          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                          boxShadow: 'inset 0 1px 0 0 rgba(255, 255, 255, 0.2), 0 4px 12px -4px rgba(0, 0, 0, 0.2)',
                          transform: 'translateZ(0)',
                          WebkitTransform: 'translateZ(0)',
                          willChange: 'transform',
                          WebkitBackfaceVisibility: 'hidden',
                          backfaceVisibility: 'hidden',
                        }}
                      >
                        <div className="space-y-2">
                          {dayEvents.map(event => (
                            <div 
                              key={event.id} 
                              className="text-xs sm:text-sm cursor-pointer hover:bg-white/10 rounded p-2 -m-2 transition-colors"
                              onClick={() => {
                                if (onEventClick) {
                                  onEventClick(event.originalEvent);
                                }
                              }}
                            >
                              <div className="font-medium text-generator-darkGreen break-words">
                                {event.title}
                              </div>
                              <div className="text-gray-600 text-xs break-words">
                                {event.time} • {event.location}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Today's Events section */}
      <TodaysEvents />
      </div>
      
      {/* Quick Expand Event Popup */}
      {quickExpandEvent && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setQuickExpandEvent(null)}
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          
          <div 
            className="relative max-w-md w-full animate-in zoom-in-95 fade-in duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Enhanced Glass morphism container with 20px blur */}
            <div className="calendar-blur-container rounded-2xl overflow-hidden">
              <div 
                className="absolute inset-0 calendar-blur-effect"
                style={{
                  transform: 'translateZ(0)',
                  WebkitTransform: 'translateZ(0)',
                  willChange: 'transform',
                  WebkitBackfaceVisibility: 'hidden',
                  backfaceVisibility: 'hidden',
                }}
              />
              <div 
                className="absolute inset-0 calendar-glass-morphism"
                style={{
                  transform: 'translateZ(0)',
                  WebkitTransform: 'translateZ(0)',
                }}
              />
              
              <div 
                className="relative p-6 z-10"
                style={{
                  transform: 'translateZ(0)',
                  WebkitTransform: 'translateZ(0)',
                }}
              >
                {/* Close button */}
                <button
                  onClick={() => setQuickExpandEvent(null)}
                  className="absolute top-4 right-4 p-1 rounded-full hover:bg-white/20 transition-colors"
                >
                  <X className="h-5 w-5 text-white" />
                </button>
                
                {/* Event type badge */}
                <div className="inline-block px-3 py-1 mb-3 text-xs font-medium bg-generator-darkGreen/20 text-generator-darkGreen rounded-full border border-generator-darkGreen/50">
                  {quickExpandEvent.eventType}
                </div>
                
                {/* Event title */}
                <h3 className="text-xl font-bold text-white mb-3">
                  {quickExpandEvent.title}
                </h3>
                
                {/* Event details */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-white/80">
                    <Calendar className="h-4 w-4 text-generator-darkGreen" />
                    <span className="text-sm">{(() => {
                      const [year, month, day] = quickExpandEvent.date.split('-').map(Number);
                      const eventDate = new Date(year, month - 1, day);
                      return format(eventDate, 'EEEE, MMMM d, yyyy');
                    })()}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-white/80">
                    <Clock className="h-4 w-4 text-generator-darkGreen" />
                    <span className="text-sm">{quickExpandEvent.time}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-white/80">
                    <MapPin className="h-4 w-4 text-generator-darkGreen" />
                    <span className="text-sm">{quickExpandEvent.location}</span>
                  </div>
                </div>
                
                {/* Description */}
                <p className="text-sm text-white/70 mb-4 line-clamp-3">
                  {quickExpandEvent.description}
                </p>
                
                {/* Actions */}
                <div className="flex gap-3">
                  {/* Check if event is past */}
                  <div className="flex-1">
                    <AddToCalendarButton 
                      event={quickExpandEvent}
                      variant="mobile"
                      className="w-full"
                    />
                  </div>
                  
                  <button
                    onClick={() => {
                      // Call onEventClick to open the full modal
                      if (onEventClick) {
                        onEventClick(quickExpandEvent);
                      }
                      setQuickExpandEvent(null);
                    }}
                    className="flex-1 py-2 px-4 bg-white/20 text-white font-medium rounded-lg hover:bg-white/30 transition-colors"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}