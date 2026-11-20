import React from 'react';
import { useApp } from '../context/AppContext';

export const CategoryBar = () => {
  const { selectedCategory, setSelectedCategory, categories, lang } = useApp();

  return (
    <div className="sticky top-[69px] z-30 bg-[#161814]/95 backdrop-blur-md border-b border-[#2B3026] py-3 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-2.5 overflow-x-auto no-scrollbar py-1">
          {categories.map(cat => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  const el = document.getElementById('menu-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex-shrink-0 border ${
                  isActive
                    ? 'bg-[#F3BE53] text-[#131512] border-[#F3BE53] shadow-lg shadow-[#F3BE53]/25 scale-105 font-black'
                    : 'bg-[#23271E] text-gray-300 border-[#32382B] hover:border-[#F3BE53]/50 hover:bg-[#2A2F25]'
                }`}
              >
                <span className="text-base">{cat.icon}</span>
                <span>{cat.name[lang] || cat.name.uz}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
