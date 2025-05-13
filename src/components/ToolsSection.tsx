
import { useState, useEffect } from 'react';
import { ToolCard } from './ToolCard';
import { Search, Star } from 'lucide-react';

interface Tool {
  name: string;
  description: string;
  url: string;
  category: string;
  logoUrl?: string;
}

interface ToolsSectionProps {
  tools: Tool[];
  selectedCategory: string;
}

export function ToolsSection({ tools, selectedCategory }: ToolsSectionProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  
  // Load favorites from localStorage on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favoriteTools');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('favoriteTools', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (toolName: string) => {
    setFavorites(prev => {
      if (prev.includes(toolName)) {
        return prev.filter(name => name !== toolName);
      } else {
        return [...prev, toolName];
      }
    });
  };

  const filteredTools = tools.filter(tool => {
    const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory;
    const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          tool.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFavorites = !showOnlyFavorites || favorites.includes(tool.name);
    
    return matchesCategory && matchesSearch && matchesFavorites;
  });
    
  return (
    <section id="tools" className="py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="section-heading text-2xl sm:text-3xl md:text-4xl">AI Tools Stack</h2>
        
        <div className="mb-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:w-64 md:w-80">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search tools..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-generator-green"
            />
          </div>
          
          <button
            onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
            className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
              showOnlyFavorites 
                ? 'bg-generator-green text-white' 
                : 'bg-white text-gray-700 border border-gray-300'
            }`}
          >
            <Star className={`h-4 w-4 ${showOnlyFavorites ? 'fill-white' : ''}`} />
            <span>Favorites</span>
          </button>
        </div>
        
        <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredTools.map((tool, index) => (
            <ToolCard
              key={tool.name}
              name={tool.name}
              description={tool.description}
              url={tool.url}
              category={tool.category}
              logoUrl={tool.logoUrl}
              index={index}
              isFavorite={favorites.includes(tool.name)}
              onToggleFavorite={() => toggleFavorite(tool.name)}
            />
          ))}
        </div>
        
        {filteredTools.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <p className="text-lg sm:text-xl text-gray-500">
              {searchTerm ? 'No tools match your search.' : 
               showOnlyFavorites ? 'No favorite tools yet.' : 
               'No tools found in this category.'}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
