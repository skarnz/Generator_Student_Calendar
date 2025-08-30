# Glass Blur Effect Persistence Guide

## Critical Information
The glass blur effects in this project use a multi-layered approach to ensure persistence across builds, browsers, and CSS processing pipelines.

## Implementation Strategy

### 1. CSS Classes (Primary Method)
We define glass blur classes in `/src/index.css`:
```css
.glass-blur {
  background-color: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
}

.glass-blur-strong {
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}
```

### 2. Inline Styles (Fallback)
Each component also includes inline styles as a fallback:
```jsx
style={{
  backgroundColor: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(4px)',
  WebkitBackdropFilter: 'blur(4px)',
}}
```

### 3. Current Usage

#### Hero Component (`/src/components/layout/Hero.tsx`)
- Uses `.glass-blur` class
- 5% white opacity, 4px blur
- Applied to title/subtitle background

#### Calendar Component (`/src/components/calendar/CalendarMiniView.tsx`)
- Uses `.glass-blur-strong` class
- 10% white opacity, 12px blur
- Applied to calendar container and expanded sections

## Why This Approach?

1. **Build Process Resilience**: CSS classes with @supports ensure the styles aren't stripped during minification
2. **Browser Compatibility**: -webkit prefix ensures Safari/iOS support
3. **Fallback Safety**: Inline styles provide a backup if CSS processing fails
4. **Vendor Prefix**: Both standard and -webkit properties ensure cross-browser support

## Common Issues & Solutions

### Issue: Glass blur disappears after build
**Cause**: CSS minification stripping backdrop-filter properties
**Solution**: Use both CSS classes AND inline styles

### Issue: Blur not working on Safari/iOS
**Cause**: Missing -webkit-backdrop-filter
**Solution**: Always include WebkitBackdropFilter in inline styles

### Issue: Parent-child backdrop conflicts
**Cause**: Nested backdrop-filter elements can cancel each other
**Solution**: Apply backdrop-filter to only one level in the DOM hierarchy

## Testing Checklist
- [ ] Test in development mode
- [ ] Test after production build
- [ ] Test in Chrome
- [ ] Test in Safari
- [ ] Test on iOS devices
- [ ] Test with CSS minification enabled

## DO NOT MODIFY
The current implementation has been carefully crafted to work across all scenarios. Any changes should maintain both the CSS class AND inline style approach.