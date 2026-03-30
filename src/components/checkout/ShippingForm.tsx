'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import Input from '@/components/ui/Input';

export interface ShippingData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

interface ShippingFormProps {
  data: ShippingData;
  onChange: (data: ShippingData) => void;
  errors: Partial<Record<keyof ShippingData, string>>;
  className?: string;
}

const COUNTRIES = [
  'United States',
  'Canada',
  'United Kingdom',
  'Australia',
  'Germany',
  'France',
  'Japan',
  'South Korea',
  'Netherlands',
  'Italy',
];

export default function ShippingForm({ data, onChange, errors, className }: ShippingFormProps) {
  const handleChange = (field: keyof ShippingData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    onChange({ ...data, [field]: e.target.value });
  };

  return (
    <div className={cn('space-y-5', className)}>
      <h2 className="text-lg font-bold text-white uppercase tracking-wider mb-6">
        Shipping Address
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="First Name"
          value={data.firstName}
          onChange={handleChange('firstName')}
          error={errors.firstName}
          placeholder="John"
          required
        />
        <Input
          label="Last Name"
          value={data.lastName}
          onChange={handleChange('lastName')}
          error={errors.lastName}
          placeholder="Doe"
          required
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Email"
          type="email"
          value={data.email}
          onChange={handleChange('email')}
          error={errors.email}
          placeholder="john@example.com"
          required
        />
        <Input
          label="Phone"
          type="tel"
          value={data.phone}
          onChange={handleChange('phone')}
          error={errors.phone}
          placeholder="+1 (555) 000-0000"
        />
      </div>

      <Input
        label="Address Line 1"
        value={data.address1}
        onChange={handleChange('address1')}
        error={errors.address1}
        placeholder="123 Main Street"
        required
      />

      <Input
        label="Address Line 2"
        value={data.address2}
        onChange={handleChange('address2')}
        placeholder="Apartment, suite, etc. (optional)"
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <Input
          label="City"
          value={data.city}
          onChange={handleChange('city')}
          error={errors.city}
          placeholder="New York"
          required
        />
        <Input
          label="State"
          value={data.state}
          onChange={handleChange('state')}
          error={errors.state}
          placeholder="NY"
          required
        />
        <Input
          label="ZIP Code"
          value={data.zip}
          onChange={handleChange('zip')}
          error={errors.zip}
          placeholder="10001"
          required
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium uppercase tracking-widest text-white/50">
          Country
        </label>
        <select
          value={data.country}
          onChange={handleChange('country')}
          className="w-full bg-white/5 border-0 border-b-2 border-b-white/10 rounded-t-lg px-4 py-3 text-sm text-white outline-none focus:border-b-[var(--color-accent,#8B5CF6)] hover:bg-white/[0.07] transition-all appearance-none cursor-pointer"
        >
          <option value="" className="bg-zinc-900">
            Select country
          </option>
          {COUNTRIES.map((c) => (
            <option key={c} value={c} className="bg-zinc-900">
              {c}
            </option>
          ))}
        </select>
        {errors.country && (
          <p className="text-xs text-red-400 mt-0.5">{errors.country}</p>
        )}
      </div>
    </div>
  );
}
