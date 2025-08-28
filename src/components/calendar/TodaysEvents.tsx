import { useState, useEffect } from 'react';
import { Clock, MapPin, Gift, Utensils, Calendar } from 'lucide-react';
import { format, isToday, parseISO, differenceInMinutes, isFuture, isPast, addHours } from 'date-fns';
import { events } from '@/data/events';
import { cn } from '@/lib/utils';

interface TodayEvent {
  event: typeof events[0];
  startTime: Date;
  endTime: Date;
}

export function TodaysEvents() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [todaysEvents, setTodaysEvents] = useState<TodayEvent[]>([]);

  useEffect(() => {
    // Update current time every minute
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Filter and process today's events
    const today = new Date();
    const todayEvents = events
      .filter(event => isToday(parseISO(event.date)))
      .map(event => {
        // Parse event time
        const eventDate = parseISO(event.date);
        const timeParts = event.time.match(/(\d{1,2}):(\d{2})\s*(AM|PM)?/i);
        if (!timeParts) return null;
        
        let hours = parseInt(timeParts[1]);
        const minutes = parseInt(timeParts[2]);
        const isPM = timeParts[3]?.toUpperCase() === 'PM';
        
        if (isPM && hours !== 12) hours += 12;
        if (!isPM && hours === 12) hours = 0;
        
        const startTime = new Date(eventDate);
        startTime.setHours(hours, minutes, 0, 0);
        
        // Estimate end time (2 hours default if not specified)
        const endTime = addHours(startTime, 2);
        
        return {
          event,
          startTime,
          endTime
        };
      })
      .filter(Boolean) as TodayEvent[];
    
    // Sort by start time
    todayEvents.sort((a, b) => a.startTime.getTime() - b.startTime.getTime());
    
    setTodaysEvents(todayEvents);
  }, []);

  const getTimeStatus = (event: TodayEvent) => {
    const now = currentTime;
    
    if (isFuture(event.startTime)) {
      const minutesUntil = differenceInMinutes(event.startTime, now);
      if (minutesUntil < 60) {
        return { status: 'upcoming', text: `Starts in ${minutesUntil} min`, color: 'text-amber-600' };
      } else {
        const hoursUntil = Math.floor(minutesUntil / 60);
        return { status: 'upcoming', text: `Starts in ${hoursUntil}h ${minutesUntil % 60}m`, color: 'text-blue-600' };
      }
    } else if (isPast(event.endTime)) {
      return { status: 'ended', text: 'Ended', color: 'text-gray-500' };
    } else {
      const minutesLeft = differenceInMinutes(event.endTime, now);
      return { status: 'ongoing', text: `${minutesLeft} min left`, color: 'text-green-600' };
    }
  };

  if (todaysEvents.length === 0) {
    return null; // Don't show the section if no events today
  }

  return (
    <div className="mt-4 pt-4 border-t border-white/20">
      <div className="">
        <div className="">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-generator-gold" />
                <h3 className="font-semibold text-white">Today's Events</h3>
              </div>
              <span className="text-xs text-generator-gold">
                {format(currentTime, 'EEEE, MMMM d')} • {todaysEvents.length} event{todaysEvents.length !== 1 ? 's' : ''}
              </span>
            </div>
          </div>

          {/* Events list - always show all */}
          <div className="space-y-2">
            {todaysEvents.map((todayEvent, index) => {
              const timeStatus = getTimeStatus(todayEvent);
              
              return (
                <div
                  key={todayEvent.event.id}
                  className={cn(
                    "bg-white/10 rounded-lg p-3 border border-white/20",
                    timeStatus.status === 'ongoing' && "border-generator-gold/50 bg-generator-gold/10",
                    timeStatus.status === 'upcoming' && index === 0 && "border-generator-gold/30 bg-white/15"
                  )}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-white">{todayEvent.event.title}</h4>
                        <span className={cn("text-xs font-medium", timeStatus.color)}>
                          {timeStatus.text}
                        </span>
                      </div>
                      
                      {todayEvent.event.shortBlurb && (
                        <p className="text-xs text-white/70 mb-2">{todayEvent.event.shortBlurb}</p>
                      )}
                      
                      <div className="flex flex-wrap gap-3 text-xs">
                        <div className="flex items-center gap-1 text-white/60">
                          <Clock className="h-3 w-3" />
                          <span>{todayEvent.event.time}</span>
                        </div>
                        
                        <div className="flex items-center gap-1 text-white/60">
                          <MapPin className="h-3 w-3" />
                          <span>{todayEvent.event.location}</span>
                        </div>
                        
                        {todayEvent.event.food && (
                          <div className="flex items-center gap-1 text-generator-gold">
                            <Utensils className="h-3 w-3" />
                            <span>{todayEvent.event.food}</span>
                          </div>
                        )}
                        
                        {todayEvent.event.prize && (
                          <div className="flex items-center gap-1 text-generator-gold">
                            <Gift className="h-3 w-3" />
                            <span>{todayEvent.event.prize}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {todayEvent.event.registrationUrl && timeStatus.status !== 'ended' && (
                      <a
                        href={todayEvent.event.registrationUrl}
                        className="flex-shrink-0 px-3 py-1 bg-white/20 text-white text-xs rounded-md hover:bg-white/30 transition-colors"
                      >
                        Register
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}