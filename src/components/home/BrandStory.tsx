'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import StatsCounter from './StatsCounter';
import { brandImages } from '@/lib/mockData';

const stats = [
  { target: 50000, suffix: '+', label: 'Pairs Sold' },
  { target: 120, suffix: '+', label: 'Countries' },
  { target: 4.9, suffix: '', label: 'Rating', decimals: 1 },
  { target: 24, suffix: 'HR', label: 'Support' },
];

export default function BrandStory() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="relative py-24 md:py-32 bg-black overflow-hidden">
      {/* Atmospheric background image */}
      <div className="absolute inset-0">
        <Image
          src={brandImages.craftsmanship}
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-15"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/70 to-black" />
      </div>

      {/* Violet glow accent */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background:
            'radial-gradient(ellipse 50% 50% at 50% 50%, rgba(124, 58, 237, 0.25), transparent)',
        }}
      />

      <div ref={ref} className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl md:text-6xl lg:text-8xl font-black uppercase tracking-tighter text-white text-center mb-16 md:mb-24"
        >
          Crafted With
          <br />
          Obsession
        </motion.h2>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-16 md:mb-24">
          {stats.map((stat) => (
            <StatsCounter
              key={stat.label}
              target={stat.target}
              suffix={stat.suffix}
              label={stat.label}
              decimals={stat.decimals}
            />
          ))}
        </div>

        {/* Brand paragraph */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-2xl mx-auto text-center"
        >
          <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
            Every pair of AURA sneakers is the result of relentless iteration, premium materials,
            and an obsession with the details others overlook. From the curve of the sole to the
            tension in every stitch, we engineer footwear that doesn&apos;t just perform — it makes
            a statement. This is more than a brand. This is a movement.
          </p>
        </motion.div>

        {/* Atmospheric image strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 grid grid-cols-3 gap-3 md:gap-4"
        >
          {([brandImages.urban, brandImages.materials, brandImages.lineup] as const).map((src, i) => (
            <div key={i} className="relative aspect-[4/3] rounded-lg overflow-hidden">
              <Image
                src={src}
                alt=""
                fill
                sizes="(max-width: 768px) 33vw, 400px"
                className="object-cover opacity-70 hover:opacity-90 transition-opacity duration-500"
                aria-hidden="true"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
