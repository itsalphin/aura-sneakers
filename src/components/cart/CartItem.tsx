'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatPrice } from '@/lib/utils';
import { useCartStore } from '@/stores/cartStore';
import type { CartItem as CartItemType } from '@/types';

interface CartItemProps {
  item: CartItemType;
  className?: string;
}

export default function CartItem({ item, className }: CartItemProps) {
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);

  return (
    <div
      className={cn(
        'flex items-start gap-4 py-6 border-b border-white/10 last:border-b-0',
        className
      )}
    >
      {/* Thumbnail */}
      <Link
        href={`/shop/${item.slug}`}
        className="relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden bg-white/5 group"
      >
        {item.image ? (
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center">
            <span className="text-white/20 text-xs uppercase tracking-wider">Aura</span>
          </div>
        )}
      </Link>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <Link
          href={`/shop/${item.slug}`}
          className="text-sm font-medium text-white hover:text-[var(--color-accent,#8B5CF6)] transition-colors line-clamp-1"
        >
          {item.name}
        </Link>

        <div className="flex items-center gap-3 mt-1">
          {item.size && (
            <span className="text-xs text-white/40 uppercase tracking-wider">
              Size: {item.size}
            </span>
          )}
          {item.color && (
            <span className="text-xs text-white/40 uppercase tracking-wider">
              Color: {item.color}
            </span>
          )}
        </div>

        {/* Quantity Controls */}
        <div className="flex items-center gap-2 mt-3">
          <button
            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
            disabled={item.quantity <= 1}
            className="w-7 h-7 rounded-md bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none transition-all"
            aria-label="Decrease quantity"
          >
            <Minus className="w-3 h-3" />
          </button>

          <span className="w-8 text-center text-sm font-medium text-white tabular-nums">
            {item.quantity}
          </span>

          <button
            onClick={() => updateQuantity(item.id, Math.min(10, item.quantity + 1))}
            disabled={item.quantity >= 10}
            className="w-7 h-7 rounded-md bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none transition-all"
            aria-label="Increase quantity"
          >
            <Plus className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Price and Remove */}
      <div className="flex flex-col items-end gap-2 flex-shrink-0">
        <span className="text-sm font-semibold text-white">
          {formatPrice(item.price * item.quantity)}
        </span>

        <button
          onClick={() => removeItem(item.id)}
          className="p-1.5 rounded-md text-white/30 hover:text-red-400 hover:bg-red-400/10 transition-all"
          aria-label="Remove item"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
