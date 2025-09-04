import { useEffect, useRef } from 'react';
import { Event } from '@/data/events';

// Try to import the package, but also load from CDN as fallback
try {
  import('add-to-calendar-button');
} catch {
  // Will load from CDN as fallback
}

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
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Parse event time to get start and end times
  const parseEventTime = (timeStr: string, date: string) => {
    // Default times if TBD
    if (!timeStr || timeStr.toLowerCase() === 'tbd') {
      return {
        startTime: '09:00',
        endTime: '17:00'
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
      
      return {
        startTime: `${String(startH).padStart(2, '0')}:${startMin}`,
        endTime: `${String(endH).padStart(2, '0')}:${endMin}`
      };
    }
    
    // Single time - assume 2 hour duration
    const singleTimeMatch = timeStr.match(/(\d{1,2}):(\d{2})\s*(AM|PM)?/i);
    if (singleTimeMatch) {
      const [, hour, min, meridiem] = singleTimeMatch;
      let h = parseInt(hour);
      
      if (meridiem?.toUpperCase() === 'PM' && h !== 12) h += 12;
      if (meridiem?.toUpperCase() === 'AM' && h === 12) h = 0;
      
      const endH = (h + 2) % 24;
      
      return {
        startTime: `${String(h).padStart(2, '0')}:${min}`,
        endTime: `${String(endH).padStart(2, '0')}:${min}`
      };
    }
    
    // Default fallback
    return {
      startTime: '09:00',
      endTime: '11:00'
    };
  };
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Ensure the web component is loaded
    if (!customElements.get('add-to-calendar-button')) {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/add-to-calendar-button@2/dist/atcb.min.js';
      script.async = true;
      document.head.appendChild(script);
    }
    
    // Clear container
    containerRef.current.innerHTML = '';
    
    const { startTime, endTime } = parseEventTime(event.time, event.date);
    
    // Escape special characters for HTML attributes
    const escapeHtml = (str: string) => {
      return str
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
    };
    
    // Create the web component with all necessary attributes
    const htmlContent = `
      <add-to-calendar-button
        name="${escapeHtml(event.title)}"
        description="${escapeHtml(event.description)}"
        startDate="${event.date}"
        startTime="${startTime}"
        endTime="${endTime}"
        timeZone="America/New_York"
        location="${escapeHtml(event.location)}"
        organizer="The Generator|generator@babson.edu"
        options="Apple,Google,Outlook.com,Microsoft365,Yahoo,iCal"
        iCalFileName="${event.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}"
        label="Details &amp; Add to Calendar"
        trigger="click"
        listStyle="${variant === 'mobile' ? 'modal' : 'dropdown'}"
        buttonStyle="flat"
        size="16|16|16"
        lightMode="bodyScheme"
      ></add-to-calendar-button>
    `;
    
    // Add CSS to style the button
    const style = document.createElement('style');
    style.textContent = `
      add-to-calendar-button {
        width: 100%;
      }
      add-to-calendar-button::part(atcb-button) {
        background-color: #22c55e !important;
        color: white !important;
        border: none !important;
        padding: 12px 24px !important;
        border-radius: 8px !important;
        font-weight: 500 !important;
        font-size: 16px !important;
        width: 100% !important;
        cursor: pointer !important;
        transition: background-color 0.2s !important;
      }
      add-to-calendar-button::part(atcb-button):hover {
        background-color: #16a34a !important;
      }
      add-to-calendar-button::part(atcb-list) {
        border-radius: 8px !important;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1) !important;
      }
      add-to-calendar-button::part(atcb-list-item) {
        padding: 12px 16px !important;
      }
      add-to-calendar-button::part(atcb-list-item):hover {
        background-color: #f3f4f6 !important;
      }
      ${className ? `.${className} add-to-calendar-button { ${className} }` : ''}
    `;
    
    containerRef.current.appendChild(style);
    containerRef.current.insertAdjacentHTML('beforeend', htmlContent);
    
  }, [event, variant, className]);
  
  return <div ref={containerRef} className={className} />;
}