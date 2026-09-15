import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServer } from '@/lib/supabase-ssr';

export async function POST(request: NextRequest) {
  const { amount, propertyId, paymentType } = await request.json();

  const supabase = await createSupabaseServer();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    return NextResponse.json({ error: 'Payment gateway not configured' }, { status: 500 });
  }

  // Create Razorpay order via REST API
  const orderResponse = await fetch('https://api.razorpay.com/v1/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${Buffer.from(`${keyId}:${keySecret}`).toString('base64')}`,
    },
    body: JSON.stringify({
      amount: amount, // in paise
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
      notes: {
        userId: user.id,
        propertyId: propertyId || '',
        paymentType: paymentType || 'verified_plan',
      },
    }),
  });

  if (!orderResponse.ok) {
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }

  const order = await orderResponse.json();

  // Store order in DB
  await supabase.from('js_payments').insert({
    user_id: user.id,
    property_id: propertyId || null,
    amount,
    razorpay_order_id: order.id,
    status: 'created',
    payment_type: paymentType || 'verified_plan',
  });

  return NextResponse.json({
    orderId: order.id,
    amount: order.amount,
    currency: order.currency,
    keyId,
  });
}
