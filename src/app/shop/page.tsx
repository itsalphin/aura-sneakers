'use client';

import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { products } from '@/lib/mockData';
import ProductGrid from '@/components/product/ProductGrid';
import FilterSidebar from '@/components/product/FilterSidebar';
import QuickView from '@/components/product/QuickView';

export default function ShopPage() {
  const searchParams = useSearchParams();

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search query filter
    const query = searchParams.get('q');
    if (query) {
      const q = query.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.name.toLowerCase().includes(q)
      );
    }

    // Category filter
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      const cats = categoryParam.split(',').filter(Boolean);
      if (cats.length > 0) {
        result = result.filter((p) => cats.includes(p.category.slug));
      }
    }

    // Size filter
    const sizeParam = searchParams.get('size');
    if (sizeParam) {
      const sizes = sizeParam.split(',').filter(Boolean);
      if (sizes.length > 0) {
        result = result.filter((p) =>
          p.sizes.some((s) => sizes.includes(s.size) && s.inStock)
        );
      }
    }

    // Color filter
    const colorParam = searchParams.get('color');
    if (colorParam) {
      const colors = colorParam.split(',').filter(Boolean);
      if (colors.length > 0) {
        result = result.filter((p) =>
          p.colors.some((c) => colors.includes(c.name.toLowerCase()))
        );
      }
    }

    // Price filter
    const priceParam = searchParams.get('price');
    if (priceParam) {
      const [minStr, maxStr] = priceParam.split('-');
      const min = Number(minStr);
      const max = Number(maxStr);
      if (!isNaN(min) && !isNaN(max)) {
        result = result.filter((p) => p.price >= min && p.price <= max);
      }
    }

    // Sort
    const sort = searchParams.get('sort') ?? 'featured';
    switch (sort) {
      case 'newest':
        result.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
      case 'featured':
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }

    return result;
  }, [searchParams]);

  return (
    <main className="min-h-screen bg-[var(--color-bg-primary,#050505)]">
      <div className="mx-auto max-w-7xl px-4 pt-28 pb-12 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <h1 className="text-5xl font-bold uppercase tracking-tight text-white sm:text-6xl">
            Shop
          </h1>
          <p className="mt-3 text-sm text-zinc-500">
            Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
          </p>
        </motion.div>

        {/* Layout */}
        <div className="flex gap-10">
          {/* Desktop sidebar */}
          <FilterSidebar className="w-64 shrink-0" />

          {/* Products */}
          <div className="flex-1">
            {/* Mobile filter button row */}
            <div className="mb-6 lg:hidden">
              <FilterSidebar />
            </div>

            <ProductGrid products={filteredProducts} />
          </div>
        </div>
      </div>

      {/* Quick View modal */}
      <QuickView />
    </main>
  );
}
