'use client';

import { useState } from 'react';
import { menuItems } from '@/lib/menuData';

const CATEGORIES = ['ESPRESSO', 'FILTER', 'COLD', 'NON-COFFEE', 'PASTRY'];

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0]);
  
  const filteredItems = menuItems.filter(item => item.category === activeCategory);

  return (
    <section id="menu" className="py-24 px-6 md:px-12 max-w-4xl mx-auto min-h-[600px]">
      <h2 className="font-display text-4xl text-cream mb-12 text-center">Menu</h2>
      
      <div className="flex flex-wrap justify-center gap-8 mb-16 border-b border-line pb-4">
        {CATEGORIES.map(category => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`relative text-sm tracking-widest pb-2 transition-colors ${activeCategory === category ? 'text-gold' : 'text-muted-cream hover:text-cream'}`}
          >
            {category}
            <span 
              className={`absolute bottom-0 left-0 w-full h-px bg-gold transition-transform duration-300 origin-left ${activeCategory === category ? 'scale-x-100' : 'scale-x-0'}`} 
            />
          </button>
        ))}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8">
        {filteredItems.map(item => (
          <div 
            key={item.name} 
            className="flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both"
          >
            <div className="flex justify-between items-baseline mb-1">
              <h3 className="font-display text-lg text-cream">{item.name}</h3>
              <span className="text-cream text-sm tracking-wider">${item.price}</span>
            </div>
            <p className="text-muted-cream text-sm border-b border-line border-dashed pb-4 h-full">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
