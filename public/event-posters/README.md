# Event Poster Images

This directory stores event poster images in multiple sizes for optimal performance across devices.

## Directory Structure

```
event-posters/
├── full/          # Full resolution images (1200x1200px max)
├── mobile/        # Mobile optimized (800x800px)
├── thumbnail/     # Small thumbnails (400x400px)
└── placeholder.jpg # Default placeholder image
```

## Image Naming Convention

Images should be named using the event ID from the consolidated-events.json file:

```
{event-id}.jpg
{event-id}.png
{event-id}.webp
```

Example: `babson-commons-mixer-2025.jpg`

## Image Requirements

### Dimensions
- **Instagram/Social Media Format**: 1:1 aspect ratio (square)
- **Full Size**: 1200x1200px maximum
- **Mobile**: 800x800px
- **Thumbnail**: 400x400px

### File Formats
- Primary: WebP (best compression)
- Fallback: JPEG (wide compatibility)
- Alternative: PNG (if transparency needed)

### File Size Guidelines
- Full: < 500KB
- Mobile: < 200KB
- Thumbnail: < 50KB

## Adding New Event Posters

1. **Prepare your image**:
   - Design at 1200x1200px or higher
   - Export as JPEG/PNG
   - Optimize for web (use tools like TinyPNG)

2. **Generate multiple sizes**:
   ```bash
   # Using ImageMagick (install with: brew install imagemagick)
   
   # Generate thumbnail
   convert original.jpg -resize 400x400 -quality 85 thumbnail/event-id.jpg
   
   # Generate mobile size
   convert original.jpg -resize 800x800 -quality 90 mobile/event-id.jpg
   
   # Copy full size
   cp original.jpg full/event-id.jpg
   ```

3. **Update event data**:
   - Edit `event-data/consolidated-events.json`
   - Add `posterImage` field with filename (without path)
   - Add `posterImageAlt` for accessibility

## Example Event Entry

```json
{
  "id": "babson-commons-mixer-2025",
  "title": "Babson Commons Mixer",
  "posterImage": "babson-commons-mixer-2025.jpg",
  "posterImageAlt": "Babson Commons Mixer event poster featuring DJ and Chick-fil-A",
  // ... other fields
}
```

## Image Optimization Tools

- **TinyPNG**: https://tinypng.com/
- **Squoosh**: https://squoosh.app/
- **ImageOptim** (Mac): https://imageoptim.com/

## Placeholder Image

If an event doesn't have a poster yet, the system will use `placeholder.jpg` as a fallback.