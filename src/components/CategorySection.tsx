
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface CategoryProps {
  categories: string[];
  onSelectCategory: (category: string) => void;
  selectedCategory: string;
}

export function CategorySection({ categories, onSelectCategory, selectedCategory }: CategoryProps) {
  return (
    <section id="categories" className="py-16 sm:py-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 text-center">
        <h2 className="section-heading text-2xl sm:text-3xl md:text-4xl text-center">Browse by Category</h2>
        
        <div className="flex justify-center w-full">
          <div className="w-full max-w-4xl overflow-x-auto py-4">
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 pb-4 w-full">
              <button
                onClick={() => onSelectCategory('All')}
                className={cn(
                  "rounded-full px-3 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm font-medium transition-all duration-300",
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
                    "rounded-full px-3 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm font-medium transition-all duration-300",
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
      </div>
    </section>
  );
}
