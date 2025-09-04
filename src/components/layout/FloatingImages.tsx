import { useState, useEffect, useRef } from 'react';
import { communityImages } from '@/data/communityImages';

interface FloatingImage {
  id: string;
  x: number;
  y: number;
  speedX: number;
  speedY: number;
  size: number;
  rotation: number;
  rotationSpeed: number;
  url: string;
  alt: string;
  opacity: number;
  scale: number;
  imageIndex: number; // Index in the full image array
  startTime: number; // When this image started displaying
  transitionState: 'fading-in' | 'visible' | 'fading-out';
}

interface ResponsiveConfig {
  minSize: number;
  maxSize: number;
  smallMinSize: number;
  smallMaxSize: number;
  speedMultiplier: number;
  boundaryInsetRatio: number;
  interactionRadius: number;
}

export const FloatingImages = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [images, setImages] = useState<FloatingImage[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [responsiveConfig, setResponsiveConfig] = useState<ResponsiveConfig>({
    minSize: 200,
    maxSize: 400,
    smallMinSize: 100,
    smallMaxSize: 180,
    speedMultiplier: 1,
    boundaryInsetRatio: 0.075,
    interactionRadius: 200
  });
  const animationFrameRef = useRef<number>();
  const collisionStatesRef = useRef<Map<string, boolean>>(new Map());
  const nextImageIndexRef = useRef<number>(0);
  const currentSetRef = useRef<number>(0);
  const IMAGE_DISPLAY_DURATION = 15000; // 15 seconds per image
  const IMAGE_TRANSITION_INTERVAL = 3750; // New image every 3.75 seconds  
  const FADE_DURATION = 1250; // 1.25 second fade in/out
  const IMAGES_TO_SWAP = 2; // Swap 2 images at a time
  
  // Define 5 different image sets with different starting orders for all 41 images
  const IMAGE_SETS = [
    // Set 1: IMG_5951 (index 19) appears frequently
    Array.from({ length: 41 }, (_, i) => i % 4 === 0 ? 19 : i),
    // Set 2: IMG_5951 at start and every 5th position
    Array.from({ length: 41 }, (_, i) => (i === 0 || i % 5 === 0) ? 19 : 40 - i),
    // Set 3: IMG_5951 heavy rotation - appears every 3rd position
    Array.from({ length: 41 }, (_, i) => i % 3 === 0 ? 19 : (i * 3) % 41),
    // Set 4: IMG_5951 every 4th position with mixed pattern
    Array.from({ length: 41 }, (_, i) => i % 4 === 2 ? 19 : (i * 7) % 41),
    // Set 5: IMG_5951 alternating pattern - very frequent
    Array.from({ length: 41 }, (_, i) => (i % 2 === 0) ? 19 : i % 2 === 0 ? i / 2 : 40 - Math.floor(i / 2))
  ];
  
  // Get responsive configuration based on screen size
  const getResponsiveConfig = (): ResponsiveConfig => {
    const width = window.innerWidth;
    
    if (width < 768) {
      // Mobile: much smaller images, minimal movement
      return {
        minSize: 60,
        maxSize: 100,
        smallMinSize: 40,
        smallMaxSize: 60,
        speedMultiplier: 0.2, // Much slower for performance
        boundaryInsetRatio: 0.15, // More inset to avoid edges
        interactionRadius: 0 // No interaction on mobile
      };
    } else if (width < 1024) {
      // Tablet: medium images
      return {
        minSize: 140,
        maxSize: 220,
        smallMinSize: 80,
        smallMaxSize: 140,
        speedMultiplier: 0.8,
        boundaryInsetRatio: 0.1,
        interactionRadius: 175
      };
    } else {
      // Desktop: current sizes
      return {
        minSize: 200,
        maxSize: 400,
        smallMinSize: 100,
        smallMaxSize: 180,
        speedMultiplier: 1,
        boundaryInsetRatio: 0.075,
        interactionRadius: 200
      };
    }
  };
  
  // Update responsive config and mobile detection on resize
  useEffect(() => {
    const updateConfig = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768 || 'ontouchstart' in window);
      setResponsiveConfig(getResponsiveConfig());
    };
    
    updateConfig(); // Initial config
    window.addEventListener('resize', updateConfig);
    
    return () => window.removeEventListener('resize', updateConfig);
  }, []);

  // Initialize images and handle container resize
  useEffect(() => {
    if (!containerRef.current) return;
    
    const containerRect = containerRef.current.getBoundingClientRect();
    setDimensions({ width: containerRect.width, height: containerRect.height });
    
    // Create initial floating images
    const createInitialImages = () => {
      const numActiveImages = isMobile ? 6 : 8; // Show 6 on mobile, 8 on desktop
      const initialImages: FloatingImage[] = [];
      
      // Select a random image set on each page load
      const randomSetIndex = Math.floor(Math.random() * IMAGE_SETS.length);
      currentSetRef.current = randomSetIndex;
      const selectedSet = IMAGE_SETS[randomSetIndex];
      
      for (let i = 0; i < numActiveImages; i++) {
        // Use the selected set's order, wrapping around if needed
        const setIndex = i % selectedSet.length;
        const imageIndex = selectedSet[setIndex] % communityImages.length;
        const img = communityImages[imageIndex];
        
        const angle = (i / numActiveImages) * Math.PI * 2;
        const radius = Math.min(containerRect.width, containerRect.height) * 0.35;
        const centerX = containerRect.width / 2;
        const centerY = containerRect.height / 2;
        
        // Distribute images in a circle pattern with some randomness
        const randomOffset = Math.min(containerRect.width, containerRect.height) * 0.1;
        const x = centerX + Math.cos(angle) * radius + (Math.random() - 0.5) * randomOffset;
        const y = centerY + Math.sin(angle) * radius + (Math.random() - 0.5) * randomOffset;
        
        // Responsive speed based on screen size
        const baseSpeed = 0.8 * responsiveConfig.speedMultiplier;
        const speedX = (Math.random() - 0.5) * baseSpeed;
        const speedY = (Math.random() - 0.5) * baseSpeed;
        
        // Make IMG_5951 (index 19) appear larger
        const isSpecialImage = imageIndex === 19;
        let imageSize;
        
        if (isSpecialImage) {
          // IMG_5951 is always large, 50% bigger than normal max size
          imageSize = responsiveConfig.maxSize * 1.5;
        } else if (i >= numActiveImages - 3) {
          // Last 3 images are smaller
          imageSize = responsiveConfig.smallMinSize + Math.random() * (responsiveConfig.smallMaxSize - responsiveConfig.smallMinSize);
        } else {
          // Normal size range
          imageSize = responsiveConfig.minSize + Math.random() * (responsiveConfig.maxSize - responsiveConfig.minSize);
        }
        
        initialImages.push({
          id: `${img.id}-${Date.now()}-${i}`, // Unique ID for each instance
          x: x,
          y: y,
          speedX: speedX,
          speedY: speedY,
          size: imageSize,
          rotation: Math.random() * 20 - 10, // Subtle rotation: -10 to 10 degrees
          rotationSpeed: (Math.random() - 0.5) * 0.2, // Very slow rotation for smoothness
          url: img.url,
          alt: img.alt,
          opacity: 1,
          scale: 1,
          imageIndex: imageIndex,
          // Stagger start times based on the set for varied initial appearance
          startTime: Date.now() - (i * IMAGE_TRANSITION_INTERVAL * 0.5) - (randomSetIndex * 1000), 
          transitionState: 'visible' as const
        });
      }
      
      // Set the next image index to continue from the selected set
      nextImageIndexRef.current = numActiveImages % selectedSet.length;
      
      return initialImages;
    };
    
    setImages(createInitialImages());
    
    const handleResize = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setDimensions({ width: rect.width, height: rect.height });
      
      // Don't recreate images on resize, just update their positions
      setTimeout(() => {
        setImages(prev => prev.map(img => {
          // Ensure images stay within new bounds
          const boundaryInset = rect.width * responsiveConfig.boundaryInsetRatio;
          const minX = boundaryInset - img.size / 2;
          const maxX = rect.width - boundaryInset + img.size / 2;
          const minY = boundaryInset - img.size / 2;
          const maxY = rect.height - boundaryInset + img.size / 2;
          
          return {
            ...img,
            x: Math.max(minX, Math.min(img.x, maxX)),
            y: Math.max(minY, Math.min(img.y, maxY))
          };
        }));
      }, 100);
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [responsiveConfig, isMobile]);
  
  // Add mouse movement tracking (desktop only)
  useEffect(() => {
    if (isMobile) return; // Skip mouse tracking on mobile
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isMobile]);
  
  // Image cycling effect - swap 2 images at a time
  useEffect(() => {
    if (images.length === 0 || dimensions.width === 0) return;
    
    const interval = setInterval(() => {
      const currentTime = Date.now();
      
      setImages(prevImages => {
        let newImages = [...prevImages];
        let imagesMarkedForRemoval = 0;
        let imagesToRemove: number[] = [];
        
        // First pass: identify images to fade out and remove
        newImages = newImages.map((img, index) => {
          const timeAlive = currentTime - img.startTime;
          
          // Start fading out after IMAGE_DISPLAY_DURATION
          if (timeAlive > IMAGE_DISPLAY_DURATION && img.transitionState === 'visible' && imagesMarkedForRemoval < IMAGES_TO_SWAP) {
            imagesMarkedForRemoval++;
            return { ...img, transitionState: 'fading-out' as const };
          }
          
          // Mark image for removal after fade out completes
          if (timeAlive > IMAGE_DISPLAY_DURATION + FADE_DURATION && img.transitionState === 'fading-out') {
            imagesToRemove.push(index);
            return null;
          }
          
          // Complete fade in
          if (timeAlive > FADE_DURATION && img.transitionState === 'fading-in') {
            return { ...img, transitionState: 'visible' as const };
          }
          
          return img;
        }).filter(img => img !== null) as FloatingImage[];
        
        // Add new images if we removed any
        const numActiveImages = isMobile ? 6 : 8;
        const imagesToAdd = Math.min(IMAGES_TO_SWAP, numActiveImages - newImages.length);
        
        if (imagesToAdd > 0) {
          // Get the current image set
          const selectedSet = IMAGE_SETS[currentSetRef.current];
          
          // Add multiple new images
          for (let i = 0; i < imagesToAdd; i++) {
            // Get next image from the selected set
            const setIndex = nextImageIndexRef.current;
            const imageIndex = selectedSet[setIndex] % communityImages.length;
            const newImg = communityImages[imageIndex];
            
            // Find a good spawn position (away from other images)
            let bestX = dimensions.width / 2;
            let bestY = dimensions.height / 2;
            let maxMinDistance = 0;
            
            // Try multiple random positions and pick the one furthest from existing images
            for (let attempt = 0; attempt < 10; attempt++) {
              const testX = Math.random() * dimensions.width * 0.8 + dimensions.width * 0.1;
              const testY = Math.random() * dimensions.height * 0.8 + dimensions.height * 0.1;
              
              let minDistance = Infinity;
              newImages.forEach(existingImg => {
                const dx = existingImg.x - testX;
                const dy = existingImg.y - testY;
                const distance = Math.sqrt(dx * dx + dy * dy);
                minDistance = Math.min(minDistance, distance);
              });
              
              if (minDistance > maxMinDistance) {
                maxMinDistance = minDistance;
                bestX = testX;
                bestY = testY;
              }
            }
            
            const baseSpeed = 0.8 * responsiveConfig.speedMultiplier;
            
            // Make IMG_5951 (index 19) appear larger when cycling
            const isSpecialImage = imageIndex === 19;
            let imageSize;
            
            if (isSpecialImage) {
              // IMG_5951 is always large, 50% bigger than normal max size
              imageSize = responsiveConfig.maxSize * 1.5;
            } else if (Math.random() < 0.3) {
              // 30% chance for small images
              imageSize = responsiveConfig.smallMinSize + Math.random() * (responsiveConfig.smallMaxSize - responsiveConfig.smallMinSize);
            } else {
              // Normal size range
              imageSize = responsiveConfig.minSize + Math.random() * (responsiveConfig.maxSize - responsiveConfig.minSize);
            }
            
            newImages.push({
              id: `${newImg.id}-${currentTime}-${i}`,
              x: bestX,
              y: bestY,
              speedX: (Math.random() - 0.5) * baseSpeed,
              speedY: (Math.random() - 0.5) * baseSpeed,
              size: imageSize,
              rotation: Math.random() * 20 - 10,
              rotationSpeed: (Math.random() - 0.5) * 0.2,
              url: newImg.url,
              alt: newImg.alt,
              opacity: 0, // Start invisible
              scale: 1,
              imageIndex: imageIndex,
              startTime: currentTime + (i * 500), // Stagger the new images slightly
              transitionState: 'fading-in' as const
            });
            
            // Move to next image in the set
            nextImageIndexRef.current = (setIndex + 1) % selectedSet.length;
          }
        }
        
        return newImages;
      });
    }, 500); // Check every 500ms
    
    return () => clearInterval(interval);
  }, [dimensions, isMobile, responsiveConfig]);
  
  useEffect(() => {
    if (images.length === 0 || dimensions.width === 0) return;
    
    let lastTime = 0;
    const targetFPS = 60;
    const frameInterval = 1000 / targetFPS;
    
    const animate = (currentTime: number) => {
      // Limit to 60 FPS for consistent smooth animation
      if (currentTime - lastTime < frameInterval) {
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }
      lastTime = currentTime;
      setImages(prevImages => 
        prevImages.map((img, index) => {
          let newX = img.x + img.speedX;
          let newY = img.y + img.speedY;
          let newSpeedX = img.speedX;
          let newSpeedY = img.speedY;
          
          // Mouse interaction - repel images away from cursor (desktop only)
          if (!isMobile && responsiveConfig.interactionRadius > 0) {
            const dx = mousePosition.x - img.x;
            const dy = mousePosition.y - img.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            const interactionRadius = responsiveConfig.interactionRadius;
            if (distance < interactionRadius && distance > 0) {
              const force = (1 - distance / interactionRadius) * 3; // Stronger force
              newSpeedX -= (dx / distance) * force;
              newSpeedY -= (dy / distance) * force;
            }
          }
          
          // Gentle bounce off edges - responsive boundary insets
          const boundaryInset = dimensions.width * responsiveConfig.boundaryInsetRatio;
          const minX = boundaryInset - img.size / 2;
          const maxX = dimensions.width - boundaryInset + img.size / 2;
          const minY = boundaryInset - img.size / 2;
          const maxY = dimensions.height - boundaryInset + img.size / 2;
          
          if (newX < minX || newX > maxX) {
            newSpeedX = -newSpeedX * 0.8;
            newX = Math.max(minX, Math.min(newX, maxX));
          }
          
          if (newY < minY || newY > maxY) {
            newSpeedY = -newSpeedY * 0.8;
            newY = Math.max(minY, Math.min(newY, maxY));
          }
          
          // Apply stronger drag
          const drag = 0.98;
          newSpeedX *= drag;
          newSpeedY *= drag;
          
          // Add subtle random movement
          if (Math.random() < 0.02) { // 2% chance each frame
            newSpeedX += (Math.random() - 0.5) * 0.5;
            newSpeedY += (Math.random() - 0.5) * 0.5;
          }
          
          // Check collisions with other images (desktop only for performance)
          if (!isMobile) {
            prevImages.forEach((otherImg, otherIndex) => {
              if (index === otherIndex) return;
              
              const dx2 = otherImg.x - newX;
              const dy2 = otherImg.y - newY;
              const distance2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
              const minDistance = (img.size + otherImg.size) / 2;
              
              if (distance2 < minDistance && distance2 > 0) {
                const collisionKey = `${Math.min(index, otherIndex)}-${Math.max(index, otherIndex)}`;
                
                // 50% chance to bounce, 50% chance to pass through
                if (!collisionStatesRef.current.has(collisionKey)) {
                  collisionStatesRef.current.set(collisionKey, Math.random() < 0.5);
                }
                
                if (collisionStatesRef.current.get(collisionKey)) {
                  // Bounce off each other
                  const overlap = minDistance - distance2;
                  const pushX = (dx2 / distance2) * overlap * 0.5;
                  const pushY = (dy2 / distance2) * overlap * 0.5;
                  
                  newX -= pushX;
                  newY -= pushY;
                  
                  // Exchange velocities (elastic collision)
                  const relativeVx = img.speedX - otherImg.speedX;
                  const relativeVy = img.speedY - otherImg.speedY;
                  const dotProduct = (relativeVx * dx2 + relativeVy * dy2) / (distance2 * distance2);
                  
                  newSpeedX -= dotProduct * dx2 * 0.8;
                  newSpeedY -= dotProduct * dy2 * 0.8;
                }
              } else if (distance2 > minDistance * 1.5) {
                // Reset collision state when images are far apart
                const collisionKey = `${Math.min(index, otherIndex)}-${Math.max(index, otherIndex)}`;
                collisionStatesRef.current.delete(collisionKey);
              }
            });
          }
          
          // Ensure minimum speed
          const minSpeed = 0.2;
          const currentSpeed = Math.sqrt(newSpeedX * newSpeedX + newSpeedY * newSpeedY);
          if (currentSpeed < minSpeed) {
            const boost = minSpeed / currentSpeed;
            newSpeedX *= boost;
            newSpeedY *= boost;
          }
          
          // Update rotation based on movement - smoother for mobile
          const rotationDelta = responsiveConfig.speedMultiplier < 0.8 ? 0.05 : 0.1;
          const newRotation = img.rotation + img.rotationSpeed + (newSpeedX * rotationDelta);
          
          // Gentle pulsing scale effect - disabled on mobile to reduce jitter
          const newScale = responsiveConfig.speedMultiplier < 0.8 ? 1 : (1 + Math.sin((Date.now() / 1000 + index) * 0.2) * 0.03); // 97% to 103% scale on desktop only
          
          // Calculate opacity based on transition state
          let newOpacity = img.opacity;
          const timeAlive = Date.now() - img.startTime;
          
          if (img.transitionState === 'fading-in') {
            newOpacity = Math.min(1, timeAlive / FADE_DURATION);
          } else if (img.transitionState === 'fading-out') {
            const fadeOutTime = timeAlive - IMAGE_DISPLAY_DURATION;
            newOpacity = Math.max(0, 1 - (fadeOutTime / FADE_DURATION));
          } else {
            newOpacity = 1;
          }
          
          return {
            ...img,
            x: newX,
            y: newY,
            speedX: newSpeedX,
            speedY: newSpeedY,
            rotation: newRotation,
            scale: newScale,
            opacity: newOpacity
          };
        })
      );
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    animationFrameRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [images, dimensions, mousePosition, responsiveConfig, isMobile]);
  
  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 overflow-hidden z-0 pointer-events-none"
      style={{
        // Ensure container doesn't interfere with content on small screens
        minHeight: isMobile ? '50vh' : '100vh',
        // Prevent any touch interactions on mobile
        touchAction: 'none',
        userSelect: 'none',
        WebkitUserSelect: 'none'
      }}
    >
      {/* Gradient mask for transparent pass-through effect - only behind main content */}
      <div 
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: `
            radial-gradient(
              ellipse at center,
              transparent 0%,
              transparent 40%,
              rgba(10, 87, 65, 0.2) 50%,
              rgba(10, 87, 65, 0.4) 60%,
              rgba(10, 87, 65, 0.6) 70%,
              rgba(10, 87, 65, 0.8) 90%
            )
          `,
        }}
      />
      
      {/* Floating images */}
      {images.map((img) => (
        <div
          key={img.id}
          className="absolute"
          style={{
            left: `${img.x}px`,
            top: `${img.y}px`,
            width: `${img.size}px`,
            height: `${img.size}px`,
            transform: `translate3d(-50%, -50%, 0) rotate(${img.rotation}deg) scale(${img.scale})`,
            opacity: img.opacity,
            // No transition for smoother continuous animation
            filter: 'none', // Remove any filters that might cause fading
            willChange: 'transform', // Optimize for animations
            // Force GPU acceleration for smoother rotation
            backfaceVisibility: 'hidden',
            perspective: 1000,
            transformStyle: 'preserve-3d'
          }}
        >
          <img
            src={img.url}
            alt={img.alt}
            className="w-full h-full object-cover rounded-xl shadow-2xl"
            loading="lazy"
            style={{
              // Responsive image optimizations
              maxWidth: '100%',
              height: 'auto',
              objectFit: 'cover' as const,
              borderRadius: responsiveConfig.speedMultiplier < 0.8 ? '8px' : '12px',
              boxShadow: responsiveConfig.speedMultiplier < 0.8 
                ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' 
                : '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
            }}
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        </div>
      ))}
    </div>
  );
};