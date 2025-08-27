import { cn } from '@/lib/utils';

interface FilterSectionProps {
  eventTypes: string[];
  audiences: string[];
  selectedEventType: string;
  selectedAudience: string;
  onSelectEventType: (type: string) => void;
  onSelectAudience: (audience: string) => void;
}

export function FilterSection({
  eventTypes,
  audiences,
  selectedEventType,
  selectedAudience,
  onSelectEventType,
  onSelectAudience
}: FilterSectionProps) {
  return (
    <section id="filters" className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-xl font-semibold text-generator-darkGreen mb-6 text-center">
            Filter Events
          </h3>
          
          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">Event Type</h4>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => onSelectEventType('All')}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-medium transition-all duration-300",
                    selectedEventType === 'All'
                      ? "bg-generator-green text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-generator-lightGold hover:text-generator-darkGreen"
                  )}
                >
                  All Types
                </button>
                
                {eventTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => onSelectEventType(type)}
                    className={cn(
                      "rounded-full px-4 py-2 text-sm font-medium transition-all duration-300",
                      selectedEventType === type
                        ? "bg-generator-green text-white shadow-md"
                        : "bg-gray-100 text-gray-700 hover:bg-generator-lightGold hover:text-generator-darkGreen"
                    )}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">Audience</h4>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => onSelectAudience('All')}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-medium transition-all duration-300",
                    selectedAudience === 'All'
                      ? "bg-generator-green text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-generator-lightGold hover:text-generator-darkGreen"
                  )}
                >
                  All Audiences
                </button>
                
                {audiences.map((audience) => (
                  <button
                    key={audience}
                    onClick={() => onSelectAudience(audience)}
                    className={cn(
                      "rounded-full px-4 py-2 text-sm font-medium transition-all duration-300",
                      selectedAudience === audience
                        ? "bg-generator-green text-white shadow-md"
                        : "bg-gray-100 text-gray-700 hover:bg-generator-lightGold hover:text-generator-darkGreen"
                    )}
                  >
                    {audience}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}