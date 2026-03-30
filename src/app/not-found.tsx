import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[var(--color-bg-primary,#050505)] flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-[120px] sm:text-[160px] md:text-[200px] font-black text-white/[0.05] leading-none select-none">
          404
        </h1>
        <div className="-mt-16 sm:-mt-20 md:-mt-24 relative z-10">
          <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-wider mb-4">
            Page Not Found
          </h2>
          <p className="text-sm text-white/40 max-w-md mx-auto mb-8">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-gradient-to-r from-[var(--color-accent,#8B5CF6)] to-[#7C3AED] text-white text-sm font-semibold uppercase tracking-wider hover:from-[#9D6FFF] hover:to-[#8B5CF6] transition-all shadow-lg shadow-[var(--color-accent,#8B5CF6)]/20"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
