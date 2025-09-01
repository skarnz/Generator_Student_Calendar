import ical, { ICalCalendar } from 'ical-generator';
import { format } from 'date-fns';
import { Event } from '@/data/events';

const TIMEZONE = 'America/New_York'; // Babson is in Eastern Time

export interface CalendarEventData {
  event: Event;
  reminderMinutes?: number;
}

/**
 * Generates an ICS file for a single event
 */
export function generateICSFile(data: CalendarEventData): string {
  const { event, reminderMinutes = 15 } = data;
  
  // Create calendar
  const calendar: ICalCalendar = ical({
    name: 'The Generator Events',
    prodId: {
      company: 'Babson College - The Generator',
      product: 'Generator Student Calendar',
    },
    timezone: TIMEZONE,
  });

  // Parse date and time - parse as local date to avoid timezone issues
  const [year, month, day] = event.date.split('-').map(Number);
  const eventDate = new Date(year, month - 1, day);
  const { startTime, endTime } = parseEventTime(event.time, eventDate);

  // Create event
  const calEvent = calendar.createEvent({
    start: startTime,
    end: endTime,
    summary: event.title,
    description: formatEventDescription(event),
    location: event.location,
    url: event.registrationUrl,
    organizer: {
      name: 'The Generator',
      email: event.contactEmail || 'generator@babson.edu',
    },
    alarms: [
      {
        type: 'display',
        trigger: reminderMinutes * 60, // seconds before event
        description: `Reminder: ${event.title}`,
      },
    ],
    categories: [event.eventType],
    status: 'CONFIRMED',
  });

  // Add custom properties
  if (event.speakerName) {
    calEvent.description += `\n\nSpeaker: ${event.speakerName}${event.speakerTitle ? ` - ${event.speakerTitle}` : ''}`;
  }

  return calendar.toString();
}

/**
 * Downloads an ICS file for the given event
 */
export function downloadICSFile(event: Event): void {
  try {
    const icsContent = generateICSFile({ event });
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    
    // Create filename - parse date locally to avoid timezone issues
    const [year, month, day] = event.date.split('-').map(Number);
    const eventDate = new Date(year, month - 1, day);
    const filename = `${event.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_${format(eventDate, 'yyyy-MM-dd')}.ics`;
    
    // Trigger download
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    
    // Clean up after a short delay
    setTimeout(() => {
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, 100);
  } catch (error) {
    console.error('Error generating calendar file:', error);
    alert('Sorry, there was an error creating the calendar file. Please try again.');
  }
}

/**
 * Parses event time string and returns start/end Date objects
 */
function parseEventTime(timeStr: string, date: Date): { startTime: Date; endTime: Date } {
  // Handle different time formats
  // Examples: "3:00 PM - 6:00 PM", "2:00 PM", "TBD"
  
  if (timeStr.toLowerCase() === 'tbd' || !timeStr) {
    // Default to all-day event
    const startTime = new Date(date);
    startTime.setHours(9, 0, 0, 0);
    const endTime = new Date(date);
    endTime.setHours(17, 0, 0, 0);
    return { startTime, endTime };
  }

  // Check if it's a time range
  const timeRange = timeStr.match(/(\d{1,2}:\d{2}\s*(?:AM|PM)?)\s*[-–]\s*(\d{1,2}:\d{2}\s*(?:AM|PM)?)/i);
  
  if (timeRange) {
    const [, startStr, endStr] = timeRange;
    const startTime = parseTimeToDate(startStr.trim(), date);
    const endTime = parseTimeToDate(endStr.trim(), date);
    return { startTime, endTime };
  }
  
  // Single time - assume 2 hour duration
  const startTime = parseTimeToDate(timeStr.trim(), date);
  const endTime = new Date(startTime);
  endTime.setHours(endTime.getHours() + 2);
  
  return { startTime, endTime };
}

/**
 * Converts time string to Date object
 */
function parseTimeToDate(timeStr: string, date: Date): Date {
  const result = new Date(date);
  
  // Parse time
  const match = timeStr.match(/(\d{1,2}):(\d{2})\s*(AM|PM)?/i);
  if (!match) {
    // Default to 9 AM if parsing fails
    result.setHours(9, 0, 0, 0);
    return result;
  }
  
  let [, hours, minutes, meridiem] = match;
  let hour = parseInt(hours, 10);
  const minute = parseInt(minutes, 10);
  
  // Handle 12-hour format
  if (meridiem) {
    if (meridiem.toUpperCase() === 'PM' && hour !== 12) {
      hour += 12;
    } else if (meridiem.toUpperCase() === 'AM' && hour === 12) {
      hour = 0;
    }
  }
  
  result.setHours(hour, minute, 0, 0);
  return result;
}

/**
 * Formats the event description for the calendar
 */
function formatEventDescription(event: Event): string {
  let description = event.description;
  
  // Add additional details
  const details: string[] = [];
  
  if (event.audience && event.audience.length > 0) {
    details.push(`For: ${event.audience.join(', ')}`);
  }
  
  if (event.food) {
    details.push(`🍕 Food: ${event.food}`);
  }
  
  if (event.prize) {
    details.push(`🏆 Prize: ${event.prize}`);
  }
  
  if (event.contactName) {
    details.push(`Contact: ${event.contactName}${event.contactEmail ? ` (${event.contactEmail})` : ''}`);
  }
  
  if (details.length > 0) {
    description += '\n\n' + details.join('\n');
  }
  
  return description;
}

/**
 * Generates calendar links for various providers
 */
export function generateCalendarLinks(event: Event): {
  google: string;
  outlook: string;
  yahoo: string;
} {
  // Parse date locally to avoid timezone issues
  const [year, month, day] = event.date.split('-').map(Number);
  const eventDate = new Date(year, month - 1, day);
  const { startTime, endTime } = parseEventTime(event.time, eventDate);
  
  // Format dates for URLs
  const startStr = format(startTime, "yyyyMMdd'T'HHmmss");
  const endStr = format(endTime, "yyyyMMdd'T'HHmmss");
  
  // Google Calendar
  const googleUrl = new URL('https://calendar.google.com/calendar/render');
  googleUrl.searchParams.set('action', 'TEMPLATE');
  googleUrl.searchParams.set('text', event.title);
  googleUrl.searchParams.set('dates', `${startStr}/${endStr}`);
  googleUrl.searchParams.set('details', formatEventDescription(event));
  googleUrl.searchParams.set('location', event.location);
  googleUrl.searchParams.set('ctz', TIMEZONE);
  
  // Outlook Web
  const outlookUrl = new URL('https://outlook.live.com/calendar/0/deeplink/compose');
  outlookUrl.searchParams.set('subject', event.title);
  outlookUrl.searchParams.set('body', formatEventDescription(event));
  outlookUrl.searchParams.set('location', event.location);
  outlookUrl.searchParams.set('startdt', startStr);
  outlookUrl.searchParams.set('enddt', endStr);
  
  // Yahoo Calendar
  const yahooUrl = new URL('https://calendar.yahoo.com/');
  yahooUrl.searchParams.set('v', '60');
  yahooUrl.searchParams.set('title', event.title);
  yahooUrl.searchParams.set('desc', formatEventDescription(event));
  yahooUrl.searchParams.set('in_loc', event.location);
  yahooUrl.searchParams.set('st', startStr);
  yahooUrl.searchParams.set('et', endStr);
  
  return {
    google: googleUrl.toString(),
    outlook: outlookUrl.toString(),
    yahoo: yahooUrl.toString(),
  };
}