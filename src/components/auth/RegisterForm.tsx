'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Eye, EyeOff, User, Mail, Lock } from 'lucide-react';
import Input from '@/components/ui/Input';
import SocialAuth from './SocialAuth';

interface RegisterFormProps {
  className?: string;
}

export default function RegisterForm({ className }: RegisterFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = 'Name is required';
    if (!email.trim()) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = 'Invalid email';
    if (!password) errs.password = 'Password is required';
    else if (password.length < 8) errs.password = 'Must be at least 8 characters';
    if (password !== confirmPassword) errs.confirmPassword = 'Passwords do not match';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    // Mock: In production, this would create the account
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
          Join Aura
        </h1>
        <p className="text-sm text-white/40">
          Create an account to access exclusive releases.
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

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={errors.name}
          placeholder="John Doe"
          prefixIcon={<User className="w-4 h-4" />}
          required
        />

        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
          placeholder="you@example.com"
          prefixIcon={<Mail className="w-4 h-4" />}
          required
        />

        <Input
          label="Password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
          placeholder="Min. 8 characters"
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

        <Input
          label="Confirm Password"
          type={showPassword ? 'text' : 'password'}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={errors.confirmPassword}
          placeholder="Repeat your password"
          prefixIcon={<Lock className="w-4 h-4" />}
          required
        />

        <button
          type="submit"
          disabled={isLoading}
          className="flex items-center justify-center gap-2 w-full py-3.5 rounded-lg bg-gradient-to-r from-[var(--color-accent,#8B5CF6)] to-[#7C3AED] text-white text-sm font-semibold uppercase tracking-wider hover:from-[#9D6FFF] hover:to-[#8B5CF6] transition-all shadow-lg shadow-[var(--color-accent,#8B5CF6)]/20 disabled:opacity-50 mt-2"
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Creating Account...
            </>
          ) : (
            'Create Account'
          )}
        </button>
      </form>

      <p className="text-center text-sm text-white/40 mt-6">
        Already have an account?{' '}
        <Link
          href="/auth/login"
          className="text-[var(--color-accent,#8B5CF6)] hover:text-[#9D6FFF] font-medium transition-colors"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
