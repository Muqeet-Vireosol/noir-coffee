'use client';
import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useInViewVideo } from '@/lib/useInViewVideo';

export default function GrindingStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useInViewVideo({ src: '/assets/videos/grinding/coffee-grinding.mp4' });

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    let ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!prefersReducedMotion) {
        gsap.fromTo('.grind-img',
          { opacity: 0, scale: 1.15 },
          {
            opacity: 1, scale: 1, duration: 1.4, ease: 'power2.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            }
          }
        );

        gsap.to('.grind-img', {
          xPercent: -20,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        });
      }
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="grinding" ref={containerRef} className="py-32 bg-coffee overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-16">
          <div className="w-full lg:w-[40%]">
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-cream mb-6">From whole bean<br/>to perfect texture.</h2>
            <p className="text-muted-cream font-ui leading-relaxed text-lg mb-8">
              Precision grinding unlocks the potential of every bean. We calibrate our equipment daily, ensuring the exact particle size required for a balanced, sweet extraction.
            </p>
          </div>
          <div className="w-full lg:w-[60%]">
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <div className="absolute inset-[-20%] grind-img">
                <video
                  ref={videoRef}
                  className="absolute inset-0 w-full h-full object-cover"
                  poster="/assets/images/grinding/coffee-grinding.jpg"
                  muted
                  loop
                  playsInline
                  preload="none"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
