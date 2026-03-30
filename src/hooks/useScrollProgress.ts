'use client';

import { useScroll, type MotionValue } from 'framer-motion';

interface ScrollProgressResult {
  scrollProgress: MotionValue<number>;
  scrollY: MotionValue<number>;
}

export function useScrollProgress(): ScrollProgressResult {
  const { scrollYProgress, scrollY } = useScroll();

  return {
    scrollProgress: scrollYProgress,
    scrollY,
  };
}
