'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Cpu, Gem } from 'lucide-react';
import StatsCounter from '@/components/home/StatsCounter';
import AboutVideo from '@/components/about/AboutVideo';

const PROCESS_STEPS = [
  {
    icon: Compass,
    title: 'Design',
    description:
      'Every silhouette begins with a vision. Our design team draws from architecture, nature, and street culture to craft sneakers that transcend trends.',
  },
  {
    icon: Cpu,
    title: 'Engineer',
    description:
      'Precision meets innovation. We utilize cutting-edge materials and ergonomic research to build footwear that performs as beautifully as it looks.',
  },
  {
    icon: Gem,
    title: 'Perfect',
    description:
      'Obsessive attention to detail. Each pair undergoes rigorous quality testing to ensure it meets the uncompromising standards of the AURA name.',
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' as const },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[var(--color-bg-primary,#050505)]">
      {/* Hero */}
      <section className="relative flex items-center justify-center min-h-[70vh] px-4 overflow-hidden">
        <AboutVideo src="/videos/about-bg.mp4" mode="background" />
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background: 'radial-gradient(ellipse 60% 50% at 50% 60%, rgba(109,40,217,0.15) 0%, transparent 70%)',
          }}
        />
        <div className="absolute inset-0 z-10" />

        <div className="relative z-20 text-center max-w-4xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-xs text-[var(--color-accent,#8B5CF6)] uppercase tracking-[0.3em] mb-6"
          >
            Est. 2024
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white uppercase tracking-tight leading-[0.9]"
          >
            The Aura
            <br />
            Story
          </motion.h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="w-16 h-px bg-gradient-to-r from-transparent via-[var(--color-accent,#8B5CF6)] to-transparent mx-auto mt-8"
          />
        </div>
      </section>

      {/* Brand Origin */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <motion.p
              {...fadeUp}
              transition={{ duration: 0.5 }}
              className="text-xs text-[var(--color-accent,#8B5CF6)] uppercase tracking-[0.3em] mb-4"
            >
              Our Origin
            </motion.p>
            <motion.h2
              {...fadeUp}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-6 leading-tight"
            >
              Born from the
              <br />
              streets, refined
              <br />
              by obsession
            </motion.h2>
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4 text-white/50 text-base leading-relaxed"
            >
              <p>
                AURA was founded on a simple belief: footwear should be an extension of
                identity. We saw a market saturated with mass production and decided to
                take a different path.
              </p>
              <p>
                Every collection we release is a limited edition, crafted with premium
                materials and designed to make a statement. We don&apos;t follow
                trends&mdash;we set them.
              </p>
              <p>
                From our studio in downtown, we work with artisans and engineers to push
                the boundaries of what a sneaker can be. The result is footwear that
                commands attention.
              </p>
            </motion.div>
          </div>

          {/* Video panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-white/10"
          >
            <AboutVideo src="/videos/about-panel.mp4" mode="panel" className="absolute inset-0" />
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[var(--color-bg-primary,#050505)] to-transparent pointer-events-none" />
          </motion.div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.p
            {...fadeUp}
            transition={{ duration: 0.5 }}
            className="text-xs text-[var(--color-accent,#8B5CF6)] uppercase tracking-[0.3em] mb-8"
          >
            Our Mission
          </motion.p>
          <motion.h2
            {...fadeUp}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight tracking-tight"
          >
            To create footwear that doesn&apos;t just{' '}
            <span className="text-[var(--color-accent,#8B5CF6)]">follow culture</span>
            &mdash;it{' '}
            <span className="text-[var(--color-accent,#8B5CF6)]">defines it</span>.
          </motion.h2>
          <motion.p
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-white/40 mt-8 max-w-2xl mx-auto leading-relaxed"
          >
            We believe in the power of limited releases, premium craftsmanship, and
            designs that push boundaries. Every pair tells a story.
          </motion.p>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <motion.p
              {...fadeUp}
              transition={{ duration: 0.5 }}
              className="text-xs text-[var(--color-accent,#8B5CF6)] uppercase tracking-[0.3em] mb-4"
            >
              How We Work
            </motion.p>
            <motion.h2
              {...fadeUp}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight"
            >
              Our Process
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PROCESS_STEPS.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="relative rounded-2xl bg-white/[0.03] border border-white/10 p-8 text-center group hover:bg-white/[0.05] hover:border-white/15 transition-all"
                >
                  <div className="absolute top-4 right-4 text-7xl font-black text-white/[0.03]">
                    {String(index + 1).padStart(2, '0')}
                  </div>

                  <div className="w-14 h-14 rounded-xl bg-[var(--color-accent,#8B5CF6)]/10 border border-[var(--color-accent,#8B5CF6)]/20 flex items-center justify-center mx-auto mb-6 group-hover:bg-[var(--color-accent,#8B5CF6)]/15 transition-colors">
                    <Icon className="w-6 h-6 text-[var(--color-accent,#8B5CF6)]" />
                  </div>

                  <h3 className="text-lg font-bold text-white uppercase tracking-wider mb-3">
                    {step.title}
                  </h3>
                  <p className="text-sm text-white/40 leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 px-4 border-t border-white/5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatsCounter target={50} suffix="K+" label="Pairs Sold" />
            <StatsCounter target={120} suffix="+" label="Countries" />
            <StatsCounter target={98} suffix="%" label="Satisfaction" decimals={0} />
            <StatsCounter target={25} suffix="+" label="Collections" />
          </div>
        </motion.div>
      </section>

      <div className="h-20" />
    </main>
  );
}
