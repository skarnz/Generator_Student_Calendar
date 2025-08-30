import consolidatedEventsData from '../../event-data/consolidated-events.json';

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  eventType: string;
  audience: string[]; // Students, Associates, Everyone
  registrationUrl?: string;
  speakerName?: string;
  speakerTitle?: string;
  contactName?: string;
  contactEmail?: string;
  isPastEvent?: boolean;
  food?: string;
  prize?: string;
  shortBlurb?: string;
}

// Load events from consolidated JSON file - single source of truth!
function loadEventsFromJSON(): Event[] {
  return consolidatedEventsData.currentEvents as Event[];
}

// Load past events from consolidated JSON file
function loadPastEventsFromJSON(): Event[] {
  return consolidatedEventsData.pastEvents as Event[];
}

// Combine current and past events
export let events: Event[] = [...loadEventsFromJSON(), ...loadPastEventsFromJSON()];

// Export event types and audiences from consolidated JSON file
export const eventTypes = consolidatedEventsData.eventTypes;
export const audiences = consolidatedEventsData.audiences;

// Export the load functions for potential future use
export { loadPastEventsFromJSON as loadPastEventsFromMarkdown };