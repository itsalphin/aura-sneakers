'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/Skeleton';
import ProductCard from './ProductCard';
import type { Product } from '@/types/product';

interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
}

export default function ProductGrid({ products, isLoading = false }: ProductGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-6 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="space-y-4">
            <Skeleton variant="image" className="aspect-square rounded-xl" />
            <div className="space-y-2">
              <Skeleton variant="text" lines={1} width="40%" />
              <Skeleton variant="text" lines={1} width="70%" />
              <Skeleton variant="text" lines={1} width="30%" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
        <p className="text-lg font-medium text-white/60">No products found</p>
        <p className="mt-2 text-sm text-zinc-500">
          Try adjusting your filters to find what you&apos;re looking for.
        </p>
      </div>
    );
  }

  return (
    <motion.div
      layout
      className="grid grid-cols-2 gap-6 lg:grid-cols-3"
    >
      <AnimatePresence mode="popLayout">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
