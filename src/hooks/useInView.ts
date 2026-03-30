'use client';

import { useEffect, useRef, useState, useCallback, type RefObject } from 'react';

interface UseInViewOptions {
  threshold?: number;
  triggerOnce?: boolean;
  rootMargin?: string;
}

export function useInView<T extends HTMLElement = HTMLElement>(
  options: UseInViewOptions = {}
): [RefObject<T | null>, boolean] {
  const { threshold = 0, triggerOnce = false, rootMargin = '0px' } = options;
  const ref = useRef<T | null>(null);
  const [isInView, setIsInView] = useState(false);
  const triggered = useRef(false);

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      const inView = entry.isIntersecting;

      if (triggerOnce && triggered.current) {
        return;
      }

      if (inView && triggerOnce) {
        triggered.current = true;
      }

      setIsInView(inView);
    },
    [triggerOnce]
  );

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(handleIntersection, {
      threshold,
      rootMargin,
    });

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, handleIntersection]);

  return [ref, isInView];
}
