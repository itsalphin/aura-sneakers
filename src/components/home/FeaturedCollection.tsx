'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';
import { formatPrice } from '@/lib/utils';
import { featuredProducts } from '@/lib/mockData';
import { ShoppingBag } from 'lucide-react';
import { BLUR_DATA_URL } from '@/lib/constants';

export default function FeaturedCollection() {
  const titleRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isTitleInView = useInView(titleRef, { once: true, margin: '-100px' });
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    function handleScroll() {
      if (!el) return;
      const maxScroll = el.scrollWidth - el.clientWidth;
      if (maxScroll <= 0) {
        setScrollProgress(0);
        return;
      }
      setScrollProgress(el.scrollLeft / maxScroll);
    }

    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative py-24 md:py-32 bg-black overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        {/* Title */}
        <div ref={titleRef} className="mb-12 md:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-6xl lg:text-8xl font-black uppercase tracking-tighter text-white"
          >
            The Collection
          </motion.h2>
        </div>
      </div>

      {/* Horizontal scrolling container */}
      <div
        ref={scrollRef}
        className={cn(
          'flex gap-6 overflow-x-auto pb-8 px-6 md:px-12 lg:px-20',
          'scrollbar-none cursor-grab active:cursor-grabbing',
          '[&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'
        )}
      >
        {featuredProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 30 }}
            animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="group flex-shrink-0 w-[280px] md:w-[340px] lg:w-[380px]"
          >
            <div className="relative aspect-square bg-zinc-900 rounded-lg overflow-hidden mb-4">
              {/* Product image */}
              {product.images[0] && (
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 280px, (max-width: 1024px) 340px, 380px"
                  placeholder="blur"
                  blurDataURL={BLUR_DATA_URL}
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              )}

              {/* Tags */}
              {product.tags.length > 0 && (
                <div className="absolute top-3 left-3 flex gap-2">
                  {product.tags.includes('new') && (
                    <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider bg-violet-600 text-white rounded">
                      New
                    </span>
                  )}
                  {product.tags.includes('limited') && (
                    <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider bg-amber-600 text-white rounded">
                      Limited
                    </span>
                  )}
                </div>
              )}

              {/* Hover overlay */}
              <div className="absolute inset-0 flex items-end justify-center p-4 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className="w-full flex items-center justify-center gap-2 py-3 bg-white text-black text-sm font-bold uppercase tracking-wider hover:bg-zinc-200 transition-colors">
                  <ShoppingBag className="w-4 h-4" />
                  Add to Cart
                </button>
              </div>
            </div>

            {/* Product info */}
            <div>
              <h3 className="text-white font-semibold text-sm md:text-base uppercase tracking-wide">
                {product.name}
              </h3>
              <div className="mt-1 flex items-center gap-3">
                <span className="text-white font-medium">{formatPrice(product.price)}</span>
                {product.comparePrice && (
                  <span className="text-zinc-500 line-through text-sm">
                    {formatPrice(product.comparePrice)}
                  </span>
                )}
              </div>
              <div className="mt-2 flex gap-1.5">
                {product.colors.map((color) => (
                  <div
                    key={color.id}
                    className="w-4 h-4 rounded-full border border-zinc-700"
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Progress bar */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 mt-8">
        <div className="h-[2px] bg-zinc-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-violet-500 rounded-full"
            style={{ width: `${Math.max(scrollProgress * 100, 5)}%` }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          />
        </div>
      </div>
    </section>
  );
}
