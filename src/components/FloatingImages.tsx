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
  const animationFrameRef = useRef<number>();
  
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
        size: 180 + Math.random() * 120, // Much larger: 180-300px
        rotation: Math.random() * 20 - 10, // Subtle rotation: -10 to 10 degrees
        rotationSpeed: (Math.random() - 0.5) * 0.5, // Slow rotation
        url: img.url,
        alt: img.alt,
        opacity: 0.15 + Math.random() * 0.15, // 15-30% opacity
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
  
  useEffect(() => {
    if (images.length === 0 || dimensions.width === 0) return;
    
    const animate = () => {
      setImages(prevImages => 
        prevImages.map((img, index) => {
          let newX = img.x + img.speedX;
          let newY = img.y + img.speedY;
          let newSpeedX = img.speedX;
          let newSpeedY = img.speedY;
          
          // Gentle bounce off edges
          if (newX < -img.size / 2 || newX > dimensions.width + img.size / 2) {
            newSpeedX = -newSpeedX;
            newX = Math.max(-img.size / 2, Math.min(newX, dimensions.width + img.size / 2));
          }
          
          if (newY < -img.size / 2 || newY > dimensions.height + img.size / 2) {
            newSpeedY = -newSpeedY;
            newY = Math.max(-img.size / 2, Math.min(newY, dimensions.height + img.size / 2));
          }
          
          // Apply gentle drag
          const drag = 0.999;
          newSpeedX *= drag;
          newSpeedY *= drag;
          
          // Add subtle random movement
          if (Math.random() < 0.01) { // 1% chance each frame
            newSpeedX += (Math.random() - 0.5) * 0.3;
            newSpeedY += (Math.random() - 0.5) * 0.3;
          }
          
          // Ensure minimum speed
          const minSpeed = 0.1;
          const currentSpeed = Math.sqrt(newSpeedX * newSpeedX + newSpeedY * newSpeedY);
          if (currentSpeed < minSpeed) {
            const boost = minSpeed / currentSpeed;
            newSpeedX *= boost;
            newSpeedY *= boost;
          }
          
          // Update rotation
          const newRotation = img.rotation + img.rotationSpeed;
          
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
  }, [images, dimensions]);
  
  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 overflow-hidden z-0 pointer-events-none"
    >
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
            opacity: img.opacity,
            transition: 'transform 0.3s ease-out',
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