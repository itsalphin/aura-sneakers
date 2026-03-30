'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const VIDEO_SRC = '/videos/hero-sneaker.mp4';
const CLIP_DURATION = 5; // seconds mapped across the scroll range

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;

    // Pause — scroll drives currentTime manually
    video.pause();
    video.currentTime = 0;

    const scrub = () => {
      const sectionTop = section.offsetTop;
      const scrollable = section.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return;

      const progress = (window.scrollY - sectionTop) / scrollable;
      video.currentTime = Math.max(0, Math.min(1, progress)) * CLIP_DURATION;
    };

    const attach = () => {
      scrub();
      window.addEventListener('scroll', scrub, { passive: true });
    };

    if (video.readyState >= 1) {
      attach();
    } else {
      video.addEventListener('loadedmetadata', attach, { once: true });
    }

    return () => {
      window.removeEventListener('scroll', scrub);
    };
  }, []);

  return (
    // Outer scroll container — 250vh gives 150vh of scroll travel
    <div ref={sectionRef} style={{ height: '250vh' }}>

      {/* Sticky frame — stays pinned to top while user scrolls through outer div */}
      <div className="sticky top-0 h-screen overflow-hidden bg-black flex items-center">

        {/* VIDEO */}
        <video
          ref={videoRef}
          src={VIDEO_SRC}
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover z-0 scale-105"
          aria-hidden="true"
        />

        {/* Dark gradient overlay — heavier left for text legibility */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background:
              'linear-gradient(105deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.72) 40%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0.12) 100%)',
          }}
        />
        {/* Top fade — navbar blends into section */}
        <div
          className="absolute top-0 inset-x-0 h-40 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.65) 0%, transparent 100%)' }}
        />
        {/* Bottom fade */}
        <div
          className="absolute bottom-0 inset-x-0 h-32 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 100%)' }}
        />
        {/* Violet accent glow */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 45% 55% at 18% 55%, rgba(109,40,217,0.17) 0%, transparent 68%)',
          }}
        />

        {/* CONTENT */}
        <div className="relative z-20 w-full max-w-[1440px] mx-auto px-8 md:px-14 lg:px-20 pt-24 pb-20">

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="mb-6 flex items-center gap-3"
          >
            <span className="h-px w-8 bg-violet-400" />
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-violet-300">
              New Season · 2025
            </span>
          </motion.div>

          {/* Headline */}
          {(['Step', 'Into', 'The Future'] as const).map((word, i) => (
            <div key={word} className="overflow-hidden">
              <motion.h1
                initial={{ y: '105%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
                className={cn(
                  'text-[2.8rem] sm:text-[3.8rem] md:text-[5rem] lg:text-[6.2rem] xl:text-[7.5rem]',
                  'font-black uppercase tracking-tighter leading-[0.88]',
                  i === 2
                    ? 'bg-clip-text text-transparent bg-gradient-to-r from-white via-violet-200 to-violet-400'
                    : 'text-white'
                )}
              >
                {word}
              </motion.h1>
            </div>
          ))}

          {/* Subtext + CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.5 }}
            className="mt-8 max-w-sm"
          >
            <p className="text-base md:text-lg text-white/60 leading-relaxed">
              Engineered for those who move the culture forward.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <Link
                href="/shop"
                className={cn(
                  'inline-flex items-center gap-2 px-7 py-3.5',
                  'bg-violet-600 text-white text-sm font-semibold uppercase tracking-wider',
                  'transition-all duration-300 hover:bg-violet-500 active:scale-[0.98]'
                )}
              >
                Explore Collection →
              </Link>
              <Link
                href="/shop?view=new"
                className="text-sm text-white/50 hover:text-white transition-colors duration-200 underline underline-offset-4"
              >
                New Arrivals
              </Link>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.85 }}
            className="mt-12 flex items-center gap-10"
          >
            {[
              { value: '200+', label: 'Styles' },
              { value: '50K+', label: 'Customers' },
              { value: '4.9★', label: 'Rating' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-xl font-bold text-white leading-none">{stat.value}</p>
                <p className="mt-1 text-[10px] text-white/40 uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5"
        >
          <span className="text-[10px] text-white/30 uppercase tracking-widest">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown className="w-4 h-4 text-white/30" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
