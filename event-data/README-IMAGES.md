# Image Loading System Guide

This guide explains how to add and manage images in the Generator Student Calendar, specifically for the floating images background feature.

## How Images Currently Work

The floating images system displays community photos as animated background elements that float around the screen. These images show Generator events, workshops, and community activities.

### Current Image Sources

1. **Local Images**: Stored in `/public/lovable-uploads/` folder
   - Generator logo: `0ae39654-597b-4a29-9627-34589cc78afe.png`
   - Generator event photo: `bb1515d1-8646-4719-9d4f-a615463b3467.png`

2. **Placeholder Images**: External Unsplash photos (temporary)
   - Used for workshop, buildathon, and event categories
   - These should be replaced with real Generator photos

## Where to Place New Images

### Step 1: Add Image Files
Place your new images in the `/public/lovable-uploads/` folder:

```
/public/lovable-uploads/
├── your-event-photo-1.jpg
├── your-event-photo-2.png
├── workshop-session.jpg
└── community-gathering.png
```

### Step 2: Update the Image Registry
Edit `/src/data/communityImages.ts` to add your new images:

```typescript
export const communityImages: CommunityImage[] = [
  // Add new images like this:
  {
    id: 'unique-id-12',
    url: '/lovable-uploads/your-event-photo-1.jpg',
    alt: 'Description of your event photo',
    category: 'event' // or 'community', 'workshop', 'buildathon'
  },
  // ... existing images
];
```

## Supported Formats and Recommended Sizes

### File Formats
✅ **Supported**: JPG, PNG, WebP  
❌ **Not recommended**: GIF, SVG, BMP

### Image Dimensions
- **Recommended size**: 600px × 400px (3:2 aspect ratio)
- **Minimum size**: 400px × 300px
- **Maximum size**: 1200px × 800px

### File Size Guidelines
- **Target**: 50-200 KB per image
- **Maximum**: 500 KB per image
- Use image compression tools before uploading

## How to Add New Floating Images

### Complete Process:

1. **Prepare Your Image**
   - Resize to 600×400 pixels
   - Compress to under 200 KB
   - Save as JPG or PNG

2. **Upload the File**
   - Copy your image to `/public/lovable-uploads/`
   - Use a descriptive filename: `generator-workshop-march-2025.jpg`

3. **Register the Image**
   - Open `/src/data/communityImages.ts`
   - Add a new entry to the `communityImages` array:

```typescript
{
  id: 'workshop-march-2025',
  url: '/lovable-uploads/generator-workshop-march-2025.jpg',
  alt: 'Students working on AI projects at March workshop',
  category: 'workshop'
}
```

4. **Choose the Right Category**
   - `'event'`: General events, networking, presentations
   - `'workshop'`: Hands-on learning sessions
   - `'buildathon'`: Hackathons and building competitions
   - `'community'`: Social gatherings, casual meetups

### Image Behavior
- **Large images**: First 8 images display at 200-400px size
- **Small images**: Last 3 images display at 100-180px size
- **Animation**: Images float, rotate slightly, and respond to mouse interaction
- **Visibility**: Full opacity, no fading or transparency

## Performance Considerations

### Loading Optimization
- Images use `loading="lazy"` for better performance
- Failed images are automatically hidden
- Images are compressed and cached by the browser

### Best Practices
- **Compress images** before uploading (use tools like TinyPNG)
- **Use appropriate dimensions** to avoid browser scaling
- **Limit total number** - aim for 8-12 floating images maximum
- **Test on mobile** - ensure images don't overwhelm small screens

### File Organization
Keep images organized by event type:
```
/public/lovable-uploads/
├── events/
│   ├── demo-day-2025.jpg
│   └── networking-feb.jpg
├── workshops/
│   ├── ai-workshop-jan.jpg
│   └── web-dev-session.jpg
└── community/
    ├── generator-logo.png
    └── team-photo.jpg
```

## Vercel Deployment Requirements

### Static Assets
- All images in `/public/` folder are automatically served
- No additional configuration needed for Vercel
- Images are accessible at `/lovable-uploads/filename.jpg`

### Build Optimization
- Vite automatically optimizes images during build
- No special plugins required
- Images are included in the static asset output

### CDN Benefits
- Vercel serves images through their global CDN
- Automatic compression and optimization
- Fast loading worldwide

## Troubleshooting

### Image Not Showing?
1. Check the file path in `communityImages.ts`
2. Ensure the image exists in `/public/lovable-uploads/`
3. Verify the filename matches exactly (case-sensitive)
4. Check browser console for 404 errors

### Image Too Large/Small?
1. Adjust the image dimensions before upload
2. The system will scale images, but original size affects quality
3. Use image compression tools to reduce file size

### Animation Issues?
- Images with transparent backgrounds work best
- Very small images (under 100px) may not be visible enough
- Square images work better than extremely wide/tall images

## Quick Checklist

Before adding new images:
- [ ] Image is 600×400 pixels or similar 3:2 ratio
- [ ] File size is under 200 KB
- [ ] Saved in `/public/lovable-uploads/` folder
- [ ] Added entry to `communityImages.ts`
- [ ] Used descriptive `alt` text
- [ ] Selected appropriate category
- [ ] Tested locally before deploying

## Need Help?

If you encounter issues:
1. Check the browser console for error messages
2. Verify all file paths are correct
3. Ensure images are properly compressed
4. Test with a simple 600×400 PNG first

The floating images system is designed to be simple and robust - just add your files and update the registry!