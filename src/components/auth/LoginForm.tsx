'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import Input from '@/components/ui/Input';
import SocialAuth from './SocialAuth';

interface LoginFormProps {
  className?: string;
}

export default function LoginForm({ className }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    setError('Invalid email or password. Please try again.');
  };

  return (
    <div
      className={cn(
        'w-full max-w-md rounded-2xl bg-white/[0.03] border border-white/10 p-8 backdrop-blur-sm',
        className
      )}
    >
      <div className="text-center mb-8">
        <h1 className="text-2xl font-black text-white uppercase tracking-wider mb-2">
          Sign In to Aura
        </h1>
        <p className="text-sm text-white/40">
          Welcome back. Enter your credentials to continue.
        </p>
      </div>

      <SocialAuth className="mb-6" />

      {/* Divider */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex-1 h-px bg-white/10" />
        <span className="text-xs text-white/30 uppercase tracking-widest">
          or continue with email
        </span>
        <div className="flex-1 h-px bg-white/10" />
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-xs text-red-400">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          prefixIcon={<Mail className="w-4 h-4" />}
          required
        />

        <Input
          label="Password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          prefixIcon={<Lock className="w-4 h-4" />}
          suffixIcon={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-white/40 hover:text-white/70 transition-colors"
              tabIndex={-1}
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          }
          required
        />

        <div className="flex justify-end">
          <Link
            href="/auth/login"
            className="text-xs text-white/40 hover:text-[var(--color-accent,#8B5CF6)] transition-colors"
          >
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="flex items-center justify-center gap-2 w-full py-3.5 rounded-lg bg-gradient-to-r from-[var(--color-accent,#8B5CF6)] to-[#7C3AED] text-white text-sm font-semibold uppercase tracking-wider hover:from-[#9D6FFF] hover:to-[#8B5CF6] transition-all shadow-lg shadow-[var(--color-accent,#8B5CF6)]/20 disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Signing In...
            </>
          ) : (
            'Sign In'
          )}
        </button>
      </form>

      <p className="text-center text-sm text-white/40 mt-6">
        Don&apos;t have an account?{' '}
        <Link
          href="/auth/register"
          className="text-[var(--color-accent,#8B5CF6)] hover:text-[#9D6FFF] font-medium transition-colors"
        >
          Create one
        </Link>
      </p>
    </div>
  );
}
