'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, ArrowLeft } from 'lucide-react';
import { useCartStore } from '@/stores/cartStore';
import CartItem from '@/components/cart/CartItem';
import CartSummary from '@/components/cart/CartSummary';
import PromoCode from '@/components/cart/PromoCode';

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const [discount, setDiscount] = useState(0);

  const handlePromoApply = (_code: string, discountPercent: number) => {
    setDiscount(discountPercent);
  };

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-[var(--color-bg-primary,#050505)] pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mb-8">
              <ShoppingBag className="w-10 h-10 text-white/20" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-3">Your cart is empty</h1>
            <p className="text-white/40 mb-8 max-w-sm">
              Looks like you haven&apos;t added any sneakers to your cart yet.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-gradient-to-r from-[var(--color-accent,#8B5CF6)] to-[#7C3AED] text-white text-sm font-semibold uppercase tracking-wider hover:from-[#9D6FFF] hover:to-[#8B5CF6] transition-all shadow-lg shadow-[var(--color-accent,#8B5CF6)]/20"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--color-bg-primary,#050505)] pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <Link
              href="/shop"
              className="inline-flex items-center gap-1.5 text-xs text-white/40 hover:text-white transition-colors mb-4"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Shop
            </Link>
            <h1 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight">
              Your Cart
            </h1>
            <p className="text-sm text-white/40 mt-1">
              {items.length} {items.length === 1 ? 'item' : 'items'}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl bg-white/[0.02] border border-white/10 p-6">
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>

            {/* Promo Code */}
            <div className="mt-6">
              <PromoCode onApply={handlePromoApply} />
            </div>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-32">
              <CartSummary discount={discount} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
