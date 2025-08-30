# CRITICAL: Calendar Glass Blur Protection

## ⚠️ DO NOT MODIFY WITHOUT READING THIS FIRST ⚠️

The calendar glass blur effect is implemented using a **SPECIFIC LAYERED APPROACH** that must be preserved.

## Current Implementation (DO NOT CHANGE)

```jsx
<div className="relative">
  {/* Backdrop blur layer - THIS IS CRITICAL */}
  <div 
    className="absolute inset-0 rounded-xl"
    style={{
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      zIndex: 0,
    }}
  />
  
  {/* Content layer */}
  <div className="relative rounded-xl p-3 sm:p-6 shadow-xl" style={{ zIndex: 1 }}>
    {/* Calendar content */}
  </div>
</div>
```

## Why This Approach?

1. **Separate Blur Layer**: The blur is on its own div, not mixed with content styles
2. **Explicit Z-Index**: Ensures proper layering that can't be overridden
3. **Inline Styles**: Prevents CSS processing from stripping the effect
4. **Webkit Support**: Ensures Safari/iOS compatibility

## RULES TO FOLLOW

### ✅ DO:
- Keep the two-div structure (wrapper + blur layer + content layer)
- Maintain ALL inline styles exactly as shown
- Keep the z-index values (0 for blur, 1 for content)
- Preserve the absolute/relative positioning

### ❌ DO NOT:
- Combine the blur layer with the content layer
- Remove or modify the inline styles
- Change the div structure
- Add backdrop-filter to the content div
- Remove the WebkitBackdropFilter property

## CSS Backup Protection

The following CSS in `/src/index.css` provides additional protection:

```css
/* Force backdrop blur on calendar with high specificity */
[style*="backdrop-filter"],
[style*="backdropFilter"] {
  backdrop-filter: blur(12px) !important;
  -webkit-backdrop-filter: blur(12px) !important;
}
```

## Testing Checklist

Before committing ANY changes to CalendarMiniView.tsx:

- [ ] Verify blur shows in development mode
- [ ] Run `npm run build` and check production build
- [ ] Test in Chrome
- [ ] Test in Safari
- [ ] Check on mobile devices
- [ ] Ensure the two-div structure is intact

## If Blur Stops Working

1. Check if the two-div structure is still there
2. Verify inline styles haven't been removed
3. Ensure z-index values are correct
4. Check that the blur div has `absolute inset-0`
5. Confirm the wrapper has `relative` positioning

## Emergency Fix

If all else fails, copy this exact structure back:

```jsx
<div className="relative">
  <div 
    className="absolute inset-0 rounded-xl"
    style={{
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      zIndex: 0,
    }}
  />
  <div className="relative rounded-xl p-3 sm:p-6 shadow-xl" style={{ zIndex: 1 }}>
    {/* Your content here */}
  </div>
</div>
```

---

**LAST WORKING COMMIT**: Document the commit hash here when blur is confirmed working
**MAINTAINED BY**: This is critical UI functionality - do not modify without team approval