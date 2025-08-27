import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Calendar, CalendarDays, CalendarRange, ChevronDown, ChevronUp, Clock, ArrowDown } from 'lucide-react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths, addWeeks, subWeeks, addDays, subDays, isToday, parse, isWithinInterval, startOfDay, endOfDay } from 'date-fns';
import { cn } from '@/lib/utils';
import { events } from '@/data/events';

type ViewMode = 'month' | 'week' | 'day';

interface CalendarMiniViewProps {
  onDateSelect?: (date: Date) => void;
}

export function CalendarMiniView({ onDateSelect }: CalendarMiniViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('month');
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

  // Get events for a specific hour
  const getEventsForHour = (date: Date, hour: number) => {
    const dayEvents = getEventsForDate(date);
    return dayEvents.filter(event => {
      // Parse event time to get the hour
      const timeParts = event.time.match(/(\d{1,2}):(\d{2})\s*(AM|PM)?/i);
      if (!timeParts) return false;
      
      let eventHour = parseInt(timeParts[1]);
      const isPM = timeParts[3]?.toUpperCase() === 'PM';
      
      if (isPM && eventHour !== 12) eventHour += 12;
      if (!isPM && eventHour === 12) eventHour = 0;
      
      return eventHour === hour;
    });
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
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-xl">
      {/* Header with navigation */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-semibold text-lg">
          {getHeaderText()}
        </h3>
        
        <div className="flex items-center gap-2">
          {/* View mode toggle */}
          <div className="flex bg-white/20 rounded-lg p-1">
            <button
              onClick={() => setViewMode('month')}
              className={cn(
                "p-1.5 rounded transition-colors",
                viewMode === 'month' ? "bg-white text-generator-darkGreen" : "text-white hover:bg-white/10"
              )}
              title="Month view"
            >
              <CalendarDays className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('week')}
              className={cn(
                "p-1.5 rounded transition-colors",
                viewMode === 'week' ? "bg-white text-generator-darkGreen" : "text-white hover:bg-white/10"
              )}
              title="Week view"
            >
              <CalendarRange className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('day')}
              className={cn(
                "p-1.5 rounded transition-colors",
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
            className="p-1.5 text-white hover:bg-white/20 rounded transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={navigateToToday}
            className="px-3 py-1 text-sm text-white hover:bg-white/20 rounded transition-colors"
          >
            Today
          </button>
          <button
            onClick={navigateNext}
            className="p-1.5 text-white hover:bg-white/20 rounded transition-colors"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Calendar grid */}
      <div className="space-y-2">
        {/* Day headers for month/week view */}
        {viewMode !== 'day' && (
          <div className="grid grid-cols-7 gap-1 text-center">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-xs font-medium text-generator-gold py-1">
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
            <div className="grid grid-cols-7 gap-1">
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
                      "relative p-2 rounded-lg transition-all aspect-square",
                      "hover:bg-white/20",
                      isCurrentMonth ? "text-white" : "text-white/40",
                      isToday(day) && "ring-2 ring-generator-gold",
                      isSelected && "bg-white/30"
                    )}
                  >
                    <span className={cn(
                      "text-sm font-medium",
                      isToday(day) && "text-generator-gold"
                    )}>
                      {format(day, 'd')}
                    </span>
                    
                    {/* Event indicators */}
                    {hasEvents && (
                      <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex gap-0.5">
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
                        "w-full relative p-3 rounded-lg transition-all flex items-center justify-between",
                        "hover:bg-white/20",
                        isToday(day) && "ring-2 ring-generator-gold",
                        isSelected && "bg-white/30"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <span className={cn(
                          "text-sm font-medium",
                          isToday(day) && "text-generator-gold",
                          "text-white"
                        )}>
                          {format(day, viewMode === 'week' ? 'EEE, MMM d' : 'EEEE, MMMM d, yyyy')}
                        </span>
                        
                        {hasEvents && (
                          <span className="text-xs text-generator-gold">
                            {dayEvents.length} event{dayEvents.length !== 1 ? 's' : ''}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
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

                    {/* Expandable hourly view */}
                    {isExpanded && (
                      <div className="bg-white/5 rounded-lg p-4 space-y-2 animate-in slide-in-from-top-2 duration-300">
                        <div className="flex items-center gap-2 mb-3">
                          <Clock className="h-4 w-4 text-generator-gold" />
                          <span className="text-sm font-medium text-white">Hourly Schedule</span>
                        </div>
                        
                        <div className="space-y-1 max-h-96 overflow-y-auto">
                          {[...Array(24)].map((_, hour) => {
                            const hourEvents = getEventsForHour(day, hour);
                            const timeLabel = hour === 0 ? '12 AM' : hour < 12 ? `${hour} AM` : hour === 12 ? '12 PM' : `${hour - 12} PM`;
                            
                            return (
                              <div
                                key={hour}
                                className={cn(
                                  "flex gap-3 p-2 rounded border-l-2 transition-all",
                                  hourEvents.length > 0 
                                    ? "border-generator-gold bg-white/10" 
                                    : "border-white/10 hover:bg-white/5"
                                )}
                              >
                                <span className="text-xs text-white/60 w-12 flex-shrink-0">
                                  {timeLabel}
                                </span>
                                <div className="flex-1">
                                  {hourEvents.length > 0 ? (
                                    <div className="space-y-1">
                                      {hourEvents.map(event => (
                                        <div key={event.id} className="text-xs">
                                          <div className="font-medium text-generator-gold">
                                            {event.title}
                                          </div>
                                          <div className="text-white/70">
                                            {event.time} • {event.location}
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  ) : (
                                    <div className="h-4" />
                                  )}
                                </div>
                              </div>
                            );
                          })}
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

      {/* Event summary for selected date */}
      {selectedDate && (
        <div className="mt-4 pt-4 border-t border-white/20">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-generator-gold">
              Events on {format(selectedDate, 'MMMM d, yyyy')}:
            </p>
            {getEventsForDate(selectedDate).length > 0 && (
              <button
                onClick={scrollToEvents}
                className="flex items-center gap-1 text-xs text-white/70 hover:text-generator-gold transition-colors"
              >
                <span>View in list</span>
                <ArrowDown className="h-3 w-3" />
              </button>
            )}
          </div>
          <div className="space-y-1">
            {getEventsForDate(selectedDate).length > 0 ? (
              getEventsForDate(selectedDate).map(event => (
                <div key={event.id} className="text-xs text-white/80">
                  • {event.time} - {event.title}
                </div>
              ))
            ) : (
              <p className="text-xs text-white/60">No events scheduled</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}