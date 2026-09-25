'use client';

import { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { featuredProducts } from '@/lib/menuData';

export default function FeaturedCoffee() {
  const container = useRef<HTMLDivElement>(null);
  
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      gsap.from('.featured-card', {
        scrollTrigger: {
          trigger: container.current,
          start: 'top 75%',
        },
        opacity: 0,
        y: 80,
        scale: 0.94,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out'
      });
    }, container);
    
    return () => ctx.revert();
  }, []);

  return (
    <section ref={container} className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="mb-16">
        <h2 className="font-display text-4xl md:text-5xl text-cream mb-4">Featured coffee</h2>
        <p className="text-muted-cream text-lg">Roasted for slow mornings and long conversations.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {featuredProducts.map((product, index) => (
          <div key={product.id} className="featured-card group border border-line bg-coffee/50 p-6 flex flex-col cursor-pointer transition-colors hover:bg-coffee/80">
            <div className="relative aspect-[3/4] mb-6 overflow-hidden bg-roast/30">
              <Image 
                src={product.image} 
                alt={product.name} 
                fill
                className="object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-110" 
              />
            </div>
            <div className="flex justify-between items-start mb-2">
              <span className="text-muted-cream text-sm">0{index + 1}</span>
              <span className="text-cream font-medium">${product.price}</span>
            </div>
            <h3 className="font-display text-2xl text-cream mb-2 group-hover:text-gold transition-colors">{product.name}</h3>
            <p className="text-muted-cream text-sm flex-grow mb-6">{product.notes}</p>
            
            <div className="flex items-center text-cream group-hover:text-gold transition-colors text-sm uppercase tracking-wider mt-auto">
              <span>View details</span>
              <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
