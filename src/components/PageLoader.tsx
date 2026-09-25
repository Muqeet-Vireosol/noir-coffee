'use client';

import { useEffect, useState } from 'react';

export default function PageLoader({ onLoaded }: { onLoaded: () => void }) {
  const [progress, setProgress] = useState(0);
  const [isHiding, setIsHiding] = useState(false);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += Math.random() * 15;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setTimeout(() => {
          setIsHiding(true);
          setTimeout(onLoaded, 800); // Wait for fade out
        }, 400);
      }
      setProgress(current);
    }, 100);

    return () => clearInterval(interval);
  }, [onLoaded]);

  return (
    <div 
      className={`fixed inset-0 z-[100] bg-espresso flex flex-col items-center justify-center transition-opacity duration-700 ease-in-out ${
        isHiding ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="text-center mb-8">
        <h1 className="font-display text-4xl text-cream mb-2 tracking-wide animate-pulse">NOIR</h1>
        <p className="text-xs tracking-[0.3em] text-muted-cream">COFFEE / EST. 2018</p>
      </div>
      
      <div className="w-64 h-[1px] bg-line relative overflow-hidden">
        <div 
          className="absolute top-0 left-0 h-full bg-gold transition-all duration-200 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
