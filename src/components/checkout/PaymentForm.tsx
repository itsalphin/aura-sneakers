'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { CreditCard, Lock } from 'lucide-react';
import Input from '@/components/ui/Input';

export interface PaymentData {
  cardNumber: string;
  expiry: string;
  cvc: string;
  cardName: string;
}

interface PaymentFormProps {
  data: PaymentData;
  onChange: (data: PaymentData) => void;
  errors: Partial<Record<keyof PaymentData, string>>;
  className?: string;
}

// TODO: Replace with Stripe Elements when Stripe keys are configured

export default function PaymentForm({ data, onChange, errors, className }: PaymentFormProps) {
  const handleChange = (field: keyof PaymentData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    let value = e.target.value;

    if (field === 'cardNumber') {
      value = value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim().slice(0, 19);
    }
    if (field === 'expiry') {
      value = value.replace(/\D/g, '');
      if (value.length >= 2) {
        value = value.slice(0, 2) + '/' + value.slice(2, 4);
      }
    }
    if (field === 'cvc') {
      value = value.replace(/\D/g, '').slice(0, 4);
    }

    onChange({ ...data, [field]: value });
  };

  return (
    <div className={cn('space-y-5', className)}>
      <h2 className="text-lg font-bold text-white uppercase tracking-wider mb-6">
        Payment Details
      </h2>

      {/* Mock Card Visual */}
      <div className="relative rounded-2xl bg-gradient-to-br from-white/10 to-white/[0.03] border border-white/10 p-6 overflow-hidden mb-8">
        <div className="absolute top-0 right-0 w-40 h-40 bg-[var(--color-accent,#8B5CF6)]/10 rounded-full blur-3xl" />
        <div className="relative">
          <CreditCard className="w-8 h-8 text-white/40 mb-6" />
          <div className="text-lg text-white tracking-[0.2em] font-mono mb-4">
            {data.cardNumber || '\u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022'}
          </div>
          <div className="flex justify-between items-end">
            <div>
              <div className="text-[10px] text-white/30 uppercase tracking-wider mb-0.5">
                Card Holder
              </div>
              <div className="text-sm text-white/70">
                {data.cardName || 'YOUR NAME'}
              </div>
            </div>
            <div>
              <div className="text-[10px] text-white/30 uppercase tracking-wider mb-0.5">
                Expires
              </div>
              <div className="text-sm text-white/70">
                {data.expiry || 'MM/YY'}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Input
        label="Cardholder Name"
        value={data.cardName}
        onChange={handleChange('cardName')}
        error={errors.cardName}
        placeholder="John Doe"
        required
      />

      <Input
        label="Card Number"
        value={data.cardNumber}
        onChange={handleChange('cardNumber')}
        error={errors.cardNumber}
        placeholder="4242 4242 4242 4242"
        prefixIcon={<CreditCard className="w-4 h-4" />}
        maxLength={19}
        required
      />

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Expiry Date"
          value={data.expiry}
          onChange={handleChange('expiry')}
          error={errors.expiry}
          placeholder="MM/YY"
          maxLength={5}
          required
        />
        <Input
          label="CVC"
          value={data.cvc}
          onChange={handleChange('cvc')}
          error={errors.cvc}
          placeholder="123"
          maxLength={4}
          required
        />
      </div>

      <div className="flex items-center gap-2 mt-4 text-xs text-white/30">
        <Lock className="w-3.5 h-3.5" />
        <span>Your payment information is encrypted and secure</span>
      </div>
    </div>
  );
}
