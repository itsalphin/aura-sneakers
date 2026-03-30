'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import type { Collection } from '@/lib/collections';
import type { Product } from '@/types/product';
import ProductGrid from '@/components/product/ProductGrid';
import QuickView from '@/components/product/QuickView';

interface Props {
  collection: Collection;
  products: Product[];
}

export default function CollectionDetailClient({ collection, products }: Props) {
  return (
    <main className="min-h-screen bg-[var(--color-bg-primary,#050505)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            href="/collections"
            className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors mb-10"
          >
            <ArrowLeft className="w-4 h-4" />
            All Collections
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14"
        >
          <p className="text-xs text-[var(--color-accent,#8B5CF6)] uppercase tracking-[0.3em] mb-4 font-mono">
            Collection
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white mb-4">
            {collection.name}
          </h1>
          <p className="text-white/50 text-base md:text-lg max-w-2xl leading-relaxed">
            {collection.description}
          </p>
          <p className="mt-4 text-sm text-white/30">
            {products.length} {products.length === 1 ? 'piece' : 'pieces'}
          </p>
        </motion.div>

        {/* Product Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <ProductGrid products={products} />
        </motion.div>
      </div>

      <QuickView />
    </main>
  );
}
