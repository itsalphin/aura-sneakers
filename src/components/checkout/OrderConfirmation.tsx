'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { CheckCircle, Package, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ConfettiDot {
  id: number;
  left: number;
  delay: number;
  duration: number;
  color: string;
  size: number;
}

interface OrderConfirmationProps {
  orderNumber?: string;
  className?: string;
}

export default function OrderConfirmation({ orderNumber, className }: OrderConfirmationProps) {
  const [confetti, setConfetti] = useState<ConfettiDot[]>([]);

  useEffect(() => {
    const colors = ['#8B5CF6', '#7C3AED', '#A78BFA', '#C4B5FD', '#10B981', '#F59E0B'];
    const dots: ConfettiDot[] = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 2 + Math.random() * 3,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: 4 + Math.random() * 6,
    }));
    setConfetti(dots);
  }, []);

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {/* Confetti CSS Animation */}
      <style jsx>{`
        @keyframes confettiFall {
          0% {
            transform: translateY(-20px) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
      `}</style>

      {/* Confetti Dots */}
      {confetti.map((dot) => (
        <div
          key={dot.id}
          className="absolute top-0 rounded-full pointer-events-none"
          style={{
            left: `${dot.left}%`,
            width: `${dot.size}px`,
            height: `${dot.size}px`,
            backgroundColor: dot.color,
            animation: `confettiFall ${dot.duration}s ease-in ${dot.delay}s forwards`,
          }}
        />
      ))}

      <div className="relative z-10 flex flex-col items-center text-center py-16 px-4">
        {/* Success Icon */}
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-2xl scale-150" />
          <div className="relative w-20 h-20 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-emerald-400" />
          </div>
        </div>

        <h1 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-3">
          Thank you for your order!
        </h1>

        <p className="text-white/50 max-w-md mb-6">
          Your order has been placed successfully. We&apos;ll send you an email
          confirmation shortly.
        </p>

        {orderNumber && (
          <div className="rounded-xl bg-white/[0.03] border border-white/10 px-8 py-4 mb-8">
            <p className="text-xs text-white/40 uppercase tracking-widest mb-1">
              Order Number
            </p>
            <p className="text-lg font-mono font-bold text-[var(--color-accent,#8B5CF6)]">
              {orderNumber}
            </p>
          </div>
        )}

        {/* Delivery Info */}
        <div className="flex items-center gap-3 rounded-xl bg-white/[0.03] border border-white/10 px-6 py-4 mb-10">
          <Package className="w-5 h-5 text-white/40 flex-shrink-0" />
          <div className="text-left">
            <p className="text-sm font-medium text-white">Estimated Delivery</p>
            <p className="text-xs text-white/40">3-5 business days</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/shop"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg bg-gradient-to-r from-[var(--color-accent,#8B5CF6)] to-[#7C3AED] text-white text-sm font-semibold uppercase tracking-wider hover:from-[#9D6FFF] hover:to-[#8B5CF6] transition-all shadow-lg shadow-[var(--color-accent,#8B5CF6)]/20"
          >
            Continue Shopping
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/account/orders"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg border border-white/20 text-white text-sm font-semibold uppercase tracking-wider hover:bg-white/5 transition-all"
          >
            View Orders
          </Link>
        </div>
      </div>
    </div>
  );
}
