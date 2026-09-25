'use client';
import { useLayoutEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

/**
 * Bean Story Section — Cinematic "Video" Feel
 *
 * Simulated motion effects:
 *  1. Slow orbit/drift on the bean image (camera movement illusion)
 *  2. Animated warm spotlight sweep across beans
 *  3. Floating micro-particles (coffee dust)
 *  4. Shimmer highlight sweep
 *  5. Metadata stagger reveals with typing feel
 */

function CoffeeDustCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  const init = useCallback(() => {
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

    interface Dust {
      x: number; y: number; vx: number; vy: number;
      radius: number; opacity: number; drift: number;
    }

    const particles: Dust[] = [];
    for (let i = 0; i < 35; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.15,
        vy: -(0.1 + Math.random() * 0.2),
        radius: 0.5 + Math.random() * 1.5,
        opacity: 0.05 + Math.random() * 0.15,
        drift: Math.random() * Math.PI * 2,
      });
    }

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particles) {
        p.drift += 0.008;
        p.x += p.vx + Math.sin(p.drift) * 0.15;
        p.y += p.vy;

        if (p.y < -10) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
        }
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201,164,91,${p.opacity})`;
        ctx.fill();
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
    const cleanup = init();
    return cleanup;
  }, [init]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-[2]"
      aria-hidden="true"
    />
  );
}

export default function BeanStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (!prefersReducedMotion) {
        // Image scroll reveal — camera moving closer
        gsap.fromTo('.bean-img',
          { scale: 1.2, x: 50 },
          {
            scale: 1, x: 0, ease: 'power2.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 85%',
              end: 'center center',
              scrub: 1.5,
            },
          }
        );

        // Continuous slow orbit on beans (camera drift — simulates video)
        gsap.to('.bean-img', {
          x: '1.5%',
          y: '-1%',
          scale: 1.03,
          duration: 14,
          ease: 'none',
          repeat: -1,
          yoyo: true,
          delay: 2,
        });

        // Spotlight sweep across beans
        gsap.fromTo('.bean-spotlight',
          { x: '-100%', opacity: 0 },
          {
            x: '200%', opacity: 1,
            duration: 5,
            ease: 'power1.inOut',
            repeat: -1,
            repeatDelay: 6,
            delay: 3,
          }
        );

        // Shimmer highlight sweep
        gsap.fromTo('.bean-shimmer',
          { x: '-120%' },
          {
            x: '120%',
            duration: 3,
            ease: 'power2.inOut',
            repeat: -1,
            repeatDelay: 8,
            delay: 5,
          }
        );

        // Text reveal on scroll
        gsap.fromTo('.bean-text',
          { opacity: 0, y: 60 },
          {
            opacity: 1, y: 0, ease: 'power3.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 65%',
              end: '40% center',
              scrub: 1,
            },
          }
        );

        // Metadata stagger
        gsap.fromTo('.bean-meta',
          { opacity: 0, y: 20 },
          {
            opacity: 1, y: 0, stagger: 0.2, duration: 0.8, ease: 'power2.out',
            scrollTrigger: {
              trigger: '.bean-meta-wrap',
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        // Warm glow pulse on image
        gsap.to('.bean-glow', {
          opacity: 0.12,
          duration: 3.5,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="beans" ref={containerRef} className="py-24 md:py-40 bg-espresso relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

          {/* Image with motion layers */}
          <div ref={imageWrapRef} className="w-full lg:w-[60%] relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
              {/* Main image */}
              <div className="bean-img absolute inset-[-10%] w-[120%] h-[120%]">
                <Image
                  src="/assets/images/beans/beans-macro.jpg"
                  alt="Freshly roasted coffee beans close-up"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Warm glow overlay — breathing warmth */}
              <div
                className="bean-glow absolute inset-0 opacity-0 pointer-events-none z-[1]"
                style={{
                  background: 'radial-gradient(ellipse 80% 60% at 60% 40%, rgba(201,164,91,0.15) 0%, transparent 70%)',
                }}
              />

              {/* Spotlight sweep — simulates moving light source */}
              <div className="absolute inset-0 overflow-hidden z-[3] pointer-events-none">
                <div
                  className="bean-spotlight absolute top-0 h-full w-[40%] opacity-0"
                  style={{
                    background: 'linear-gradient(90deg, transparent 0%, rgba(243,235,221,0.04) 40%, rgba(243,235,221,0.07) 50%, rgba(243,235,221,0.04) 60%, transparent 100%)',
                  }}
                />
              </div>

              {/* Shimmer line */}
              <div className="absolute inset-0 overflow-hidden z-[4] pointer-events-none">
                <div
                  className="bean-shimmer absolute top-0 h-full w-[15%]"
                  style={{
                    background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.03) 45%, rgba(255,255,255,0.06) 50%, rgba(255,255,255,0.03) 55%, transparent 100%)',
                  }}
                />
              </div>

              {/* Coffee dust particles */}
              <CoffeeDustCanvas />

              {/* Vignette on image */}
              <div
                className="absolute inset-0 pointer-events-none z-[5]"
                style={{
                  background: 'radial-gradient(ellipse 80% 80% at center, transparent 40%, rgba(11,9,7,0.5) 100%)',
                }}
              />
            </div>
          </div>

          {/* Text content */}
          <div className="w-full lg:w-[40%]">
            <div className="bean-text">
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-cream mb-6 leading-[1.1]">
                Ground fresh,<br />every time.
              </h2>
              <p className="text-muted-cream font-ui mb-10 leading-relaxed text-lg">
                Selected beans, roasted with intention, ground only when the order begins.
                Every cup is a story of origin, craft, and care.
              </p>
            </div>

            <div className="bean-meta-wrap grid grid-cols-2 gap-6 pt-8 border-t border-line">
              <div className="bean-meta">
                <p className="text-[10px] tracking-[0.2em] text-muted-cream/60 font-ui uppercase mb-1.5">Origin</p>
                <p className="text-cream font-ui text-sm">Ethiopia, Yirgacheffe</p>
              </div>
              <div className="bean-meta">
                <p className="text-[10px] tracking-[0.2em] text-muted-cream/60 font-ui uppercase mb-1.5">Roast</p>
                <p className="text-cream font-ui text-sm">Medium</p>
              </div>
              <div className="col-span-2 bean-meta">
                <p className="text-[10px] tracking-[0.2em] text-muted-cream/60 font-ui uppercase mb-1.5">Notes</p>
                <p className="text-cream font-ui text-sm tracking-wide">Cacao&ensp;/&ensp;Berry&ensp;/&ensp;Caramel</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
