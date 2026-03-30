import React from 'react';

export default function Loading() {
  return (
    <main className="min-h-screen bg-[var(--color-bg-primary,#050505)] flex items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        <div className="relative">
          {/* Pulsing glow */}
          <div className="absolute inset-0 bg-[var(--color-accent,#8B5CF6)]/20 rounded-full blur-xl animate-pulse" />
          {/* Logo text */}
          <div className="relative text-3xl font-black text-white uppercase tracking-[0.3em] animate-pulse">
            AURA
          </div>
        </div>
        <div className="w-8 h-8 border-2 border-white/10 border-t-[var(--color-accent,#8B5CF6)] rounded-full animate-spin" />
      </div>
    </main>
  );
}
