import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

// Ensure ScrollTrigger is registered if not already
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const isReducedMotion = () => {
  if (typeof window === "undefined") return true;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

export const animateReveal = (element: string | Element | null, options?: gsap.TweenVars) => {
  if (!element) return null;
  if (isReducedMotion()) {
    gsap.set(element, { opacity: 1, y: 0 });
    return null;
  }
  
  return gsap.fromTo(
    element,
    { opacity: 0, y: 60 },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out",
      ...options,
    }
  );
};

export const animateImageParallax = (element: string | Element | null, options?: gsap.TweenVars) => {
  if (!element || isReducedMotion()) return null;
  
  return gsap.to(element, {
    y: "20%",
    ease: "none",
    scrollTrigger: {
      trigger: element,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
    ...options,
  });
};

export const animateScaleOnScroll = (
  element: string | Element | null,
  from: number = 1.1,
  to: number = 1
) => {
  if (!element || isReducedMotion()) return null;

  return gsap.fromTo(
    element,
    { scale: from },
    {
      scale: to,
      ease: "none",
      scrollTrigger: {
        trigger: element,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    }
  );
};

export const animateCardStagger = (elements: string | Element[] | NodeListOf<Element> | null, options?: gsap.TweenVars) => {
  if (!elements || (Array.isArray(elements) && elements.length === 0)) return null;
  if (isReducedMotion()) {
    gsap.set(elements, { opacity: 1, y: 0, scale: 1 });
    return null;
  }

  return gsap.fromTo(
    elements,
    { opacity: 0, y: 80, scale: 0.94 },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      stagger: 0.15,
      ease: "power3.out",
      ...options,
    }
  );
};
