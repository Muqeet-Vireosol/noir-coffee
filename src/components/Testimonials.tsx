'use client';

import { useState } from 'react';
import { testimonials } from '@/lib/menuData';

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="py-32 px-6 md:px-12 max-w-5xl mx-auto text-center relative overflow-hidden">
      <h2 className="text-xs tracking-[0.3em] text-muted-cream uppercase mb-16">People are obsessed.</h2>
      
      <div className="relative min-h-[250px] md:min-h-[200px] flex items-center justify-center">
        {testimonials.map((t, idx) => (
          <div 
            key={t.name}
            className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-700 ease-in-out ${
              idx === activeIndex ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-8 pointer-events-none'
            }`}
          >
            <p className="font-display text-3xl md:text-5xl text-cream italic mb-8 max-w-4xl leading-relaxed">
              &quot;{t.quote}&quot;
            </p>
            <div className="mt-auto">
              <p className="text-cream font-medium tracking-wide">{t.name}</p>
              <p className="text-muted-cream text-sm">{t.location}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-3 mt-12">
        {testimonials.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={`w-2 h-2 rounded-full transition-colors duration-300 ${idx === activeIndex ? 'bg-gold' : 'bg-line hover:bg-muted-cream'}`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
