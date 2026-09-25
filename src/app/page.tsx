'use client';

import { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

import PageLoader from '@/components/PageLoader';
import CustomCursor from '@/components/CustomCursor';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import BeanStory from '@/components/BeanStory';
import GrindingStory from '@/components/GrindingStory';
import BrewingStory from '@/components/BrewingStory';
import EspressoStory from '@/components/EspressoStory';
import FeaturedCoffee from '@/components/FeaturedCoffee';
import Menu from '@/components/Menu';
import Process from '@/components/Process';
import Testimonials from '@/components/Testimonials';
import VisitCTA from '@/components/VisitCTA';
import Footer from '@/components/Footer';

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Sync ScrollTrigger with Lenis
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
    };
  }, []);

  return (
    <>
      {!isLoaded && <PageLoader onLoaded={() => setIsLoaded(true)} />}
      <CustomCursor />
      
      <div className={isLoaded ? 'opacity-100 transition-opacity duration-1000' : 'opacity-0 h-screen overflow-hidden'}>
        <Navbar />
        <main>
          <Hero />
          <BeanStory />
          <GrindingStory />
          <BrewingStory />
          <EspressoStory />
          <FeaturedCoffee />
          <Menu />
          <Process />
          <Testimonials />
          <VisitCTA />
        </main>
        <Footer />
      </div>
    </>
  );
}
