import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-server';
import { sendToGoogleSheets } from '@/lib/google-sheets';

export async function POST(request: NextRequest) {
  const { name, phone, email, propertyTitle, preferredDate, preferredTime, source } = await request.json();

  if (!name || !phone || !email) {
    return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
  }

  // Build payload for Google Sheets
  const payload: Record<string, string> = { name, phone, email };
  if (source) payload.source = source;
  if (propertyTitle) payload.propertyTitle = propertyTitle;
  if (preferredDate) payload.preferredDate = preferredDate;
  if (preferredTime) payload.preferredTime = preferredTime;

  // Send to Google Sheets
  await sendToGoogleSheets(payload);

  // Also persist to Supabase so leads appear in the admin panel
  const details = [
    propertyTitle && `Property: ${propertyTitle}`,
    preferredDate && `Date: ${preferredDate}`,
    preferredTime && `Time: ${preferredTime}`,
  ].filter(Boolean).join(', ');

  supabaseAdmin
    .from('js_contact_submissions')
    .insert({
      name,
      phone,
      email,
      subject: source || 'Lead Popup',
      message: details || null,
      status: 'new',
    })
    .then(({ error }) => {
      if (error) console.error('Supabase lead insert error:', error.message);
    });

  return NextResponse.json({ result: 'success' });
}
