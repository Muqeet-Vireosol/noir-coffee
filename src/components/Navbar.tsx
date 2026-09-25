'use client';
import { useState, useEffect } from 'react';
import { NAV_LINKS } from '@/lib/constants';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#0B0907]/75 backdrop-blur-sm py-4' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        <div className="font-display text-2xl tracking-widest text-cream">NOIR</div>
        <div className="hidden md:flex items-center space-x-8">
          {NAV_LINKS.map((link) => (
            <a key={link.label} href={link.href} className="font-ui text-xs tracking-wider uppercase text-muted-cream hover:text-cream transition-colors">
              {link.label}
            </a>
          ))}
          <button className="border border-cream text-cream rounded-full px-5 py-2 font-ui text-xs tracking-wider uppercase hover:bg-cream hover:text-espresso transition-colors">
            ORDER
          </button>
        </div>
        <button className="md:hidden text-cream">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7"/></svg>
        </button>
      </div>
    </nav>
  );
}
