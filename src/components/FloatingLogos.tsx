
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
    const toolsWithLogos = tools.filter(tool => tool.logoUrl);
    
    // Create a grid to ensure even distribution
    const rows = Math.ceil(Math.sqrt(toolsWithLogos.length));
    const cols = Math.ceil(toolsWithLogos.length / rows);
    const cellWidth = containerRect.width / cols;
    const cellHeight = containerRect.height / rows;
    
    const initialLogos = toolsWithLogos.map((tool, index) => {
      // Calculate grid position
      const row = Math.floor(index / cols);
      const col = index % cols;
      
      // Add some randomness within the cell
      const baseX = col * cellWidth + cellWidth / 2;
      const baseY = row * cellHeight + cellHeight / 2;
      const randomOffsetX = (Math.random() - 0.5) * cellWidth * 0.7;
      const randomOffsetY = (Math.random() - 0.5) * cellHeight * 0.7;
      
      // Ensure each logo starts with a good speed to prevent stationary logos
      const minSpeed = 1.2; // Increased minimum speed
      const maxSpeed = 2.5; // Set maximum speed
      
      // Generate random speeds within the min-max range
      const speedX = (Math.random() * (maxSpeed - minSpeed) + minSpeed) * (Math.random() > 0.5 ? 1 : -1);
      const speedY = (Math.random() * (maxSpeed - minSpeed) + minSpeed) * (Math.random() > 0.5 ? 1 : -1);
      
      return {
        id: index,
        x: baseX + randomOffsetX,
        y: baseY + randomOffsetY,
        speedX: speedX,
        speedY: speedY,
        size: 30 + Math.random() * 20,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 1,
        url: tool.logoUrl || '',
        name: tool.name
      };
    });
    
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
    
    // Add a periodic energy boost to ensure continuous movement
    let frameCount = 0;
    const energyBoostInterval = 100; // More frequent energy boosts
    
    const animate = () => {
      frameCount++;
      
      setLogos(prevLogos => 
        prevLogos.map(logo => {
          // Calculate current position and velocity
          let newX = logo.x + logo.speedX;
          let newY = logo.y + logo.speedY;
          let newSpeedX = logo.speedX;
          let newSpeedY = logo.speedY;
          
          // Mouse interaction - repulsion instead of attraction
          const dx = mousePosition.x - logo.x;
          const dy = mousePosition.y - logo.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          const interactionRadius = 150;
          if (distance < interactionRadius) {
            // Calculate repulsion force (stronger when closer)
            const repulsionForce = 2 * (1 - distance / interactionRadius);
            
            // Apply repulsion in the opposite direction of the mouse
            newSpeedX -= (dx / distance) * repulsionForce;
            newSpeedY -= (dy / distance) * repulsionForce;
          }
          
          // Anti-clustering force - repel from other logos
          prevLogos.forEach(otherLogo => {
            if (logo.id !== otherLogo.id) {
              const dxLogo = otherLogo.x - logo.x;
              const dyLogo = otherLogo.y - logo.y;
              const logoDistance = Math.sqrt(dxLogo * dxLogo + dyLogo * dyLogo);
              
              // Apply repulsion if logos are too close
              const minDistance = (logo.size + otherLogo.size) * 0.8;
              if (logoDistance < minDistance) {
                const repulsionStrength = 0.7 * (1 - logoDistance / minDistance);
                newSpeedX -= (dxLogo / logoDistance) * repulsionStrength;
                newSpeedY -= (dyLogo / logoDistance) * repulsionStrength;
              }
            }
          });
          
          // Bounce off walls with randomized rebound
          if (newX < 0 || newX > dimensions.width) {
            newSpeedX = -newSpeedX * (0.9 + Math.random() * 0.2);
            newX = Math.max(0, Math.min(newX, dimensions.width));
            // Add small variation to avoid getting stuck on walls
            newSpeedY += (Math.random() - 0.5) * 0.8;
          }
          
          if (newY < 0 || newY > dimensions.height) {
            newSpeedY = -newSpeedY * (0.9 + Math.random() * 0.2);
            newY = Math.max(0, Math.min(newY, dimensions.height));
            // Add small variation to avoid getting stuck on walls
            newSpeedX += (Math.random() - 0.5) * 0.8;
          }
          
          // Apply gentle drag to prevent extreme speeds
          const drag = 0.985;
          newSpeedX *= drag;
          newSpeedY *= drag;
          
          // Energy boost to ensure continuous movement
          if (frameCount % energyBoostInterval === 0) {
            const currentSpeed = Math.sqrt(newSpeedX * newSpeedX + newSpeedY * newSpeedY);
            const minSpeed = 1.0;
            
            if (currentSpeed < minSpeed) {
              // Boost speed while preserving direction
              const boostFactor = minSpeed / currentSpeed;
              newSpeedX *= boostFactor;
              newSpeedY *= boostFactor;
              
              // Add slight randomness to prevent synchronized movement
              newSpeedX += (Math.random() - 0.5) * 0.5;
              newSpeedY += (Math.random() - 0.5) * 0.5;
            }
            
            // Max speed capping to prevent excessive speeds
            const maxSpeed = 3.0;
            const currentSpeedAfterBoost = Math.sqrt(newSpeedX * newSpeedX + newSpeedY * newSpeedY);
            
            if (currentSpeedAfterBoost > maxSpeed) {
              const reduceFactor = maxSpeed / currentSpeedAfterBoost;
              newSpeedX *= reduceFactor;
              newSpeedY *= reduceFactor;
            }
          }
          
          // Update rotation
          const newRotation = (logo.rotation + logo.rotationSpeed) % 360;
          
          return {
            ...logo,
            x: newX,
            y: newY,
            speedX: newSpeedX,
            speedY: newSpeedY,
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
          className="absolute transition-transform duration-200 ease-out"
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
