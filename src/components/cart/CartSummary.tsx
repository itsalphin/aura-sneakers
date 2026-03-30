'use client';

import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { formatPrice } from '@/lib/utils';
import { useCartStore } from '@/stores/cartStore';
import { ArrowRight, ShoppingBag } from 'lucide-react';

interface CartSummaryProps {
  className?: string;
  readOnly?: boolean;
  discount?: number;
}

export default function CartSummary({ className, readOnly = false, discount = 0 }: CartSummaryProps) {
  const items = useCartStore((s) => s.items);
  const getTotalPrice = useCartStore((s) => s.getTotalPrice);

  const subtotal = getTotalPrice();
  const discountAmount = subtotal * (discount / 100);
  const afterDiscount = subtotal - discountAmount;
  const shipping = afterDiscount >= 200 ? 0 : 12;
  const tax = afterDiscount * 0.08;
  const total = afterDiscount + shipping + tax;

  return (
    <div
      className={cn(
        'rounded-2xl bg-white/[0.03] border border-white/10 p-6',
        className
      )}
    >
      <h3 className="text-sm font-semibold text-white uppercase tracking-widest mb-6">
        Order Summary
      </h3>

      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-white/50">Subtotal ({items.length} items)</span>
          <span className="text-white">{formatPrice(subtotal)}</span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-emerald-400">Discount ({discount}%)</span>
            <span className="text-emerald-400">-{formatPrice(discountAmount)}</span>
          </div>
        )}

        <div className="flex justify-between text-sm">
          <span className="text-white/50">Shipping</span>
          <span className={cn('text-white', shipping === 0 && 'text-emerald-400')}>
            {shipping === 0 ? 'Free' : formatPrice(shipping)}
          </span>
        </div>

        {shipping === 0 && (
          <p className="text-[10px] text-emerald-400/70 uppercase tracking-wider">
            Free shipping on orders over $200
          </p>
        )}

        <div className="flex justify-between text-sm">
          <span className="text-white/50">Estimated Tax</span>
          <span className="text-white">{formatPrice(tax)}</span>
        </div>

        <div className="border-t border-white/10 pt-3 mt-3">
          <div className="flex justify-between items-center">
            <span className="text-base font-bold text-white uppercase tracking-wide">
              Total
            </span>
            <span className="text-xl font-bold text-white">
              {formatPrice(total)}
            </span>
          </div>
        </div>
      </div>

      {!readOnly && (
        <div className="mt-6 space-y-3">
          <Link
            href="/checkout"
            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-lg bg-gradient-to-r from-[var(--color-accent,#8B5CF6)] to-[#7C3AED] text-white text-sm font-semibold uppercase tracking-wider hover:from-[#9D6FFF] hover:to-[#8B5CF6] transition-all shadow-lg shadow-[var(--color-accent,#8B5CF6)]/20"
          >
            Proceed to Checkout
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/shop"
            className="flex items-center justify-center gap-2 w-full py-2.5 text-sm text-white/50 hover:text-white transition-colors"
          >
            <ShoppingBag className="w-4 h-4" />
            or continue shopping
          </Link>
        </div>
      )}
    </div>
  );
}
