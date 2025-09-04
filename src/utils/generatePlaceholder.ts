/**
 * Generates a simple placeholder image for events without posters
 * This creates a canvas-based placeholder with The Generator branding
 */
export function generatePlaceholderDataURL(width: number = 400, height: number = 400): string {
  // Create canvas
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  
  if (!ctx) return '';
  
  // Background gradient
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, '#2D5A2D'); // generator-darkGreen
  gradient.addColorStop(1, '#3B7F3C'); // generator-green
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
  
  // Add pattern overlay
  ctx.globalAlpha = 0.1;
  for (let i = 0; i < width; i += 40) {
    for (let j = 0; j < height; j += 40) {
      ctx.beginPath();
      ctx.arc(i + 20, j + 20, 15, 0, Math.PI * 2);
      ctx.fillStyle = '#FFD700'; // generator-gold
      ctx.fill();
    }
  }
  ctx.globalAlpha = 1;
  
  // Center text
  ctx.fillStyle = '#FFFFFF';
  ctx.font = `bold ${width / 10}px Arial`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('THE GENERATOR', width / 2, height / 2 - height / 10);
  
  ctx.font = `${width / 20}px Arial`;
  ctx.fillText('Event Poster Coming Soon', width / 2, height / 2 + height / 15);
  
  // Convert to data URL
  return canvas.toDataURL('image/jpeg', 0.9);
}

/**
 * Gets the image URL for an event poster with fallback
 */
export function getEventPosterUrl(
  posterImage: string | undefined,
  size: 'thumbnail' | 'mobile' | 'full' = 'mobile'
): string {
  if (!posterImage) {
    return '/event-posters/placeholder.jpg';
  }
  
  // Check if it's already a full URL
  if (posterImage.startsWith('http')) {
    return posterImage;
  }
  
  // For now, return the image from the root event-posters directory
  // In the future, we can add logic to check if size-specific versions exist
  return `/event-posters/${posterImage}`;
}

/**
 * Generates srcset for responsive images
 */
export function generatePosterSrcSet(posterImage: string | undefined): string {
  if (!posterImage || posterImage.startsWith('http')) {
    return '';
  }
  
  // For now, just return the single image since we don't have size variants
  // In the future, we can generate different sizes
  return `/event-posters/${posterImage} 800w`;
}