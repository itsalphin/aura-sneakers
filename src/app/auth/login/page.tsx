'use client';

import React from 'react';
import LoginForm from '@/components/auth/LoginForm';

export default function LoginPage() {
  return (
    <main className="relative min-h-screen bg-[var(--color-bg-primary,#050505)] flex items-center justify-center py-20 px-4 overflow-hidden">
      {/* Animated Gradient Mesh Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-[600px] h-[600px] rounded-full opacity-20 blur-[120px]"
          style={{
            background: 'radial-gradient(circle, #8B5CF6 0%, transparent 70%)',
            top: '20%',
            left: '10%',
            animation: 'meshFloat1 20s ease-in-out infinite',
          }}
        />
        <div
          className="absolute w-[500px] h-[500px] rounded-full opacity-15 blur-[100px]"
          style={{
            background: 'radial-gradient(circle, #7C3AED 0%, transparent 70%)',
            bottom: '10%',
            right: '15%',
            animation: 'meshFloat2 25s ease-in-out infinite',
          }}
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full opacity-10 blur-[80px]"
          style={{
            background: 'radial-gradient(circle, #A78BFA 0%, transparent 70%)',
            top: '50%',
            left: '50%',
            animation: 'meshFloat3 18s ease-in-out infinite',
          }}
        />
      </div>

      <style jsx>{`
        @keyframes meshFloat1 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(30px, -30px) rotate(120deg); }
          66% { transform: translate(-20px, 20px) rotate(240deg); }
        }
        @keyframes meshFloat2 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(-25px, 25px) rotate(-120deg); }
          66% { transform: translate(15px, -15px) rotate(-240deg); }
        }
        @keyframes meshFloat3 {
          0%, 100% { transform: translate(-50%, -50%) rotate(0deg); }
          50% { transform: translate(-45%, -55%) rotate(180deg); }
        }
      `}</style>

      <div className="relative z-10">
        <LoginForm />
      </div>
    </main>
  );
}
