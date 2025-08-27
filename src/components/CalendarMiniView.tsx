import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Calendar, CalendarDays, CalendarRange } from 'lucide-react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths, addWeeks, subWeeks, addDays, subDays, isToday } from 'date-fns';
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
    
    // Scroll to events section
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
          "gap-1",
          viewMode === 'month' && "grid grid-cols-7",
          viewMode === 'week' && "grid grid-cols-7",
          viewMode === 'day' && "flex justify-center"
        )}>
          {calendarDays.map((day, index) => {
            const dayEvents = getEventsForDate(day);
            const isCurrentMonth = viewMode === 'month' ? isSameMonth(day, currentDate) : true;
            const isSelected = selectedDate && isSameDay(day, selectedDate);
            const hasEvents = dayEvents.length > 0;

            return (
              <button
                key={index}
                onClick={() => handleDateClick(day)}
                className={cn(
                  "relative p-2 rounded-lg transition-all",
                  viewMode === 'day' ? "min-w-[120px] min-h-[80px]" : "aspect-square",
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
                  {format(day, viewMode === 'day' ? 'dd' : 'd')}
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

                {/* Show event count for day view */}
                {viewMode === 'day' && hasEvents && (
                  <div className="mt-2 text-xs text-generator-gold">
                    {dayEvents.length} event{dayEvents.length !== 1 ? 's' : ''}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Event summary for selected date */}
      {selectedDate && (
        <div className="mt-4 pt-4 border-t border-white/20">
          <p className="text-sm text-generator-gold mb-2">
            Events on {format(selectedDate, 'MMMM d, yyyy')}:
          </p>
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