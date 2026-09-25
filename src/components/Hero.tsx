'use client';
import { useLayoutEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

/**
 * Hero Section — Cinematic Video Feel
 *
 * The cinematic background is a real looping video, layered with:
 *  1. Slow Ken Burns zoom drift on the video itself
 *  2. Animated steam / particle system (canvas-drawn)
 *  3. Drifting bokeh light orbs
 *  4. Animated gradient overlay with subtle pulse
 *  5. Vignette darkening on scroll
 */

function SteamCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  const initSteam = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    interface Particle {
      x: number; y: number; vx: number; vy: number;
      radius: number; opacity: number; life: number; maxLife: number;
    }

    const particles: Particle[] = [];

    const spawn = () => {
      const cx = canvas.width * (0.35 + Math.random() * 0.3);
      particles.push({
        x: cx,
        y: canvas.height * (0.45 + Math.random() * 0.15),
        vx: (Math.random() - 0.5) * 0.3,
        vy: -(0.3 + Math.random() * 0.5),
        radius: 2 + Math.random() * 4,
        opacity: 0,
        life: 0,
        maxLife: 120 + Math.random() * 100,
      });
    };

    let frame = 0;
    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame++;
      if (frame % 4 === 0 && particles.length < 60) spawn();

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++;
        p.x += p.vx + Math.sin(p.life * 0.02) * 0.2;
        p.y += p.vy;
        p.radius += 0.03;
        p.vx += (Math.random() - 0.5) * 0.02;

        const progress = p.life / p.maxLife;
        p.opacity = progress < 0.15
          ? progress / 0.15
          : progress > 0.6
            ? 1 - (progress - 0.6) / 0.4
            : 1;
        p.opacity *= 0.12;

        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 3);
        grad.addColorStop(0, `rgba(243,235,221,${p.opacity})`);
        grad.addColorStop(1, `rgba(243,235,221,0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 3, 0, Math.PI * 2);
        ctx.fill();

        if (p.life >= p.maxLife) particles.splice(i, 1);
      }
      animRef.current = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;
    const cleanup = initSteam();
    return cleanup;
  }, [initSteam]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full z-[3] pointer-events-none"
      aria-hidden="true"
    />
  );
}

function BokehOrbs() {
  return (
    <div className="absolute inset-0 z-[2] pointer-events-none overflow-hidden" aria-hidden="true">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: `${20 + i * 15}px`,
            height: `${20 + i * 15}px`,
            left: `${15 + i * 18}%`,
            top: `${30 + (i % 3) * 20}%`,
            background: `radial-gradient(circle, rgba(201,164,91,${0.06 + i * 0.02}) 0%, transparent 70%)`,
            animation: `bokeh-float ${8 + i * 2}s ease-in-out infinite alternate`,
            animationDelay: `${i * 1.5}s`,
          }}
        />
      ))}
    </div>
  );
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (!prefersReducedMotion) {
        // Initial zoom settle
        gsap.fromTo(bgRef.current,
          { scale: 1.18 },
          { scale: 1.05, duration: 3, ease: 'power2.out' }
        );

        // Continuous slow Ken Burns drift (simulates video)
        gsap.to(bgRef.current, {
          scale: 1.12,
          x: '1%',
          y: '-0.5%',
          duration: 20,
          ease: 'none',
          repeat: -1,
          yoyo: true,
        });

        // Text stagger entrance
        gsap.fromTo('.hero-anim',
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.4, stagger: 0.2, ease: 'power3.out', delay: 0.6 }
        );

        // Gradient pulse — subtle warmth breathing
        gsap.to('.hero-gradient-pulse', {
          opacity: 0.15,
          duration: 4,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        });

        // Scroll: darken and scale as user scrolls away
        gsap.to(bgRef.current, {
          scale: 1.2,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });

        gsap.to(textRef.current, {
          y: -60,
          opacity: 0,
          scrollTrigger: {
            trigger: containerRef.current,
            start: '30% top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-espresso"
    >
      {/* Background video with Ken Burns */}
      <div ref={bgRef} className="absolute inset-[-5%] w-[110%] h-[110%]">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="/assets/videos/hero/hero-coffee.mp4"
          poster="/assets/images/hero/hero-coffee.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        />
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-espresso z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/20 z-[1]" />

      {/* Warm pulse overlay — simulates flickering ambient light */}
      <div
        className="hero-gradient-pulse absolute inset-0 z-[1] opacity-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 40% 55%, rgba(201,164,91,0.08) 0%, transparent 70%)',
        }}
      />

      {/* Steam particles (canvas) */}
      <SteamCanvas />

      {/* Bokeh light orbs */}
      <BokehOrbs />

      {/* Vignette */}
      <div
        className="absolute inset-0 z-[4] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 70% at center, transparent 40%, rgba(11,9,7,0.6) 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6" ref={textRef}>
        <p className="hero-anim text-xs tracking-[0.15em] text-muted-cream mb-6 font-ui uppercase">
          SPECIALTY COFFEE&ensp;•&ensp;EST. 2018
        </p>
        <h1
          className="hero-anim font-display text-cream leading-[1.05] mb-8"
          style={{ fontSize: 'clamp(3rem, 8vw, 7rem)' }}
        >
          Crafted from bean<br />to perfection.
        </h1>
        <p className="hero-anim text-muted-cream text-lg md:text-xl font-ui mb-12 max-w-lg mx-auto leading-relaxed">
          Coffee made slowly. Served beautifully.
        </p>
        <div className="hero-anim flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#beans"
            className="px-10 py-3.5 bg-cream text-espresso rounded-full font-ui text-xs tracking-[0.15em] uppercase hover:bg-white transition-colors duration-300 w-full sm:w-auto text-center"
          >
            Explore Coffee
          </a>
          <a
            href="#process"
            className="px-10 py-3.5 border border-cream/60 text-cream rounded-full font-ui text-xs tracking-[0.15em] uppercase hover:bg-cream/10 transition-colors duration-300 w-full sm:w-auto text-center"
          >
            Our Story
          </a>
        </div>
      </div>

      {/* Scroll indicator — slow pulse */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 hero-anim">
        <span className="text-[10px] tracking-[0.2em] text-muted-cream/60 font-ui uppercase">Scroll</span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-cream/40 to-transparent animate-pulse" />
      </div>
    </section>
  );
}
