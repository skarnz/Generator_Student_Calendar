
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ToolCardProps {
  name: string;
  description: string;
  url: string;
  category: string;
  logoUrl?: string;
  index: number;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
}

export function ToolCard({
  name,
  description,
  url,
  category,
  logoUrl,
  index,
  isFavorite = false,
  onToggleFavorite
}: ToolCardProps) {
  // Animation delay based on index (for staggered reveal)
  const delay = `${index * 0.05}s`;

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleFavorite?.();
  };

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="relative bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md hover:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-generator-green"
      style={{
        animationDelay: delay,
      }}
    >
      <div className="p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            {logoUrl ? (
              <img src={logoUrl} alt={name} className="h-6 w-6" />
            ) : (
              <div className="h-6 w-6 bg-generator-lightGold rounded-md flex items-center justify-center">
                <span className="text-xs font-bold text-generator-darkGreen">
                  {name.charAt(0)}
                </span>
              </div>
            )}
            <h3 className="font-semibold text-lg text-left">{name}</h3>
          </div>

          {/* Favorite button */}
          <button
            onClick={handleFavoriteClick}
            className={cn(
              "p-1 rounded-full transition-colors",
              isFavorite ? "text-yellow-500" : "text-gray-300 hover:text-yellow-500"
            )}
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Star className={cn("h-5 w-5", isFavorite ? "fill-yellow-500" : "")} />
          </button>
        </div>

        <p className="text-sm text-gray-600 mb-4 text-left line-clamp-3">{description}</p>

        <div className="inline-block text-xs font-medium bg-generator-lightGreen text-generator-darkGreen rounded-full px-2.5 py-1 text-left">
          {category}
        </div>
      </div>
    </a>
  );
}
