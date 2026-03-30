'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import type { ProductSize } from '@/types/product';

interface SizeSelectorProps {
  sizes: ProductSize[];
  selectedSize: string | null;
  onSelect: (size: string) => void;
}

export default function SizeSelector({ sizes, selectedSize, onSelect }: SizeSelectorProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-white/90">Size</span>
        {selectedSize && (
          <span className="text-xs text-zinc-500">US {selectedSize}</span>
        )}
      </div>
      <div className="grid grid-cols-4 gap-2">
        {sizes.map((s) => {
          const isSelected = selectedSize === s.size;
          const isAvailable = s.inStock;

          return (
            <button
              key={s.id}
              disabled={!isAvailable}
              onClick={() => onSelect(isSelected ? '' : s.size)}
              aria-label={`Size ${s.size}${!isAvailable ? ' - out of stock' : ''}`}
              className={cn(
                'relative flex items-center justify-center rounded-lg border py-3 text-sm font-medium transition-all duration-200',
                isSelected
                  ? 'border-[var(--color-accent,#8B5CF6)] bg-[var(--color-accent,#8B5CF6)]/10 text-white'
                  : isAvailable
                    ? 'border-white/10 text-white/70 hover:border-white/30 hover:text-white'
                    : 'border-white/5 text-white/20 cursor-not-allowed'
              )}
            >
              {!isAvailable && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-px w-[calc(100%-16px)] rotate-[-18deg] bg-white/15" />
                </div>
              )}
              <span className={cn(!isAvailable && 'line-through')}>{s.size}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
