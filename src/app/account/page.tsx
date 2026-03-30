'use client';

import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { formatPrice } from '@/lib/utils';
import {
  User,
  Package,
  Heart,
  MapPin,
  Settings,
  ShoppingBag,
  ChevronRight,
  Clock,
  LogOut,
} from 'lucide-react';
import { useWishlistStore } from '@/stores/wishlistStore';

const NAV_ITEMS = [
  { label: 'Overview', href: '/account', icon: User },
  { label: 'Orders', href: '/account/orders', icon: Package },
  { label: 'Wishlist', href: '/account/wishlist', icon: Heart },
  { label: 'Addresses', href: '/account', icon: MapPin },
  { label: 'Settings', href: '/account', icon: Settings },
];

const MOCK_ORDERS = [
  {
    id: 'AURA-M4X2K1-9FJ2',
    date: '2026-03-15',
    status: 'Delivered',
    total: 289.0,
    items: 2,
  },
  {
    id: 'AURA-K8N3P5-2HL7',
    date: '2026-03-22',
    status: 'Shipped',
    total: 195.0,
    items: 1,
  },
  {
    id: 'AURA-R1T6W9-4BQ8',
    date: '2026-03-28',
    status: 'Processing',
    total: 425.0,
    items: 3,
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

export default function AccountPage() {
  const wishlistItems = useWishlistStore((s) => s.items);

  return (
    <main className="min-h-screen bg-[var(--color-bg-primary,#050505)] pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - becomes horizontal tabs on mobile */}
          <aside className="lg:col-span-1">
            <nav className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 -mx-4 px-4 lg:mx-0 lg:px-0">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = item.href === '/account';
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={cn(
                      'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium whitespace-nowrap transition-all',
                      isActive
                        ? 'bg-white/10 text-white'
                        : 'text-white/40 hover:text-white hover:bg-white/5'
                    )}
                  >
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    {item.label}
                  </Link>
                );
              })}

              {/* Logout */}
              <div className="hidden lg:block mt-4 pt-4 border-t border-white/10">
                <Link
                  href="/auth/login"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-400/70 hover:text-red-400 hover:bg-red-500/10 transition-all"
                >
                  <LogOut className="w-4 h-4 flex-shrink-0" />
                  Log Out
                </Link>
              </div>
            </nav>
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Welcome */}
            <div>
              <h1 className="text-3xl font-black text-white uppercase tracking-tight mb-2">
                Welcome back, User
              </h1>
              <p className="text-white/40">
                Manage your orders, wishlist, and account settings.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="rounded-xl bg-white/[0.03] border border-white/10 p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-[var(--color-accent,#8B5CF6)]/15 flex items-center justify-center">
                    <Package className="w-4 h-4 text-[var(--color-accent,#8B5CF6)]" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-white">{MOCK_ORDERS.length}</p>
                <p className="text-xs text-white/40 uppercase tracking-wider mt-1">
                  Total Orders
                </p>
              </div>

              <div className="rounded-xl bg-white/[0.03] border border-white/10 p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-pink-500/15 flex items-center justify-center">
                    <Heart className="w-4 h-4 text-pink-400" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-white">{wishlistItems.length}</p>
                <p className="text-xs text-white/40 uppercase tracking-wider mt-1">
                  Wishlist Items
                </p>
              </div>

              <div className="rounded-xl bg-white/[0.03] border border-white/10 p-5 col-span-2 sm:col-span-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-500/15 flex items-center justify-center">
                    <ShoppingBag className="w-4 h-4 text-emerald-400" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-white">
                  {formatPrice(MOCK_ORDERS.reduce((sum, o) => sum + o.total, 0))}
                </p>
                <p className="text-xs text-white/40 uppercase tracking-wider mt-1">
                  Total Spent
                </p>
              </div>
            </div>

            {/* Recent Orders */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold text-white uppercase tracking-widest">
                  Recent Orders
                </h2>
                <Link
                  href="/account/orders"
                  className="text-xs text-[var(--color-accent,#8B5CF6)] hover:text-[#9D6FFF] transition-colors flex items-center gap-1"
                >
                  View All
                  <ChevronRight className="w-3 h-3" />
                </Link>
              </div>

              <div className="space-y-3">
                {MOCK_ORDERS.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between rounded-xl bg-white/[0.03] border border-white/10 p-4 hover:bg-white/[0.05] transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                        <Package className="w-5 h-5 text-white/30" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white font-mono">
                          {order.id}
                        </p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <Clock className="w-3 h-3 text-white/30" />
                          <span className="text-xs text-white/40">{order.date}</span>
                          <span className="text-xs text-white/30">
                            {order.items} {order.items === 1 ? 'item' : 'items'}
                          </span>
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
                      <span className="text-sm font-semibold text-white min-w-[80px] text-right">
                        {formatPrice(order.total)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link
                href="/account/orders"
                className="flex items-center justify-between rounded-xl bg-white/[0.03] border border-white/10 p-5 hover:bg-white/[0.05] transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <Package className="w-5 h-5 text-white/40" />
                  <span className="text-sm font-medium text-white">View All Orders</span>
                </div>
                <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-white/50 transition-colors" />
              </Link>

              <Link
                href="/account/wishlist"
                className="flex items-center justify-between rounded-xl bg-white/[0.03] border border-white/10 p-5 hover:bg-white/[0.05] transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <Heart className="w-5 h-5 text-white/40" />
                  <span className="text-sm font-medium text-white">Your Wishlist</span>
                </div>
                <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-white/50 transition-colors" />
              </Link>
            </div>

            {/* Mobile Logout */}
            <div className="lg:hidden pt-4 border-t border-white/10">
              <Link
                href="/auth/login"
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-400/70 hover:text-red-400 hover:bg-red-500/10 transition-all"
              >
                <LogOut className="w-4 h-4 flex-shrink-0" />
                Log Out
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
