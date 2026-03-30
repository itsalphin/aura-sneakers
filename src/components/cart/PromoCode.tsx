'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Tag, Check, X } from 'lucide-react';

interface PromoCodeProps {
  onApply: (code: string, discount: number) => void;
  className?: string;
}

export default function PromoCode({ onApply, className }: PromoCodeProps) {
  const [code, setCode] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleApply = () => {
    const trimmed = code.trim().toUpperCase();
    if (!trimmed) return;

    if (trimmed === 'AURA10') {
      setStatus('success');
      setMessage('Code applied! 10% discount added.');
      onApply(trimmed, 10);
    } else {
      setStatus('error');
      setMessage('Invalid promo code. Please try again.');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleApply();
    }
  };

  return (
    <div className={cn('', className)}>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <input
            type="text"
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
              if (status !== 'idle') {
                setStatus('idle');
                setMessage('');
              }
            }}
            onKeyDown={handleKeyDown}
            placeholder="Enter promo code"
            className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-sm text-white placeholder:text-white/30 outline-none focus:border-[var(--color-accent,#8B5CF6)] transition-colors"
          />
        </div>
        <button
          onClick={handleApply}
          disabled={!code.trim()}
          className="px-6 py-3 rounded-lg bg-white/10 border border-white/10 text-sm font-medium text-white uppercase tracking-wider hover:bg-white/15 disabled:opacity-30 disabled:pointer-events-none transition-all"
        >
          Apply
        </button>
      </div>

      {status !== 'idle' && (
        <div
          className={cn(
            'flex items-center gap-2 mt-2 text-xs',
            status === 'success' ? 'text-emerald-400' : 'text-red-400'
          )}
        >
          {status === 'success' ? (
            <Check className="w-3.5 h-3.5" />
          ) : (
            <X className="w-3.5 h-3.5" />
          )}
          {message}
        </div>
      )}

      <p className="mt-2 text-[11px] text-white/30">
        Try <span className="text-white/50 font-medium">AURA10</span> for 10% off
      </p>
    </div>
  );
}
