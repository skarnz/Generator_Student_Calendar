import { useState, useRef, useEffect } from 'react';
import { Event } from '@/data/events';
import { generateCalendarLinks, downloadICSFile } from '@/services/calendarService';
import { Calendar, ChevronDown, Apple } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AddToCalendarButtonProps {
  event: Event;
  className?: string;
  variant?: 'default' | 'mobile';
}

export function AddToCalendarButton({ event, className = '', variant = 'default' }: AddToCalendarButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [dropdownPosition, setDropdownPosition] = useState<'bottom' | 'top'>('bottom');
  
  // Get calendar links
  const calendarLinks = generateCalendarLinks(event);
  
  // Calculate dropdown position
  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - buttonRect.bottom;
      const spaceAbove = buttonRect.top;
      const dropdownHeight = 300; // Approximate height
      
      if (spaceBelow < dropdownHeight && spaceAbove > dropdownHeight) {
        setDropdownPosition('top');
      } else {
        setDropdownPosition('bottom');
      }
    }
  }, [isOpen]);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);
  
  // Scroll dropdown into view when opened
  useEffect(() => {
    if (isOpen && dropdownRef.current) {
      const dropdown = dropdownRef.current.querySelector('.calendar-dropdown');
      if (dropdown) {
        dropdown.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'nearest',
          inline: 'nearest'
        });
      }
    }
  }, [isOpen]);
  
  const handleAppleCalendar = () => {
    downloadICSFile(event);
    setIsOpen(false);
  };
  
  // DO NOT MODIFY - Google Calendar working perfectly
  const handleGoogleCalendar = () => {
    window.open(calendarLinks.google, '_blank');
    setIsOpen(false);
  };
  
  // DO NOT MODIFY - Outlook Calendar working perfectly  
  const handleOutlookCalendar = () => {
    window.open(calendarLinks.outlook, '_blank');
    setIsOpen(false);
  };
  
  return (
    <div className={cn("relative", className)} ref={dropdownRef}>
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-generator-green text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
      >
        <Calendar className="h-5 w-5" />
        Details & Add to Calendar
        <ChevronDown className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")} />
      </button>
      
      {isOpen && (
        <div 
          className={cn(
            "calendar-dropdown absolute z-50 w-full bg-white rounded-lg shadow-xl border border-gray-200 py-2",
            dropdownPosition === 'bottom' ? 'mt-2 top-full' : 'mb-2 bottom-full'
          )}
          style={{
            minWidth: '250px',
            maxHeight: '80vh',
            overflowY: 'auto'
          }}
        >
          <button
            onClick={handleAppleCalendar}
            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
          >
            <Apple className="h-5 w-5 text-gray-600" />
            <span className="text-gray-900">Apple Calendar</span>
          </button>
          
          {/* DO NOT MODIFY - Google Calendar button working perfectly */}
          <button
            onClick={handleGoogleCalendar}
            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
          >
            <Calendar className="h-5 w-5 text-blue-600" />
            <span className="text-gray-900">Google Calendar</span>
          </button>
          
          {/* DO NOT MODIFY - Outlook Calendar button working perfectly */}
          <button
            onClick={handleOutlookCalendar}
            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
          >
            <div className="h-5 w-5 bg-blue-500 rounded flex items-center justify-center">
              <span className="text-white text-xs font-bold">O</span>
            </div>
            <span className="text-gray-900">Outlook Calendar</span>
          </button>
          
          <div className="border-t border-gray-200 mt-2 pt-2">
            <button
              onClick={handleAppleCalendar}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
            >
              <Calendar className="h-5 w-5 text-gray-600" />
              <span className="text-gray-900">Download .ics file</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}