'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';
import { testimonials } from '@/lib/mockData';
import { Star } from 'lucide-react';

export default function Testimonials() {
  const titleRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isTitleInView = useInView(titleRef, { once: true, margin: '-100px' });
  const [isPaused, setIsPaused] = useState(false);

  // Auto-scroll
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let animationId: number;
    let lastTimestamp: number | null = null;

    function step(timestamp: number) {
      if (!el) return;
      if (lastTimestamp === null) lastTimestamp = timestamp;

      if (!isPaused) {
        const delta = timestamp - lastTimestamp;
        el.scrollLeft += delta * 0.03;

        // Reset when reaching the end
        if (el.scrollLeft >= el.scrollWidth - el.clientWidth - 1) {
          el.scrollLeft = 0;
        }
      }

      lastTimestamp = timestamp;
      animationId = requestAnimationFrame(step);
    }

    animationId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationId);
  }, [isPaused]);

  return (
    <section className="py-24 md:py-32 bg-black overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        <div ref={titleRef} className="mb-12 md:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-6xl lg:text-8xl font-black uppercase tracking-tighter text-white"
          >
            What They Say
          </motion.h2>
        </div>
      </div>

      {/* Carousel */}
      <div
        ref={scrollRef}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className={cn(
          'flex gap-6 overflow-x-auto px-6 md:px-12 lg:px-20 pb-4',
          '[&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'
        )}
      >
        {/* Duplicate for seamless loop */}
        {[...testimonials, ...testimonials].map((testimonial, index) => (
          <motion.div
            key={`${testimonial.id}-${index}`}
            initial={{ opacity: 0, y: 30 }}
            animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: (index % testimonials.length) * 0.1 }}
            className={cn(
              'flex-shrink-0 w-[320px] md:w-[400px] p-8',
              'bg-zinc-950 border border-zinc-800/50 rounded-lg',
              'flex flex-col justify-between'
            )}
          >
            {/* Quote mark */}
            <div className="mb-4">
              <span className="text-5xl font-serif text-violet-500/30 leading-none">&ldquo;</span>
            </div>

            {/* Review text */}
            <p className="text-zinc-300 text-base leading-relaxed mb-6 flex-1">
              {testimonial.comment}
            </p>

            {/* Footer */}
            <div>
              {/* Stars */}
              <div className="flex gap-1 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      'w-4 h-4',
                      i < testimonial.rating
                        ? 'fill-amber-400 text-amber-400'
                        : 'fill-zinc-700 text-zinc-700'
                    )}
                  />
                ))}
              </div>

              <div className="text-white font-semibold text-sm">{testimonial.name}</div>
              <div className="text-zinc-500 text-xs mt-0.5">{testimonial.product}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
