'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface StatsCounterProps {
  target: number;
  suffix?: string;
  label: string;
  decimals?: number;
  duration?: number;
  className?: string;
}

export default function StatsCounter({
  target,
  suffix = '',
  label,
  decimals = 0,
  duration = 2000,
  className,
}: StatsCounterProps) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [hasAnimated]);

  useEffect(() => {
    if (!hasAnimated) return;

    const startTime = performance.now();

    function animate(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(eased * target);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }

    requestAnimationFrame(animate);
  }, [hasAnimated, target, duration]);

  const displayValue = decimals > 0 ? count.toFixed(decimals) : Math.floor(count).toString();

  return (
    <div ref={ref} className={cn('text-center', className)}>
      <div className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight">
        {displayValue}
        {suffix}
      </div>
      <div className="mt-2 text-sm md:text-base text-zinc-400 uppercase tracking-widest">
        {label}
      </div>
    </div>
  );
}
