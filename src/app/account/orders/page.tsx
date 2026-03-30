'use client';

import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { formatPrice } from '@/lib/utils';
import { Package, Clock, ChevronRight, ArrowLeft, ShoppingBag } from 'lucide-react';

const MOCK_ORDERS = [
  {
    id: 'AURA-M4X2K1-9FJ2',
    date: '2026-03-15',
    status: 'Delivered',
    total: 289.0,
    items: [
      { name: 'Air Max Phantom', quantity: 1, price: 189.0 },
      { name: 'Ultra Boost Noir', quantity: 1, price: 100.0 },
    ],
  },
  {
    id: 'AURA-K8N3P5-2HL7',
    date: '2026-03-22',
    status: 'Shipped',
    total: 195.0,
    items: [{ name: 'Yeezy Slide Onyx', quantity: 1, price: 195.0 }],
  },
  {
    id: 'AURA-R1T6W9-4BQ8',
    date: '2026-03-28',
    status: 'Processing',
    total: 425.0,
    items: [
      { name: 'Jordan 1 Retro High OG', quantity: 1, price: 180.0 },
      { name: 'Nike Dunk Low', quantity: 1, price: 120.0 },
      { name: 'Socks Pack', quantity: 1, price: 125.0 },
    ],
  },
];

function getStatusColor(status: string) {
  switch (status) {
    case 'Delivered':
      return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20';
    case 'Shipped':
      return 'bg-blue-500/15 text-blue-400 border-blue-500/20';
    case 'Processing':
      return 'bg-amber-500/15 text-amber-400 border-amber-500/20';
    default:
      return 'bg-white/10 text-white/50 border-white/10';
  }
}

export default function OrdersPage() {
  if (MOCK_ORDERS.length === 0) {
    return (
      <main className="min-h-screen bg-[var(--color-bg-primary,#050505)] pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mb-8">
              <ShoppingBag className="w-10 h-10 text-white/20" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-3">No orders yet</h1>
            <p className="text-white/40 mb-8 max-w-sm">
              Your order history will appear here once you make a purchase.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-gradient-to-r from-[var(--color-accent,#8B5CF6)] to-[#7C3AED] text-white text-sm font-semibold uppercase tracking-wider"
            >
              Start Shopping
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--color-bg-primary,#050505)] pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/account"
          className="inline-flex items-center gap-1.5 text-xs text-white/40 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Account
        </Link>

        <h1 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-10">
          Order History
        </h1>

        <div className="space-y-4">
          {MOCK_ORDERS.map((order) => (
            <div
              key={order.id}
              className="rounded-2xl bg-white/[0.03] border border-white/10 overflow-hidden hover:bg-white/[0.04] transition-colors"
            >
              {/* Order Header */}
              <div className="flex flex-wrap items-center justify-between gap-4 p-5 border-b border-white/5">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                    <Package className="w-5 h-5 text-white/30" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white font-mono">
                      {order.id}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <Clock className="w-3 h-3 text-white/30" />
                      <span className="text-xs text-white/40">{order.date}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span
                    className={cn(
                      'inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider',
                      getStatusColor(order.status)
                    )}
                  >
                    {order.status}
                  </span>
                  <span className="text-sm font-bold text-white">
                    {formatPrice(order.total)}
                  </span>
                </div>
              </div>

              {/* Order Items */}
              <div className="p-5 space-y-2">
                {order.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="text-white/60">
                      {item.name}
                      {item.quantity > 1 && (
                        <span className="text-white/30"> x{item.quantity}</span>
                      )}
                    </span>
                    <span className="text-white/70">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* View Details */}
              <div className="px-5 pb-4">
                <button className="flex items-center gap-1 text-xs text-[var(--color-accent,#8B5CF6)] hover:text-[#9D6FFF] transition-colors">
                  View Details
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
