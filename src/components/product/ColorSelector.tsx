'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import type { ProductColor } from '@/types/product';

interface ColorSelectorProps {
  colors: ProductColor[];
  selectedColor: string | null;
  onSelect: (colorId: string) => void;
}

export default function ColorSelector({ colors, selectedColor, onSelect }: ColorSelectorProps) {
  const [hoveredColor, setHoveredColor] = useState<string | null>(null);

  const displayName = hoveredColor
    ? colors.find((c) => c.id === hoveredColor)?.name
    : selectedColor
      ? colors.find((c) => c.id === selectedColor)?.name
      : null;

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-white/90">Color</span>
        {displayName && (
          <span className="text-xs text-zinc-500">{displayName}</span>
        )}
      </div>
      <div className="flex items-center gap-3">
        {colors.map((color) => {
          const isSelected = selectedColor === color.id;

          return (
            <button
              key={color.id}
              onClick={() => onSelect(color.id)}
              onMouseEnter={() => setHoveredColor(color.id)}
              onMouseLeave={() => setHoveredColor(null)}
              aria-label={`Select color ${color.name}`}
              className={cn(
                'relative h-8 w-8 rounded-full transition-all duration-200',
                isSelected
                  ? 'ring-2 ring-white ring-offset-2 ring-offset-[#0a0a0a]'
                  : 'ring-1 ring-white/10 hover:ring-white/40'
              )}
              style={{ backgroundColor: color.hex }}
            >
              {color.hex.toUpperCase() === '#FFFFFF' && (
                <div className="absolute inset-0 rounded-full border border-white/20" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
