'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/stores/cartStore';
import CheckoutForm from '@/components/checkout/CheckoutForm';
import CartSummary from '@/components/cart/CartSummary';

export default function CheckoutPage() {
  const items = useCartStore((s) => s.items);

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
              Add some items to your cart before checking out.
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
        <h1 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-10">
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          <div className="lg:col-span-2">
            <CheckoutForm />
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-32">
              <CartSummary readOnly />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
