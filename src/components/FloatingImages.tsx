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
}

export const FloatingImages = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [images, setImages] = useState<FloatingImage[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const animationFrameRef = useRef<number>();
  const collisionStatesRef = useRef<Map<string, boolean>>(new Map());
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const containerRect = containerRef.current.getBoundingClientRect();
    setDimensions({ width: containerRect.width, height: containerRect.height });
    
    // Create floating images with larger sizes and better distribution
    const initialImages = communityImages.map((img, index) => {
      const angle = (index / communityImages.length) * Math.PI * 2;
      const radius = Math.min(containerRect.width, containerRect.height) * 0.35;
      const centerX = containerRect.width / 2;
      const centerY = containerRect.height / 2;
      
      // Distribute images in a circle pattern with some randomness
      const x = centerX + Math.cos(angle) * radius + (Math.random() - 0.5) * 100;
      const y = centerY + Math.sin(angle) * radius + (Math.random() - 0.5) * 100;
      
      // Slower, more gentle movement for larger images
      const speedX = (Math.random() - 0.5) * 0.8;
      const speedY = (Math.random() - 0.5) * 0.8;
      
      return {
        id: img.id,
        x: x,
        y: y,
        speedX: speedX,
        speedY: speedY,
        // Mix of sizes - last 3 images are smaller
        size: index >= communityImages.length - 3 
          ? 100 + Math.random() * 80  // Small: 100-180px for last 3 images
          : 200 + Math.random() * 200, // Large: 200-400px for others
        rotation: Math.random() * 20 - 10, // Subtle rotation: -10 to 10 degrees
        rotationSpeed: (Math.random() - 0.5) * 0.5, // Slow rotation
        url: img.url,
        alt: img.alt,
        opacity: 1, // 100% opacity - not transparent at all
        scale: 1
      };
    });
    
    setImages(initialImages);
    
    const handleResize = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setDimensions({ width: rect.width, height: rect.height });
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);
  
  // Add mouse movement tracking
  useEffect(() => {
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
  }, []);
  
  useEffect(() => {
    if (images.length === 0 || dimensions.width === 0) return;
    
    const animate = () => {
      setImages(prevImages => 
        prevImages.map((img, index) => {
          let newX = img.x + img.speedX;
          let newY = img.y + img.speedY;
          let newSpeedX = img.speedX;
          let newSpeedY = img.speedY;
          
          // Mouse interaction - repel images away from cursor
          const dx = mousePosition.x - img.x;
          const dy = mousePosition.y - img.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          const interactionRadius = 200; // Larger interaction radius
          if (distance < interactionRadius && distance > 0) {
            const force = (1 - distance / interactionRadius) * 3; // Stronger force
            newSpeedX -= (dx / distance) * force;
            newSpeedY -= (dy / distance) * force;
          }
          
          // Gentle bounce off edges - brought in by 7.5%
          const boundaryInset = dimensions.width * 0.075;
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
          
          // Check collisions with other images
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
          
          // Ensure minimum speed
          const minSpeed = 0.2;
          const currentSpeed = Math.sqrt(newSpeedX * newSpeedX + newSpeedY * newSpeedY);
          if (currentSpeed < minSpeed && distance > interactionRadius) {
            const boost = minSpeed / currentSpeed;
            newSpeedX *= boost;
            newSpeedY *= boost;
          }
          
          // Update rotation based on movement
          const newRotation = img.rotation + img.rotationSpeed + (newSpeedX * 0.1);
          
          // Gentle pulsing scale effect
          const scalePhase = (Date.now() / 1000 + index) * 0.2;
          const newScale = 1 + Math.sin(scalePhase) * 0.05; // 95% to 105% scale
          
          return {
            ...img,
            x: newX,
            y: newY,
            speedX: newSpeedX,
            speedY: newSpeedY,
            rotation: newRotation,
            scale: newScale
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
  }, [images, dimensions, mousePosition]);
  
  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 overflow-hidden z-0 pointer-events-none"
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
            transform: `translate(-50%, -50%) rotate(${img.rotation}deg) scale(${img.scale})`,
            opacity: 1, // Always full opacity
            transition: 'transform 0.3s ease-out',
            filter: 'none', // Remove any filters that might cause fading
          }}
        >
          <img
            src={img.url}
            alt={img.alt}
            className="w-full h-full object-cover rounded-xl shadow-2xl"
            loading="lazy"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        </div>
      ))}
    </div>
  );
};