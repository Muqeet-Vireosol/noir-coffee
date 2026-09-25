'use client';
import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useInViewVideo } from '@/lib/useInViewVideo';

export default function EspressoStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useInViewVideo({ src: '/assets/videos/espresso/espresso-extraction.mp4' });

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    let ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!prefersReducedMotion) {
        gsap.to('.layer-1', {
          yPercent: -10,
          scrollTrigger: { trigger: containerRef.current, start: 'top bottom', end: 'bottom top', scrub: true }
        });
        gsap.to('.layer-2', {
          yPercent: -20,
          scrollTrigger: { trigger: containerRef.current, start: 'top bottom', end: 'bottom top', scrub: true }
        });
        gsap.to('.layer-3', {
          yPercent: -35,
          scrollTrigger: { trigger: containerRef.current, start: 'top bottom', end: 'bottom top', scrub: true }
        });
        gsap.to('.layer-4', {
          yPercent: -45,
          scrollTrigger: { trigger: containerRef.current, start: 'top bottom', end: 'bottom top', scrub: true }
        });
      }
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="espresso" ref={containerRef} className="relative h-[120vh] w-full overflow-hidden bg-roast">
      <div className="absolute inset-0 layer-1">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover opacity-60"
          poster="/assets/images/espresso/espresso-extraction.jpg"
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
        />
      </div>
      
      <div className="absolute inset-0 bg-roast/30 layer-2" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 layer-3 pointer-events-none mix-blend-overlay" />
      
      <div className="absolute inset-0 flex items-center justify-center layer-4">
        <div className="text-center px-6">
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl text-cream mb-4 drop-shadow-lg">
            Pure craft. <br/> Nothing unnecessary.
          </h2>
          <div className="w-16 h-[1px] bg-gold mx-auto mt-8"></div>
        </div>
      </div>
    </section>
  );
}
