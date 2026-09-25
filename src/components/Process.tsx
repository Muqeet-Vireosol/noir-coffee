'use client';

import { useLayoutEffect, useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { processSteps } from '@/lib/menuData';

export default function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const checkWidth = () => setIsDesktop(window.innerWidth >= 768);
    checkWidth();
    window.addEventListener('resize', checkWidth);
    return () => window.removeEventListener('resize', checkWidth);
  }, []);

  useLayoutEffect(() => {
    if (!isDesktop || !containerRef.current || !wrapperRef.current) return;
    
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.process-card');
      const containerWidth = wrapperRef.current!.scrollWidth - window.innerWidth;

      gsap.to(cards, {
        x: -containerWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: `+=${containerWidth}`,
        }
      });
    }, containerRef);
    
    return () => ctx.revert();
  }, [isDesktop]);

  return (
    <section ref={containerRef} id="process" className="py-24 bg-coffee/30 overflow-hidden relative">
      <div className="px-6 md:px-12 mb-12 max-w-7xl mx-auto">
        <h2 className="text-xs tracking-[0.3em] text-muted-cream uppercase mb-4">The Process</h2>
      </div>

      {isDesktop ? (
        <div ref={wrapperRef} className="flex gap-8 px-12 w-max pb-12">
          {processSteps.map((step, idx) => (
            <div key={step.number} className="process-card w-[450px] shrink-0 border border-line bg-espresso p-8 flex flex-col">
              <span className="text-gold font-display text-4xl mb-6">0{idx + 1}</span>
              <div className="relative aspect-[4/3] mb-6 overflow-hidden">
                <Image src={step.image} alt={step.title} fill className="object-cover" />
              </div>
              <h3 className="font-display text-2xl text-cream mb-4">{step.title}</h3>
              <p className="text-muted-cream">{step.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-8 px-6 max-w-md mx-auto pb-12">
          {processSteps.map((step, idx) => (
            <div key={step.number} className="border border-line bg-espresso p-6 flex flex-col">
              <span className="text-gold font-display text-3xl mb-4">0{idx + 1}</span>
              <div className="relative aspect-video mb-6 overflow-hidden">
                <Image src={step.image} alt={step.title} fill className="object-cover" />
              </div>
              <h3 className="font-display text-xl text-cream mb-3">{step.title}</h3>
              <p className="text-muted-cream text-sm">{step.description}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
