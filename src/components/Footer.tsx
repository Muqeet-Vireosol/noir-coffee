'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      gsap.from('.footer-content', {
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 90%',
        },
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power2.out'
      });
    }, footerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="bg-espresso border-t border-line pt-24 pb-8 px-6 md:px-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-32">
          <div className="footer-content">
            <h3 className="font-display text-3xl text-cream mb-6">NOIR</h3>
            <p className="text-muted-cream text-sm leading-relaxed max-w-xs">
              Roasting distinct coffees for people who care about the details.
            </p>
          </div>
          
          <div className="footer-content flex flex-col gap-4">
            <h4 className="text-xs tracking-[0.2em] text-gold uppercase mb-2">Socials</h4>
            <a href="#" className="text-muted-cream hover:text-cream transition-colors w-fit">Instagram</a>
            <a href="#" className="text-muted-cream hover:text-cream transition-colors w-fit">Facebook</a>
            <a href="#" className="text-muted-cream hover:text-cream transition-colors w-fit">TikTok</a>
          </div>
          
          <div className="footer-content flex flex-col gap-4">
            <h4 className="text-xs tracking-[0.2em] text-gold uppercase mb-2">Navigate</h4>
            <a href="#menu" className="text-muted-cream hover:text-cream transition-colors w-fit">Menu</a>
            <a href="#process" className="text-muted-cream hover:text-cream transition-colors w-fit">The Process</a>
            <a href="#visit" className="text-muted-cream hover:text-cream transition-colors w-fit">Visit Us</a>
            <a href="#" className="text-muted-cream hover:text-cream transition-colors w-fit">Shop Beans</a>
          </div>
        </div>

        <div className="footer-content relative flex flex-col items-center border-t border-line pt-8">
          <span className="font-display text-[8rem] md:text-[12rem] lg:text-[15rem] leading-none text-coffee/30 select-none tracking-tighter absolute bottom-0 z-0">
            NOIR
          </span>
          <p className="text-muted-cream/50 text-xs tracking-widest relative z-10 mt-32 md:mt-48 lg:mt-64 text-center pb-4">
            © 2026 NOIR Coffee. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
