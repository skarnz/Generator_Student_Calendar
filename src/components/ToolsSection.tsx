
import { ToolCard } from './ToolCard';

interface Tool {
  name: string;
  description: string;
  url: string;
  category: string;
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
    <section id="tools" className="py-24">
      <div className="container mx-auto px-6">
        <h2 className="section-heading">AI Tools Stack</h2>
        
        <div className="tools-grid">
          {filteredTools.map((tool, index) => (
            <ToolCard
              key={tool.name}
              name={tool.name}
              description={tool.description}
              url={tool.url}
              category={tool.category}
              index={index}
            />
          ))}
        </div>
        
        {filteredTools.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <p className="text-xl text-gray-500">No tools found in this category.</p>
          </div>
        )}
      </div>
    </section>
  );
}
