# CALENDAR INTEGRATION - DO NOT MODIFY

## ⚠️ CRITICAL: DO NOT CHANGE THESE WORKING IMPLEMENTATIONS

### ✅ GOOGLE CALENDAR (WORKING PERFECTLY - DO NOT MODIFY)

The Google Calendar integration in `/src/services/calendarService.ts` lines 211-218 is working perfectly:

```typescript
// Google Calendar
const googleUrl = new URL('https://calendar.google.com/calendar/render');
googleUrl.searchParams.set('action', 'TEMPLATE');
googleUrl.searchParams.set('text', `Generator: ${event.title}`);
googleUrl.searchParams.set('dates', `${startStr}/${endStr}`);
googleUrl.searchParams.set('details', formatEventDescription(event));
googleUrl.searchParams.set('location', event.location);
googleUrl.searchParams.set('ctz', TIMEZONE);
```

And in `/src/components/ui/AddToCalendarButton.tsx` lines 42-45:
```typescript
const handleGoogleCalendar = () => {
  window.open(calendarLinks.google, '_blank');
  setIsOpen(false);
};
```

### ✅ OUTLOOK CALENDAR (WORKING PERFECTLY - DO NOT MODIFY)

The Outlook Calendar integration in `/src/services/calendarService.ts` lines 220-226 is working perfectly:

```typescript
// Outlook Web
const outlookUrl = new URL('https://outlook.live.com/calendar/0/deeplink/compose');
outlookUrl.searchParams.set('subject', `Generator: ${event.title}`);
outlookUrl.searchParams.set('body', formatEventDescription(event));
outlookUrl.searchParams.set('location', event.location);
outlookUrl.searchParams.set('startdt', startStr);
outlookUrl.searchParams.set('enddt', endStr);
```

And in `/src/components/ui/AddToCalendarButton.tsx` lines 47-50:
```typescript
const handleOutlookCalendar = () => {
  window.open(calendarLinks.outlook, '_blank');
  setIsOpen(false);
};
```

## 🚫 DO NOT MODIFY THE ABOVE CODE

The Google Calendar and Outlook Calendar implementations are working beautifully and should not be changed. Only Apple Calendar/ICS file generation needs fixes.

## Note for future developers:
- Google Calendar: Opens directly in browser with all event details pre-filled
- Outlook Calendar: Opens Outlook web app with all event details pre-filled
- Both include "Generator: " prefix in event titles as required
- Both work seamlessly with one-click functionality

Last verified working: September 2024