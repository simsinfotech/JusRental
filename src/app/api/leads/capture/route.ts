import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-server';
import { sendToGoogleSheets } from '@/lib/google-sheets';

export async function POST(request: NextRequest) {
  const {
    name, phone, email, source,
    propertyTitle, propertyLocation, propertyArea,
    preferredDate, preferredTime,
  } = await request.json();

  if (!name || !phone || !email) {
    return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
  }

  // Get user location from Vercel's IP geolocation headers (server-side, always available)
  const city = request.headers.get('x-vercel-ip-city') || '';
  const area = request.headers.get('x-vercel-ip-country-region') || '';

  // Build payload for Google Sheets
  const payload: Record<string, string> = { name, phone, email };
  if (source) payload.source = source;
  if (propertyTitle) {
    const parts = [propertyTitle, propertyLocation, propertyArea].filter(Boolean);
    payload.propertyTitle = parts.join(' - ');
  }
  if (preferredDate) payload.preferredDate = preferredDate;
  if (preferredTime) payload.preferredTime = preferredTime;
  if (city) payload.city = decodeURIComponent(city);
  if (area) payload.area = decodeURIComponent(area);

  // Send to Google Sheets
  await sendToGoogleSheets(payload);

  // Also persist to Supabase so leads appear in the admin panel
  const details = [
    propertyTitle && `Property: ${propertyTitle}`,
    propertyLocation && `Location: ${propertyLocation}`,
    propertyArea && `Area: ${propertyArea}`,
    preferredDate && `Date: ${preferredDate}`,
    preferredTime && `Time: ${preferredTime}`,
    city && `User City: ${decodeURIComponent(city)}`,
    area && `User Region: ${decodeURIComponent(area)}`,
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
