import { useEffect, useRef } from 'react';
import 'add-to-calendar-button/assets/css/atcb.css';
import 'add-to-calendar-button';
import { Event } from '@/data/events';
import { cn } from '@/lib/utils';

// Declare the custom element for TypeScript
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'add-to-calendar-button': any;
    }
  }
}

interface AddToCalendarButtonProps {
  event: Event;
  className?: string;
  variant?: 'default' | 'mobile';
}

export function AddToCalendarButton({ event, className = '', variant = 'default' }: AddToCalendarButtonProps) {
  const buttonRef = useRef<HTMLDivElement>(null);
  
  // Parse event time to get start and end times
  const parseEventTime = (timeStr: string, date: string) => {
    const [year, month, day] = date.split('-').map(Number);
    
    // Default times if TBD
    if (!timeStr || timeStr.toLowerCase() === 'tbd') {
      return {
        startTime: `${date}T09:00:00`,
        endTime: `${date}T17:00:00`
      };
    }
    
    // Parse time range (e.g., "3:00 PM - 6:00 PM")
    const timeMatch = timeStr.match(/(\d{1,2}):(\d{2})\s*(AM|PM)?.*?(\d{1,2}):(\d{2})\s*(AM|PM)?/i);
    
    if (timeMatch) {
      const [, startHour, startMin, startMeridiem, endHour, endMin, endMeridiem] = timeMatch;
      
      let startH = parseInt(startHour);
      let endH = parseInt(endHour);
      
      // Convert to 24-hour format
      if (startMeridiem?.toUpperCase() === 'PM' && startH !== 12) startH += 12;
      if (startMeridiem?.toUpperCase() === 'AM' && startH === 12) startH = 0;
      if (endMeridiem?.toUpperCase() === 'PM' && endH !== 12) endH += 12;
      if (endMeridiem?.toUpperCase() === 'AM' && endH === 12) endH = 0;
      
      const startTime = `${date}T${String(startH).padStart(2, '0')}:${startMin}:00`;
      const endTime = `${date}T${String(endH).padStart(2, '0')}:${endMin}:00`;
      
      return { startTime, endTime };
    }
    
    // Single time - assume 2 hour duration
    const singleTimeMatch = timeStr.match(/(\d{1,2}):(\d{2})\s*(AM|PM)?/i);
    if (singleTimeMatch) {
      const [, hour, min, meridiem] = singleTimeMatch;
      let h = parseInt(hour);
      
      if (meridiem?.toUpperCase() === 'PM' && h !== 12) h += 12;
      if (meridiem?.toUpperCase() === 'AM' && h === 12) h = 0;
      
      const startTime = `${date}T${String(h).padStart(2, '0')}:${min}:00`;
      const endH = (h + 2) % 24;
      const endTime = `${date}T${String(endH).padStart(2, '0')}:${min}:00`;
      
      return { startTime, endTime };
    }
    
    // Default fallback
    return {
      startTime: `${date}T09:00:00`,
      endTime: `${date}T11:00:00`
    };
  };
  
  useEffect(() => {
    if (!buttonRef.current) return;
    
    const { startTime, endTime } = parseEventTime(event.time, event.date);
    
    // Create a wrapper with button styling
    const wrapper = document.createElement('div');
    wrapper.className = cn(
      "inline-flex items-center justify-center gap-2 px-6 py-3",
      "bg-generator-green text-white font-medium rounded-lg",
      "hover:bg-green-700 transition-colors cursor-pointer",
      className
    );
    
    // Create the button element
    const button = document.createElement('add-to-calendar-button');
    
    // Set attributes
    button.setAttribute('name', event.title);
    button.setAttribute('description', event.description);
    button.setAttribute('startDate', event.date);
    button.setAttribute('startTime', startTime.split('T')[1]);
    button.setAttribute('endTime', endTime.split('T')[1]);
    button.setAttribute('timeZone', 'America/New_York');
    button.setAttribute('location', event.location);
    
    // Set organizer info
    button.setAttribute('organizer', 'The Generator|generator@babson.edu');
    
    // Mobile optimizations
    if (variant === 'mobile') {
      button.setAttribute('size', '0'); // Hide default button
      button.setAttribute('listStyle', 'modal');
      button.setAttribute('trigger', 'click');
    } else {
      button.setAttribute('size', '0'); // Hide default button
      button.setAttribute('listStyle', 'dropdown');
      button.setAttribute('trigger', 'click');
    }
    
    // Calendar options
    button.setAttribute('options', 'Apple,Google,Yahoo,Outlook.com,Microsoft365,MicrosoftTeams,iCal');
    
    // Create custom button text
    const buttonText = document.createElement('span');
    buttonText.textContent = 'Details & Add to Calendar';
    
    // Clear and build structure
    buttonRef.current.innerHTML = '';
    wrapper.appendChild(buttonText);
    wrapper.appendChild(button);
    buttonRef.current.appendChild(wrapper);
    
    // Add click handler to wrapper to trigger the calendar button
    wrapper.addEventListener('click', () => {
      const calButton = button.shadowRoot?.querySelector('.atcb-trigger') as HTMLElement;
      if (calButton) {
        calButton.click();
      }
    });
    
  }, [event, variant, className]);
  
  return <div ref={buttonRef} />;
}