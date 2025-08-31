# Event Data Management

## 📝 How to Update Events

The Generator Student Calendar uses a single JSON file as the source of truth for all event data.

### Quick Start

1. **Edit the JSON file**: Open `consolidated-events.json` in this folder
2. **Save your changes**: The website will automatically use the updated data
3. **Test locally**: Run `npm run dev` to see your changes

## 📊 JSON Structure

The `consolidated-events.json` file contains:

```json
{
  "metadata": {
    "lastUpdated": "2025-08-30T21:30:00Z",
    "version": "1.0.0"
  },
  "currentEvents": [
    // Upcoming events go here
  ],
  "pastEvents": [
    // Historical events go here
  ],
  "eventTypes": [...],
  "audiences": [...]
}
```

### Event Object Structure

Each event must follow this format:

```json
{
  "id": "unique-event-id",
  "title": "Event Title",
  "description": "Full event description...",
  "date": "2025-09-04",  // YYYY-MM-DD format
  "time": "3:00 PM - 6:00 PM",
  "location": "Babson Commons",
  "eventType": "Major Event",
  "audience": ["Freshman", "New Students"],
  "registrationUrl": "https://...",  // Optional
  "speakerName": "Speaker Name",     // Optional
  "speakerTitle": "Speaker Title",   // Optional
  "contactName": "Contact Person",   // Optional
  "contactEmail": "email@babson.edu", // Optional
  "isPastEvent": false,              // Set to true for past events
  "food": "Free pizza",              // Optional
  "prize": "Raffle prizes",          // Optional
  "shortBlurb": "Brief description", // Optional
  "posterImage": "event-id.jpg",     // Optional - poster filename
  "posterImageAlt": "Alt text"       // Optional - for accessibility
}
```

## 💡 Tips for Managing Events

### Adding a New Event
1. Add the event object to the `currentEvents` array
2. Use a unique ID (e.g., "event-name-2025")
3. Ensure the date is in YYYY-MM-DD format
4. Set `isPastEvent: false` for upcoming events

### Moving Events to Past
1. Move the event object from `currentEvents` to `pastEvents`
2. Set `isPastEvent: true`
3. Keep events organized by date (newest first)

### Event Types
Use one of these predefined event types:
- Workshop
- Talk
- Buildathon
- Speaker Series
- Major Event
- Regular Event
- Weekly Event
- Roundtable
- Gallery Opening
- Exhibition
- Hackathon
- Open House
- Competition
- Mixer
- Showcase
- Meeting
- Performance
- Symposium
- Special Event

### Audiences
Use one or more of these audience types:
- Babson Students
- Freshman
- New Students
- Generator Team
- Babson Faculty
- Faculty
- Everyone
- Greater Boston
- Small Business Owners
- Explorers (Generator)

## 🔧 Advanced Management

### Validating Your Changes
Before committing changes, ensure:
- All dates are in YYYY-MM-DD format
- Each event has a unique ID
- Required fields are present (title, date, time, location, eventType, audience)
- The JSON is valid (use a JSON validator)

### Archival Note
Previous event data files have been moved to the `archive/` folder for reference. The consolidated JSON is now the single source of truth.

## 📂 File Structure

```
event-data/
├── consolidated-events.json  # Main event data file (edit this!)
├── README.md                # This documentation
├── README-IMAGES.md         # Image management guide
└── archive/                 # Old data files (for reference only)
```

## 🖼️ Event Posters

### Adding Event Posters

1. **Prepare your poster image**:
   - Design at 1200x1200px (Instagram square format)
   - Save as JPG or PNG
   - Name it using the event ID: `event-id.jpg`

2. **Add images to the project**:
   - Place the full-size image in `public/event-posters/full/`
   - Create smaller versions:
     - Mobile (800x800px) in `public/event-posters/mobile/`
     - Thumbnail (400x400px) in `public/event-posters/thumbnail/`

3. **Update the event data**:
   ```json
   {
     "id": "babson-commons-mixer-2025",
     "posterImage": "babson-commons-mixer-2025.jpg",
     "posterImageAlt": "Mixer event poster with DJ and food",
     // ... other fields
   }
   ```

### Image Optimization Tools
- [TinyPNG](https://tinypng.com/) - Compress images
- [Squoosh](https://squoosh.app/) - Advanced optimization
- ImageMagick - Command line resizing:
  ```bash
  # Create mobile version
  convert original.jpg -resize 800x800 -quality 90 mobile/event-id.jpg
  
  # Create thumbnail
  convert original.jpg -resize 400x400 -quality 85 thumbnail/event-id.jpg
  ```

## 📅 Calendar Integration

### How It Works

Each event automatically gets:
- **Add to Calendar** button in the event details modal
- Support for Google Calendar, Outlook, and Yahoo
- Downloadable .ics file for any calendar app
- Automatic timezone handling (Eastern Time)

### Calendar Features
- One-click calendar invites
- Rich event details in calendar entries
- 15-minute default reminder
- Food and prize info included in description

## 🚀 Best Practices

1. **Regular Updates**: Keep events current by moving past events regularly
2. **Consistent Formatting**: Follow the exact structure for each event
3. **Image Optimization**: Keep poster files under 500KB for fast loading
4. **Test Calendar Links**: Verify calendar integration after adding events
5. **Backup Before Major Changes**: Save a copy before making extensive edits
6. **Test Locally**: Always test your changes with `npm run dev`
7. **Use Version Control**: Commit your changes with descriptive messages

## Need Help?

Contact the Generator team at generator@babson.edu for assistance with event management.