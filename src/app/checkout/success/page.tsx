'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import OrderConfirmation from '@/components/checkout/OrderConfirmation';

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get('order') || undefined;

  return (
    <main className="min-h-screen bg-[var(--color-bg-primary,#050505)] pt-32 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <OrderConfirmation orderNumber={orderNumber} />
      </div>
    </main>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[var(--color-bg-primary,#050505)] flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-white/20 border-t-[var(--color-accent,#8B5CF6)] rounded-full animate-spin" />
        </main>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
