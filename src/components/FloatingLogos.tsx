
import { useState, useEffect, useRef } from 'react';
import { tools } from '@/data/tools';

interface Logo {
  id: number;
  x: number;
  y: number;
  speedX: number;
  speedY: number;
  size: number;
  rotation: number;
  rotationSpeed: number;
  url: string;
  name: string;
}

export const FloatingLogos = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [logos, setLogos] = useState<Logo[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const animationFrameRef = useRef<number>();
  
  // Initialize logos
  useEffect(() => {
    if (!containerRef.current) return;
    
    const containerRect = containerRef.current.getBoundingClientRect();
    setDimensions({ width: containerRect.width, height: containerRect.height });
    
    // Filter out tools without logos and initialize positions
    const initialLogos = tools
      .filter(tool => tool.logoUrl)
      .map((tool, index) => ({
        id: index,
        x: Math.random() * containerRect.width,
        y: Math.random() * containerRect.height,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        size: 30 + Math.random() * 20,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 0.3,
        url: tool.logoUrl || '',
        name: tool.name
      }));
    
    setLogos(initialLogos);
    
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
  
  // Handle mouse movement
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
  
  // Animate logos
  useEffect(() => {
    if (logos.length === 0 || dimensions.width === 0) return;
    
    const animate = () => {
      setLogos(prevLogos => 
        prevLogos.map(logo => {
          // Calculate distance to mouse
          const dx = mousePosition.x - logo.x;
          const dy = mousePosition.y - logo.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Apply interactive force (logos are attracted to mouse)
          const interactionRadius = 150;
          let newX = logo.x + logo.speedX;
          let newY = logo.y + logo.speedY;
          
          if (distance < interactionRadius) {
            const force = (interactionRadius - distance) / interactionRadius * 0.6;
            newX += (dx / distance) * force;
            newY += (dy / distance) * force;
          }
          
          // Bounce off walls
          if (newX < 0 || newX > dimensions.width) {
            logo.speedX *= -1;
            newX = Math.max(0, Math.min(newX, dimensions.width));
          }
          
          if (newY < 0 || newY > dimensions.height) {
            logo.speedY *= -1;
            newY = Math.max(0, Math.min(newY, dimensions.height));
          }
          
          // Update rotation
          const newRotation = (logo.rotation + logo.rotationSpeed) % 360;
          
          return {
            ...logo,
            x: newX,
            y: newY,
            rotation: newRotation
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
  }, [logos, dimensions, mousePosition]);
  
  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 overflow-hidden z-0 opacity-80 pointer-events-none"
    >
      {logos.map(logo => (
        <div
          key={logo.id}
          className="absolute transition-transform duration-300 ease-out"
          style={{
            left: `${logo.x}px`,
            top: `${logo.y}px`,
            width: `${logo.size}px`,
            height: `${logo.size}px`,
            transform: `translate(-50%, -50%) rotate(${logo.rotation}deg)`,
          }}
        >
          <img
            src={logo.url}
            alt={logo.name}
            className="w-full h-full object-contain rounded-md bg-white/30 p-1 backdrop-blur-sm"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        </div>
      ))}
    </div>
  );
};

