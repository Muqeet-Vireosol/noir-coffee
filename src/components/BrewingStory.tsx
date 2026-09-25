'use client';
import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useInViewVideo } from '@/lib/useInViewVideo';

export default function BrewingStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<SVGCircleElement>(null);
  const videoRef = useInViewVideo({ src: '/assets/videos/brewing/pour-over.mp4' });

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    let ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!prefersReducedMotion) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: '+=150%',
            pin: true,
            scrub: 1
          }
        });
        
        tl.to('.brew-img', { scale: 1.1, duration: 1 }, 0)
          .to('.brew-bg', { backgroundColor: 'rgba(33,21,14,0.6)', duration: 1 }, 0)
          .to(circleRef.current, { strokeDashoffset: 0, duration: 1 }, 0);
      }
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="brewing" ref={containerRef} className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover brew-img z-0"
        poster="/assets/images/brewing/pour-over.jpg"
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
      />
      <div className="absolute inset-0 brew-bg bg-espresso/40 z-10 transition-colors" />
      
      <div className="relative z-20 text-center flex flex-col items-center">
        <h2 className="font-display text-5xl md:text-7xl lg:text-8xl text-cream mb-12">Water meets coffee.</h2>
        
        <div className="relative w-24 h-24">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle 
              cx="50" cy="50" r="46" 
              fill="transparent" 
              stroke="rgba(243,235,221,0.2)" 
              strokeWidth="2" 
            />
            <circle 
              ref={circleRef}
              cx="50" cy="50" r="46" 
              fill="transparent" 
              stroke="#C9A45B" 
              strokeWidth="2" 
              strokeDasharray="289"
              strokeDashoffset="289"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-gold font-ui text-xs tracking-widest uppercase">Brew</span>
          </div>
        </div>
      </div>
    </section>
  );
}
