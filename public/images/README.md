# Generator Student Calendar - Image Organization

This directory contains organized images for the Generator Student Calendar application.

## Directory Structure

```
public/images/
├── community/     - Community photos, group activities, team collaboration images
├── events/        - Event-specific photos from Generator events
├── logos/         - The Generator logo and other branding materials  
├── misc/          - Other miscellaneous images (backgrounds, icons, etc.)
└── README.md      - This file
```

## Photo Upload Process

### Adding New Images

1. **Event Photos**: Place event photos in `events/` directory
2. **Community Photos**: Place community and collaboration photos in `community/` directory  
3. **Logos/Branding**: Place logos and branding materials in `logos/` directory
4. **Other Images**: Place miscellaneous images in `misc/` directory

### File Naming Conventions

- Use descriptive, lowercase filenames with hyphens instead of spaces
- Examples: `generator-logo.png`, `demo-day-2025.jpg`, `ai-workshop-march.png`
- Avoid special characters and spaces in filenames

### Image Optimization

Before adding images to the project:

1. **Compress Images**: Use tools like TinyPNG or ImageOptim to reduce file sizes
2. **Appropriate Dimensions**: 
   - Event photos: Max width 1200px
   - Community photos: Max width 800px  
   - Logos: Use SVG when possible, PNG for complex logos
3. **Format Guidelines**:
   - Use JPEG for photos with many colors
   - Use PNG for images with transparency or few colors
   - Use SVG for logos and simple graphics when possible

### Updating Code References

When adding new images, update the corresponding data files:

1. **Community Images**: Update `/src/data/communityImages.ts`
2. **Event Images**: Add to appropriate event data in `/src/data/events.ts`
3. **Logo Changes**: Update references in Header.tsx and Footer.tsx components

### Example Usage

```typescript
// In communityImages.ts
{
  id: 'unique-id',
  url: '/images/events/my-new-event-photo.jpg',
  alt: 'Descriptive alt text for accessibility',
  category: 'event'
}
```

### Image Path Format

All images should be referenced using paths starting with `/images/`:

- `/images/logos/generator-logo.png`
- `/images/events/demo-day-2025.jpg`
- `/images/community/team-collaboration.jpg`
- `/images/misc/background-pattern.svg`

### Accessibility

Always provide descriptive alt text for images to ensure accessibility for screen readers and other assistive technologies.

---

For questions about image management, contact the development team or refer to the project documentation.