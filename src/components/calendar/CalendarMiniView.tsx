import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Calendar, CalendarDays, CalendarRange, ChevronDown } from 'lucide-react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths, addWeeks, subWeeks, addDays, subDays, isToday } from 'date-fns';
import { cn } from '@/lib/utils';
import { events } from '@/data/events';
import { TodaysEvents } from './TodaysEvents';

type ViewMode = 'month' | 'week' | 'day';

interface CalendarMiniViewProps {
  onDateSelect?: (date: Date) => void;
}

export function CalendarMiniView({ onDateSelect }: CalendarMiniViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('week');
  const [expandedDate, setExpandedDate] = useState<Date | null>(null);

  // Get events for the current view
  const eventsInView = useMemo(() => {
    return events.map(event => ({
      ...event,
      date: new Date(event.date)
    }));
  }, []);

  // Get events for a specific date
  const getEventsForDate = (date: Date) => {
    return eventsInView.filter(event => 
      isSameDay(event.date, date)
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
      {/* CRITICAL: DO NOT MODIFY THIS BLUR IMPLEMENTATION */}
      {/* Multiple layer approach for maximum compatibility */}
      
      {/* Layer 1: Solid fallback background */}
      <div 
        className="absolute inset-0 rounded-xl"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.08)',
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.06) 100%)',
          zIndex: 0,
        }}
      />
      
      {/* Layer 2: Blur effect layer */}
      <div 
        className="absolute inset-0 rounded-xl calendar-blur-effect"
        style={{
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          zIndex: 1,
        }}
      />
      
      {/* Content layer - MUST have highest zIndex */}
      <div className="relative rounded-xl p-3 sm:p-6 shadow-xl" style={{ zIndex: 2 }}>
      {/* Header with navigation */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3 sm:gap-0">
        <h3 className="text-white font-semibold text-sm sm:text-lg break-words max-w-full">
          {getHeaderText()}
        </h3>
        
        <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
          {/* View mode toggle */}
          <div className="flex bg-white/20 rounded-lg p-0.5 sm:p-1">
            <button
              onClick={() => setViewMode('month')}
              className={cn(
                "p-2 sm:p-1.5 rounded transition-colors min-h-[44px] sm:min-h-0",
                viewMode === 'month' ? "bg-white text-generator-darkGreen" : "text-white hover:bg-white/10"
              )}
              title="Month view"
            >
              <CalendarDays className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('week')}
              className={cn(
                "p-2 sm:p-1.5 rounded transition-colors min-h-[44px] sm:min-h-0",
                viewMode === 'week' ? "bg-white text-generator-darkGreen" : "text-white hover:bg-white/10"
              )}
              title="Week view"
            >
              <CalendarRange className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('day')}
              className={cn(
                "p-2 sm:p-1.5 rounded transition-colors min-h-[44px] sm:min-h-0",
                viewMode === 'day' ? "bg-white text-generator-darkGreen" : "text-white hover:bg-white/10"
              )}
              title="Day view"
            >
              <Calendar className="h-4 w-4" />
            </button>
          </div>

          {/* Navigation buttons */}
          <button
            onClick={navigatePrevious}
            className="p-2 sm:p-1.5 text-white hover:bg-white/20 rounded transition-colors min-h-[44px] sm:min-h-0 min-w-[44px] sm:min-w-0"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={navigateToToday}
            className="px-2 sm:px-3 py-2 sm:py-1 text-xs sm:text-sm text-white hover:bg-white/20 rounded transition-colors min-h-[44px] sm:min-h-0"
          >
            Today
          </button>
          <button
            onClick={navigateNext}
            className="p-2 sm:p-1.5 text-white hover:bg-white/20 rounded transition-colors min-h-[44px] sm:min-h-0 min-w-[44px] sm:min-w-0"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Calendar grid */}
      <div className="space-y-2">
        {/* Day headers for month/week view */}
        {viewMode !== 'day' && (
          <div className="grid grid-cols-7 gap-0.5 sm:gap-1 text-center">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-xs font-medium text-generator-gold py-1 px-0.5">
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
                      "relative p-1 sm:p-2 rounded-lg transition-all aspect-square min-h-[44px] sm:min-h-0",
                      "hover:bg-white/20 active:bg-white/30",
                      isCurrentMonth ? "text-white" : "text-white/40",
                      isToday(day) && "ring-2 ring-generator-gold",
                      isSelected && "bg-white/30"
                    )}
                  >
                    <span className={cn(
                      "text-xs sm:text-sm font-medium",
                      isToday(day) && "text-generator-gold"
                    )}>
                      {format(day, 'd')}
                    </span>
                    
                    {/* Event indicators */}
                    {hasEvents && (
                      <div className="absolute bottom-0.5 sm:bottom-1 left-1/2 transform -translate-x-1/2 flex gap-0.5">
                        {dayEvents.slice(0, 3).map((_, i) => (
                          <div
                            key={i}
                            className="w-1 h-1 bg-generator-gold rounded-full"
                          />
                        ))}
                      </div>
                    )}
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
                        if (viewMode !== 'month') {
                          toggleDateExpansion(day);
                        }
                      }}
                      className={cn(
                        "w-full relative p-2 sm:p-3 rounded-lg transition-all flex items-center justify-between min-h-[44px]",
                        "hover:bg-white/20 active:bg-white/30",
                        isToday(day) && "ring-2 ring-generator-gold",
                        isSelected && "bg-white/30"
                      )}
                    >
                      <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                        <span className={cn(
                          "text-xs sm:text-sm font-medium truncate",
                          isToday(day) && "text-generator-gold",
                          "text-white"
                        )}>
                          {format(day, viewMode === 'week' ? 'EEE, MMM d' : 'EEEE, MMMM d, yyyy')}
                        </span>
                        
                        {hasEvents && (
                          <span className="text-xs text-generator-gold whitespace-nowrap">
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
                                className="w-1.5 h-1.5 bg-generator-gold rounded-full"
                              />
                            ))}
                          </div>
                        )}
                        {viewMode !== 'month' && (
                          <ChevronDown className={cn(
                            "h-4 w-4 text-white/60 transition-transform",
                            isExpanded && "transform rotate-180"
                          )} />
                        )}
                      </div>
                    </button>

                    {/* Simple expanded event list */}
                    {isExpanded && hasEvents && (
                      <div 
                        className="glass-blur-strong rounded-lg p-3 sm:p-4 space-y-2 animate-in slide-in-from-top-2 duration-300"
                        style={{
                          backgroundColor: 'rgba(255, 255, 255, 0.1)',
                          backdropFilter: 'blur(12px)',
                          WebkitBackdropFilter: 'blur(12px)',
                        }}
                      >
                        <div className="space-y-2">
                          {dayEvents.map(event => (
                            <div key={event.id} className="text-xs sm:text-sm">
                              <div className="font-medium text-generator-gold break-words">
                                {event.title}
                              </div>
                              <div className="text-white/70 text-xs break-words">
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
    </div>
  );
}