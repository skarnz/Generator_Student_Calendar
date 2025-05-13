
import { useState, useEffect } from 'react';
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
    <section id="tools" className="py-8 sm:py-12">
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="text-3xl font-bold mb-8 text-left text-generator-green">AI Tool Explorer</h2>
        
        <div className="mb-6 flex flex-col sm:flex-row gap-4 items-center">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search tools by name, feature, or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-3 w-full border border-gray-700 bg-gray-900 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-generator-green"
            />
          </div>
        </div>
        
        <div className="mb-6 flex gap-4">
          <button 
            className={`px-4 py-2 rounded-md ${selectedCategory === 'All' ? 'bg-gray-800' : 'bg-gray-900'} text-white`}
            onClick={() => setSelectedCategory('All')}
          >
            All Tools
          </button>
          <button 
            className={`px-4 py-2 rounded-md ${selectedCategory === 'Categories' ? 'bg-gray-800' : 'bg-gray-900'} text-white`}
            onClick={() => setSelectedCategory('Categories')}
          >
            Categories
          </button>
          <button 
            onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
            className={`flex items-center gap-2 px-4 py-2 rounded-md ${
              showOnlyFavorites 
                ? 'bg-gray-800 text-white' 
                : 'bg-gray-900 text-white'
            }`}
          >
            <Star className={`h-4 w-4 ${showOnlyFavorites ? 'fill-yellow-500' : ''}`} />
            <span>Favorites</span>
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="bg-gray-900">
              <tr className="text-left">
                <th className="px-4 py-3 text-white font-medium">Name</th>
                <th className="px-4 py-3 text-white font-medium">Category</th>
                <th className="px-4 py-3 text-white font-medium">Tags</th>
                <th className="px-4 py-3 text-white font-medium">Description</th>
                <th className="px-4 py-3 text-white font-medium text-center">Favorite</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {filteredTools.map((tool, index) => (
                <tr key={tool.name} className="bg-gray-900 hover:bg-gray-800 transition-colors">
                  <td className="px-4 py-4 text-white font-medium">
                    <a href={tool.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                      {tool.logoUrl ? (
                        <img src={tool.logoUrl} alt={tool.name} className="h-5 w-5" />
                      ) : (
                        <div className="h-5 w-5 bg-gray-700 rounded-md flex items-center justify-center">
                          <span className="text-xs font-bold text-white">
                            {tool.name.charAt(0)}
                          </span>
                        </div>
                      )}
                      {tool.name}
                    </a>
                  </td>
                  <td className="px-4 py-4 text-white">{tool.category}</td>
                  <td className="px-4 py-4 text-white">
                    <div className="flex flex-wrap gap-1">
                      {tool.category.toLowerCase().split(', ').map(tag => (
                        <span key={tag} className="inline-block text-xs bg-gray-800 text-gray-300 rounded-full px-2 py-1">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-white">{tool.description}</td>
                  <td className="px-4 py-4 text-center">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        toggleFavorite(tool.name);
                      }}
                      className="p-1 inline-flex"
                    >
                      <Star 
                        className={`h-5 w-5 ${favorites.includes(tool.name) ? 'fill-yellow-500 text-yellow-500' : 'text-gray-400'}`} 
                      />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
