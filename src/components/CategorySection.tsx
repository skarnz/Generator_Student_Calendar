
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface CategoryProps {
  categories: string[];
  onSelectCategory: (category: string) => void;
  selectedCategory: string;
}

export function CategorySection({ categories, onSelectCategory, selectedCategory }: CategoryProps) {
  return (
    <section id="categories" className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="section-heading">Browse by Category</h2>
        
        <div className="mx-auto max-w-4xl overflow-x-auto py-4">
          <div className="flex flex-wrap justify-center gap-3 pb-4">
            <button
              onClick={() => onSelectCategory('All')}
              className={cn(
                "rounded-full px-5 py-2 text-sm font-medium transition-all duration-300",
                selectedCategory === 'All'
                  ? "bg-generator-green text-white shadow-md"
                  : "bg-white text-gray-700 hover:bg-generator-lightGold hover:text-generator-darkGreen"
              )}
            >
              All Tools
            </button>
            
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => onSelectCategory(category)}
                className={cn(
                  "rounded-full px-5 py-2 text-sm font-medium transition-all duration-300",
                  selectedCategory === category
                    ? "bg-generator-green text-white shadow-md"
                    : "bg-white text-gray-700 hover:bg-generator-lightGold hover:text-generator-darkGreen"
                )}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
