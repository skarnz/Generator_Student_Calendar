import { Event } from './events';
// CSV file is located in /event-data/events.csv for easy editing
import eventsCSV from '../../event-data/events.csv?raw';

function parseCSVDate(dateStr: string): string {
  // DO NOT USE Date constructor - it causes timezone issues!
  // Just validate and return the string
  const trimmed = dateStr.trim();
  
  // If already in YYYY-MM-DD format, return as-is
  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
    return trimmed;
  }
  
  // If in MM/DD/YYYY format, convert
  if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(trimmed)) {
    const [month, day, year] = trimmed.split('/');
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  }
  
  console.error('Invalid date format:', dateStr);
  return dateStr;
}

function parseCSVRow(headers: string[], row: string[]): Event {
  const event: any = {
    id: `event-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
  };

  headers.forEach((header, i) => {
    const value = row[i]?.trim() || '';
    const headerLower = header.toLowerCase().replace(/\s+/g, '');

    switch(headerLower) {
      case 'title':
        event.title = value || 'Untitled Event';
        break;
      case 'description':
        event.description = value || '';
        break;
      case 'date':
        event.date = parseCSVDate(value);
        break;
      case 'time':
        event.time = value || 'TBD';
        break;
      case 'location':
        event.location = value || 'TBD';
        break;
      case 'eventtype':
        event.eventType = value || 'Event';
        break;
      case 'audience':
        event.audience = value ? value.split(';').map(a => a.trim()).filter(Boolean) : ['Everyone'];
        break;
      case 'registrationurl':
        event.registrationUrl = value || undefined;
        break;
      case 'speakername':
        event.speakerName = value || undefined;
        break;
      case 'speakertitle':
        event.speakerTitle = value || undefined;
        break;
      case 'contactname':
        event.contactName = value || undefined;
        break;
      case 'contactemail':
        event.contactEmail = value || undefined;
        break;
      case 'food':
        event.food = value || undefined;
        break;
      case 'prize':
        event.prize = value || undefined;
        break;
      case 'shortblurb':
        event.shortBlurb = value || undefined;
        break;
    }
  });

  // Ensure required fields have defaults
  if (!event.title) event.title = 'Untitled Event';
  if (!event.description) event.description = '';
  if (!event.date) event.date = new Date().toISOString().split('T')[0];
  if (!event.time) event.time = 'TBD';
  if (!event.location) event.location = 'TBD';
  if (!event.eventType) event.eventType = 'Event';
  if (!event.audience || event.audience.length === 0) event.audience = ['Everyone'];

  return event as Event;
}

export function loadEventsFromCSV(): Event[] {
  try {
    // Split CSV into lines
    const lines = eventsCSV.trim().split('\n');
    if (lines.length < 2) return [];

    // Parse headers
    const headerLine = lines[0];
    const headers = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < headerLine.length; i++) {
      const char = headerLine[i];
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        headers.push(current.trim().replace(/^"|"$/g, ''));
        current = '';
      } else {
        current += char;
      }
    }
    headers.push(current.trim().replace(/^"|"$/g, ''));

    // Parse each row
    const events: Event[] = [];
    for (let lineIndex = 1; lineIndex < lines.length; lineIndex++) {
      const line = lines[lineIndex].trim();
      if (!line) continue;

      const row = [];
      let current = '';
      let inQuotes = false;
      
      for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
          row.push(current.trim().replace(/^"|"$/g, ''));
          current = '';
        } else {
          current += char;
        }
      }
      row.push(current.trim().replace(/^"|"$/g, ''));

      const event = parseCSVRow(headers, row);
      events.push(event);
    }


    // Events loaded from CSV - no automatic test events added
    return events;
  } catch (error) {
    console.error('Failed to load events from CSV:', error);
    return [];
  }
}