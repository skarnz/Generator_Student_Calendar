
import { useState } from 'react';
import { Check, ArrowRight, ExternalLink } from 'lucide-react';

interface ToolCardProps {
  name: string;
  description: string;
  url: string;
  category: string;
  index: number;
  logoUrl?: string;
}

export function ToolCard({ name, description, url, category, index, logoUrl }: ToolCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  const animationDelay = `animate-delay-${(index % 5) * 100}`;
  
  return (
    <div 
      className={`generator-card animate-fade-in ${animationDelay} p-4 sm:p-6`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
    >
      <div className="flex justify-between items-center mb-3">
        <span className="tech-chip text-xs whitespace-nowrap overflow-hidden text-ellipsis max-w-[120px] sm:max-w-full">{category}</span>
        {logoUrl && !imageError && (
          <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center ml-2">
            <img 
              src={logoUrl} 
              alt={`${name} logo`} 
              className="max-w-full max-h-full object-contain"
              onError={() => setImageError(true)}
            />
          </div>
        )}
      </div>
      
      <h3 className="mb-2 text-lg sm:text-xl font-bold text-generator-darkGreen line-clamp-1">{name}</h3>
      
      <p className="mb-4 text-xs sm:text-sm text-gray-600 line-clamp-3">{description}</p>
      
      <a 
        href={url} 
        target="_blank" 
        rel="noopener noreferrer"
        className="group inline-flex items-center text-generator-green hover:text-generator-darkGreen transition-colors text-sm"
      >
        <span className="mr-2">Visit Website</span>
        {isHovered ? (
          <ExternalLink size={14} className="transition-transform duration-300 group-hover:rotate-45" />
        ) : (
          <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
        )}
      </a>
      
      <div 
        className="absolute top-0 left-0 h-1 w-0 bg-generator-green transition-all duration-300 ease-in-out"
        style={{ width: isHovered ? '100%' : '0%' }}
      ></div>
    </div>
  );
}
