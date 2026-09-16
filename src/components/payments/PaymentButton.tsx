'use client';

import { useState } from 'react';
import { CreditCard } from 'lucide-react';

interface PaymentButtonProps {
  amount: number; // in paise (59900 = ₹599)
  propertyId?: string;
  paymentType?: string;
  label?: string;
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => {
      open: () => void;
    };
  }
}

export function PaymentButton({
  amount,
  propertyId,
  paymentType = 'verified_plan',
  label = 'Pay Now',
  onSuccess,
  onError,
}: PaymentButtonProps) {
  const [loading, setLoading] = useState(false);

  const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    setLoading(true);

    const loaded = await loadRazorpayScript();
    if (!loaded) {
      onError?.('Failed to load payment gateway.');
      setLoading(false);
      return;
    }

    // Create order
    const res = await fetch('/api/payments/create-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount, propertyId, paymentType }),
    });

    if (!res.ok) {
      onError?.('Failed to create payment order.');
      setLoading(false);
      return;
    }

    const { orderId, keyId, currency } = await res.json();

    const options = {
      key: keyId,
      amount,
      currency,
      name: 'JusRental',
      description: paymentType === 'verified_plan'
        ? 'Verified Property Plan'
        : 'JusRental Payment',
      order_id: orderId,
      handler: async (response: {
        razorpay_order_id: string;
        razorpay_payment_id: string;
        razorpay_signature: string;
      }) => {
        // Verify payment
        const verifyRes = await fetch('/api/payments/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(response),
        });

        if (verifyRes.ok) {
          onSuccess?.();
        } else {
          onError?.('Payment verification failed.');
        }
      },
      theme: {
        color: '#3B82F6',
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
    setLoading(false);
  };

  return (
    <button
      onClick={handlePayment}
      disabled={loading}
      className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#006194] text-white font-semibold shadow-lg shadow-[#006194]/25 hover:shadow-[#006194]/40 transition-all cursor-pointer disabled:opacity-50"
    >
      <CreditCard className="w-4 h-4" />
      {loading ? 'Processing...' : label}
    </button>
  );
}
