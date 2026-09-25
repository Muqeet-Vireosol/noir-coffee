'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function VisitCTA() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      gsap.to(bgRef.current, {
        scale: 1.1,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      });
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section id="visit" ref={containerRef} className="relative py-40 px-6 overflow-hidden flex items-center justify-center">
      <div 
        ref={bgRef}
        className="absolute inset-0 bg-[url('/assets/images/visit/cafe-interior.jpg')] bg-cover bg-center origin-center transform scale-100"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-roast/60" />
      
      <div className="relative z-10 text-center max-w-2xl mx-auto flex flex-col items-center">
        <h2 className="font-display text-5xl md:text-7xl text-cream mb-8">Your next coffee is waiting.</h2>
        
        <div className="flex flex-col gap-2 mb-12 text-sm tracking-widest text-muted-cream uppercase">
          <p>24 Coffee Street, Your City</p>
          <p>OPEN DAILY 7:00 AM — 10:00 PM</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
          <a href="#" className="px-8 py-4 border border-gold text-gold hover:bg-gold hover:text-espresso transition-colors text-sm tracking-widest uppercase font-medium">
            Get Directions
          </a>
          <a href="#" className="px-8 py-4 bg-cream text-espresso hover:bg-white transition-colors text-sm tracking-widest uppercase font-medium">
            Order Online
          </a>
        </div>
      </div>
    </section>
  );
}
