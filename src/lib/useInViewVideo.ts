'use client';

import { useEffect, useRef } from 'react';

interface UseInViewVideoOptions {
  src: string;
  rootMargin?: string;
  threshold?: number;
}

interface NetworkInformation {
  saveData?: boolean;
  effectiveType?: string;
}

/**
 * Defers loading a below-the-fold background video until it nears the
 * viewport, then plays/pauses it as it enters/leaves. Skips loading entirely
 * on data-saver or slow connections, leaving the poster frame as fallback.
 */
export function useInViewVideo({ src, rootMargin = '200px 0px', threshold = 0.15 }: UseInViewVideoOptions) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    video.muted = true;

    const connection = (navigator as Navigator & { connection?: NetworkInformation }).connection;
    if (connection?.saveData || /2g/.test(connection?.effectiveType ?? '')) {
      return;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let loaded = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!loaded) {
            video.src = src;
            video.load();
            loaded = true;
          }
          if (!prefersReducedMotion) video.play().catch(() => {});
        } else if (loaded) {
          video.pause();
        }
      },
      { rootMargin, threshold }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [src, rootMargin, threshold]);

  return ref;
}
