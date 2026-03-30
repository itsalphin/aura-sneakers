'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

export function useSmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    // Integrate with GSAP ScrollTrigger if available
    try {
      const gsapModule = require('gsap/ScrollTrigger');
      const ScrollTrigger = gsapModule.ScrollTrigger;
      if (ScrollTrigger) {
        lenis.on('scroll', () => {
          ScrollTrigger.update();
        });
      }
    } catch {
      // GSAP ScrollTrigger not available, skip integration
    }

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const frameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frameId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return lenisRef;
}
