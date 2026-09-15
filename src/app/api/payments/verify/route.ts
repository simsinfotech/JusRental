import { NextRequest, NextResponse } from 'next/server';
import { createHmac } from 'crypto';
import { createSupabaseServer } from '@/lib/supabase-ssr';

export async function POST(request: NextRequest) {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await request.json();

  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keySecret) {
    return NextResponse.json({ error: 'Payment gateway not configured' }, { status: 500 });
  }

  // Verify signature
  const generatedSignature = createHmac('sha256', keySecret)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest('hex');

  if (generatedSignature !== razorpay_signature) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  const supabase = await createSupabaseServer();

  // Update payment record
  const { data: payment } = await supabase
    .from('js_payments')
    .update({
      razorpay_payment_id,
      razorpay_signature,
      status: 'captured',
    })
    .eq('razorpay_order_id', razorpay_order_id)
    .select('property_id')
    .single();

  // If payment is for verified plan, upgrade property
  if (payment?.property_id) {
    await supabase
      .from('js_properties')
      .update({ verified: true, status: 'active' })
      .eq('id', payment.property_id);
  }

  return NextResponse.json({ success: true });
}
