'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import ShippingForm, { type ShippingData } from './ShippingForm';
import PaymentForm, { type PaymentData } from './PaymentForm';
import { useCartStore } from '@/stores/cartStore';
import { formatPrice } from '@/lib/utils';
import { generateOrderNumber } from '@/lib/utils';
import { useRouter } from 'next/navigation';

const STEPS = ['Shipping', 'Payment', 'Review'] as const;

export default function CheckoutForm({ className }: { className?: string }) {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const getTotalPrice = useCartStore((s) => s.getTotalPrice);
  const clearCart = useCartStore((s) => s.clearCart);

  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [shippingData, setShippingData] = useState<ShippingData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
    country: '',
  });

  const [paymentData, setPaymentData] = useState<PaymentData>({
    cardNumber: '',
    expiry: '',
    cvc: '',
    cardName: '',
  });

  const [shippingErrors, setShippingErrors] = useState<Partial<Record<keyof ShippingData, string>>>({});
  const [paymentErrors, setPaymentErrors] = useState<Partial<Record<keyof PaymentData, string>>>({});

  const validateShipping = (): boolean => {
    const errs: Partial<Record<keyof ShippingData, string>> = {};
    if (!shippingData.firstName.trim()) errs.firstName = 'Required';
    if (!shippingData.lastName.trim()) errs.lastName = 'Required';
    if (!shippingData.email.trim()) errs.email = 'Required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(shippingData.email)) errs.email = 'Invalid email';
    if (!shippingData.address1.trim()) errs.address1 = 'Required';
    if (!shippingData.city.trim()) errs.city = 'Required';
    if (!shippingData.state.trim()) errs.state = 'Required';
    if (!shippingData.zip.trim()) errs.zip = 'Required';
    if (!shippingData.country) errs.country = 'Required';
    setShippingErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validatePayment = (): boolean => {
    const errs: Partial<Record<keyof PaymentData, string>> = {};
    if (!paymentData.cardName.trim()) errs.cardName = 'Required';
    if (!paymentData.cardNumber.trim()) errs.cardNumber = 'Required';
    else if (paymentData.cardNumber.replace(/\s/g, '').length < 16) errs.cardNumber = 'Invalid card number';
    if (!paymentData.expiry.trim()) errs.expiry = 'Required';
    if (!paymentData.cvc.trim()) errs.cvc = 'Required';
    else if (paymentData.cvc.length < 3) errs.cvc = 'Invalid CVC';
    setPaymentErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 0 && !validateShipping()) return;
    if (currentStep === 1 && !validatePayment()) return;
    if (currentStep < STEPS.length - 1) {
      setCurrentStep((s) => s + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((s) => s - 1);
    }
  };

  const handlePlaceOrder = async () => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    const orderNumber = generateOrderNumber();
    clearCart();
    router.push(`/checkout/success?order=${orderNumber}`);
  };

  const subtotal = getTotalPrice();
  const shipping = subtotal >= 200 ? 0 : 12;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <div className={cn('', className)}>
      {/* Step Indicator */}
      <div className="flex items-center justify-between mb-10">
        {STEPS.map((step, index) => (
          <React.Fragment key={step}>
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  'w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-all',
                  index < currentStep
                    ? 'bg-[var(--color-accent,#8B5CF6)] text-white'
                    : index === currentStep
                    ? 'bg-white/10 border-2 border-[var(--color-accent,#8B5CF6)] text-white'
                    : 'bg-white/5 text-white/30 border border-white/10'
                )}
              >
                {index < currentStep ? (
                  <Check className="w-4 h-4" />
                ) : (
                  index + 1
                )}
              </div>
              <span
                className={cn(
                  'text-sm font-medium uppercase tracking-wider hidden sm:block',
                  index <= currentStep ? 'text-white' : 'text-white/30'
                )}
              >
                {step}
              </span>
            </div>
            {index < STEPS.length - 1 && (
              <div
                className={cn(
                  'flex-1 h-px mx-4 transition-all',
                  index < currentStep ? 'bg-[var(--color-accent,#8B5CF6)]' : 'bg-white/10'
                )}
              />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="h-0.5 bg-white/5 rounded-full mb-8 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[var(--color-accent,#8B5CF6)] to-[#7C3AED] transition-all duration-500 ease-out rounded-full"
          style={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
        />
      </div>

      {/* Step Content */}
      <div className="min-h-[400px]">
        {currentStep === 0 && (
          <ShippingForm
            data={shippingData}
            onChange={setShippingData}
            errors={shippingErrors}
          />
        )}

        {currentStep === 1 && (
          <PaymentForm
            data={paymentData}
            onChange={setPaymentData}
            errors={paymentErrors}
          />
        )}

        {currentStep === 2 && (
          <div className="space-y-8">
            <h2 className="text-lg font-bold text-white uppercase tracking-wider">
              Review Order
            </h2>

            {/* Shipping Summary */}
            <div className="rounded-xl bg-white/[0.03] border border-white/10 p-5">
              <h3 className="text-xs font-semibold text-white/50 uppercase tracking-widest mb-3">
                Shipping To
              </h3>
              <p className="text-sm text-white">
                {shippingData.firstName} {shippingData.lastName}
              </p>
              <p className="text-sm text-white/60">
                {shippingData.address1}
                {shippingData.address2 && `, ${shippingData.address2}`}
              </p>
              <p className="text-sm text-white/60">
                {shippingData.city}, {shippingData.state} {shippingData.zip}
              </p>
              <p className="text-sm text-white/60">{shippingData.country}</p>
            </div>

            {/* Payment Summary */}
            <div className="rounded-xl bg-white/[0.03] border border-white/10 p-5">
              <h3 className="text-xs font-semibold text-white/50 uppercase tracking-widest mb-3">
                Payment Method
              </h3>
              <p className="text-sm text-white">
                Card ending in {paymentData.cardNumber.slice(-4)}
              </p>
              <p className="text-sm text-white/60">{paymentData.cardName}</p>
            </div>

            {/* Items */}
            <div className="rounded-xl bg-white/[0.03] border border-white/10 p-5">
              <h3 className="text-xs font-semibold text-white/50 uppercase tracking-widest mb-3">
                Items ({items.length})
              </h3>
              <div className="space-y-3">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-white/70">
                      {item.name} x{item.quantity}
                    </span>
                    <span className="text-white">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t border-white/10 mt-4 pt-4 flex justify-between">
                <span className="text-sm font-bold text-white">Total</span>
                <span className="text-sm font-bold text-white">{formatPrice(total)}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/10">
        {currentStep > 0 ? (
          <button
            onClick={handleBack}
            className="flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium text-white/60 hover:text-white hover:bg-white/5 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        ) : (
          <div />
        )}

        {currentStep < STEPS.length - 1 ? (
          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-8 py-3 rounded-lg bg-gradient-to-r from-[var(--color-accent,#8B5CF6)] to-[#7C3AED] text-white text-sm font-semibold uppercase tracking-wider hover:from-[#9D6FFF] hover:to-[#8B5CF6] transition-all shadow-lg shadow-[var(--color-accent,#8B5CF6)]/20"
          >
            Continue
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={handlePlaceOrder}
            disabled={isSubmitting}
            className="flex items-center gap-2 px-8 py-3 rounded-lg bg-gradient-to-r from-[var(--color-accent,#8B5CF6)] to-[#7C3AED] text-white text-sm font-semibold uppercase tracking-wider hover:from-[#9D6FFF] hover:to-[#8B5CF6] transition-all shadow-lg shadow-[var(--color-accent,#8B5CF6)]/20 disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Processing...
              </>
            ) : (
              'Place Order'
            )}
          </button>
        )}
      </div>
    </div>
  );
}
