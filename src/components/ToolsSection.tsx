
import { ToolCard } from './ToolCard';

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
  const filteredTools = selectedCategory === 'All' 
    ? tools 
    : tools.filter(tool => tool.category === selectedCategory);
    
  return (
    <section id="tools" className="py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="section-heading text-2xl sm:text-3xl md:text-4xl">AI Tools Stack</h2>
        
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
            />
          ))}
        </div>
        
        {filteredTools.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <p className="text-lg sm:text-xl text-gray-500">No tools found in this category.</p>
          </div>
        )}
      </div>
    </section>
  );
}
