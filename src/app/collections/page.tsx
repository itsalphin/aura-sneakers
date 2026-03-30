'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { collections } from '@/lib/collections';
import { products } from '@/lib/mockData';

export default function CollectionsPage() {
  return (
    <main className="min-h-screen bg-[var(--color-bg-primary,#050505)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h1 className="text-5xl font-bold uppercase tracking-tight text-white sm:text-6xl">
            Collections
          </h1>
          <p className="mt-3 text-sm text-zinc-500">
            Curated selections for every style and purpose.
          </p>
        </motion.div>

        {/* 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {collections.map((collection, index) => {
            const productCount = collection.productIds.filter((id) =>
              products.some((p) => p.id === id)
            ).length;

            return (
              <motion.div
                key={collection.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <Link
                  href={`/collections/${collection.slug}`}
                  className="group relative block overflow-hidden rounded-xl aspect-[4/3]"
                >
                  {/* Background image */}
                  <Image
                    src={collection.image}
                    alt={collection.name}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={index < 2}
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent group-hover:from-black/70 transition-all duration-500" />

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                    {/* Number tag */}
                    <p className="text-[10px] font-mono text-white/30 uppercase tracking-[0.3em] mb-2">
                      {String(index + 1).padStart(2, '0')}
                    </p>

                    {/* Name */}
                    <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white mb-1 transition-transform duration-500 group-hover:translate-x-1">
                      {collection.name}
                    </h2>

                    {/* Tagline + count */}
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-white/50 font-light">
                        {collection.tagline}
                      </p>
                      <span className="text-[10px] text-white/30 uppercase tracking-widest">
                        {productCount} pieces
                      </span>
                    </div>
                  </div>

                  {/* Arrow icon on hover */}
                  <div className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300">
                    <ArrowUpRight className="w-4 h-4 text-white" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
