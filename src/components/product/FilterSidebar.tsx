'use client';

import { useCallback, useState, useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { X, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { categories } from '@/lib/mockData';

const SIZES = ['7', '8', '9', '10', '11', '12', '13'];

const PRICE_RANGES = [
  { label: '$0 - $100', min: 0, max: 100 },
  { label: '$100 - $200', min: 100, max: 200 },
  { label: '$200 - $300', min: 200, max: 300 },
  { label: '$300+', min: 300, max: 9999 },
];

const SORT_OPTIONS = [
  { label: 'Featured', value: 'featured' },
  { label: 'Newest', value: 'newest' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Best Rating', value: 'rating' },
];

const COLORS = [
  { name: 'Black', hex: '#000000' },
  { name: 'White', hex: '#FFFFFF' },
  { name: 'Crimson', hex: '#DC143C' },
  { name: 'Navy', hex: '#1B1B3A' },
  { name: 'Volt', hex: '#CDFF00' },
  { name: 'Silver', hex: '#C0C0C0' },
  { name: 'Purple', hex: '#7B2FBE' },
];

interface FilterSidebarProps {
  className?: string;
}

export default function FilterSidebar({ className }: FilterSidebarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Read current filters from URL
  const selectedCategories = searchParams.get('category')?.split(',').filter(Boolean) ?? [];
  const selectedSizes = searchParams.get('size')?.split(',').filter(Boolean) ?? [];
  const selectedColors = searchParams.get('color')?.split(',').filter(Boolean) ?? [];
  const selectedPrice = searchParams.get('price') ?? '';
  const selectedSort = searchParams.get('sort') ?? 'featured';

  const updateParams = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      startTransition(() => {
        router.push(`/shop?${params.toString()}`, { scroll: false });
      });
    },
    [router, searchParams]
  );

  const toggleArrayParam = useCallback(
    (key: string, item: string, current: string[]) => {
      const next = current.includes(item)
        ? current.filter((v) => v !== item)
        : [...current, item];
      updateParams(key, next.join(','));
    },
    [updateParams]
  );

  const clearAll = () => {
    startTransition(() => {
      router.push('/shop', { scroll: false });
    });
  };

  const hasFilters =
    selectedCategories.length > 0 ||
    selectedSizes.length > 0 ||
    selectedColors.length > 0 ||
    selectedPrice !== '' ||
    selectedSort !== 'featured';

  const filterContent = (
    <div className="space-y-8">
      {/* Sort By */}
      <div>
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/50">
          Sort By
        </h3>
        <select
          value={selectedSort}
          onChange={(e) => updateParams('sort', e.target.value)}
          className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white/80 outline-none transition-colors focus:border-white/20"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-[#141414] text-white">
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Categories */}
      <div>
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/50">
          Categories
        </h3>
        <div className="space-y-2">
          {categories.map((cat) => (
            <label
              key={cat.id}
              className="flex cursor-pointer items-center gap-3 group"
            >
              <div
                className={cn(
                  'flex h-4 w-4 items-center justify-center rounded border transition-all duration-200',
                  selectedCategories.includes(cat.slug)
                    ? 'border-[var(--color-accent,#8B5CF6)] bg-[var(--color-accent,#8B5CF6)]'
                    : 'border-white/20 group-hover:border-white/40'
                )}
              >
                {selectedCategories.includes(cat.slug) && (
                  <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <input
                type="checkbox"
                className="sr-only"
                checked={selectedCategories.includes(cat.slug)}
                onChange={() => toggleArrayParam('category', cat.slug, selectedCategories)}
              />
              <span className="text-sm text-white/70 transition-colors group-hover:text-white/90">
                {cat.name}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Sizes */}
      <div>
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/50">
          Sizes
        </h3>
        <div className="grid grid-cols-4 gap-2">
          {SIZES.map((size) => (
            <button
              key={size}
              onClick={() => toggleArrayParam('size', size, selectedSizes)}
              className={cn(
                'rounded-lg border py-2 text-sm font-medium transition-all duration-200',
                selectedSizes.includes(size)
                  ? 'border-[var(--color-accent,#8B5CF6)] bg-[var(--color-accent,#8B5CF6)]/10 text-white'
                  : 'border-white/10 text-white/50 hover:border-white/30 hover:text-white/80'
              )}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Colors */}
      <div>
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/50">
          Colors
        </h3>
        <div className="flex flex-wrap gap-3">
          {COLORS.map((color) => (
            <button
              key={color.name}
              onClick={() => toggleArrayParam('color', color.name.toLowerCase(), selectedColors)}
              className={cn(
                'h-8 w-8 rounded-full transition-all duration-200',
                selectedColors.includes(color.name.toLowerCase())
                  ? 'ring-2 ring-white ring-offset-2 ring-offset-[#0a0a0a]'
                  : 'ring-1 ring-white/10 hover:ring-white/40',
                color.hex.toUpperCase() === '#FFFFFF' && 'border border-white/20'
              )}
              style={{ backgroundColor: color.hex }}
              title={color.name}
              aria-label={color.name}
            />
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/50">
          Price Range
        </h3>
        <div className="space-y-2">
          {PRICE_RANGES.map((range) => {
            const value = `${range.min}-${range.max}`;
            const isSelected = selectedPrice === value;

            return (
              <button
                key={value}
                onClick={() => updateParams('price', isSelected ? '' : value)}
                className={cn(
                  'block w-full rounded-lg border px-3 py-2 text-left text-sm transition-all duration-200',
                  isSelected
                    ? 'border-[var(--color-accent,#8B5CF6)] bg-[var(--color-accent,#8B5CF6)]/10 text-white'
                    : 'border-white/10 text-white/50 hover:border-white/30 hover:text-white/80'
                )}
              >
                {range.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Clear All */}
      {hasFilters && (
        <button
          onClick={clearAll}
          className="w-full rounded-lg border border-white/10 py-2.5 text-sm font-medium text-white/60 transition-all duration-200 hover:border-white/20 hover:text-white/90"
        >
          Clear All Filters
        </button>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className={cn('hidden lg:block', className)}>
        <div className="sticky top-24">{filterContent}</div>
      </aside>

      {/* Mobile filter button */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2.5 text-sm font-medium text-white/70 transition-all hover:border-white/20 hover:text-white lg:hidden"
      >
        <SlidersHorizontal className="h-4 w-4" />
        Filters
        {hasFilters && (
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-accent,#8B5CF6)] text-[10px] font-bold text-white">
            {selectedCategories.length + selectedSizes.length + selectedColors.length + (selectedPrice ? 1 : 0)}
          </span>
        )}
      </button>

      {/* Mobile slide-in panel */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden"
              onClick={() => setIsMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed inset-y-0 left-0 z-50 w-80 max-w-[85vw] overflow-y-auto bg-[#0a0a0a] border-r border-white/10 p-6 lg:hidden"
            >
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-lg font-bold text-white">Filters</h2>
                <button
                  onClick={() => setIsMobileOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-white/40 hover:bg-white/10 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              {filterContent}
              <div className="mt-8">
                <button
                  onClick={() => setIsMobileOpen(false)}
                  className="w-full rounded-lg bg-[var(--color-accent,#8B5CF6)] py-3 text-sm font-bold uppercase tracking-wider text-white transition-all hover:bg-[var(--color-accent,#8B5CF6)]/80"
                >
                  Apply Filters
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
