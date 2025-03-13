
import { useState } from 'react';
import { Check, ArrowRight, ExternalLink } from 'lucide-react';

interface ToolCardProps {
  name: string;
  description: string;
  url: string;
  category: string;
  index: number;
}

export function ToolCard({ name, description, url, category, index }: ToolCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  const animationDelay = `animate-delay-${(index % 5) * 100}`;
  
  return (
    <div 
      className={`generator-card animate-fade-in ${animationDelay}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="mb-3">
        <span className="tech-chip">{category}</span>
      </div>
      
      <h3 className="mb-2 text-xl font-bold text-generator-darkGreen">{name}</h3>
      
      <p className="mb-4 text-sm text-gray-600">{description}</p>
      
      <a 
        href={url} 
        target="_blank" 
        rel="noopener noreferrer"
        className="group inline-flex items-center text-generator-green hover:text-generator-darkGreen transition-colors"
      >
        <span className="mr-2">Visit Website</span>
        {isHovered ? (
          <ExternalLink size={16} className="transition-transform duration-300 group-hover:rotate-45" />
        ) : (
          <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
        )}
      </a>
      
      <div 
        className="absolute top-0 left-0 h-1 w-0 bg-generator-green transition-all duration-300 ease-in-out"
        style={{ width: isHovered ? '100%' : '0%' }}
      ></div>
    </div>
  );
}
