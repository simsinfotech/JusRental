import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-server';
import { sendToGoogleSheets } from '@/lib/google-sheets';

export async function POST(request: NextRequest) {
  const {
    name, phone, email, source,
    propertyTitle, propertyLocation, propertyArea,
    preferredDate, preferredTime,
    userCity, userArea,
  } = await request.json();

  if (!name || !phone || !email) {
    return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
  }

  // Build payload for Google Sheets
  const payload: Record<string, string> = { name, phone, email };
  if (source) payload.source = source;
  if (propertyTitle) {
    // Combine property title with location for the Property column
    const parts = [propertyTitle, propertyLocation, propertyArea].filter(Boolean);
    payload.propertyTitle = parts.join(' - ');
  }
  if (preferredDate) payload.preferredDate = preferredDate;
  if (preferredTime) payload.preferredTime = preferredTime;
  if (userCity) payload.city = userCity;
  if (userArea) payload.area = userArea;

  // Send to Google Sheets
  await sendToGoogleSheets(payload);

  // Also persist to Supabase so leads appear in the admin panel
  const details = [
    propertyTitle && `Property: ${propertyTitle}`,
    propertyLocation && `Location: ${propertyLocation}`,
    propertyArea && `Area: ${propertyArea}`,
    preferredDate && `Date: ${preferredDate}`,
    preferredTime && `Time: ${preferredTime}`,
    userCity && `User City: ${userCity}`,
    userArea && `User Area: ${userArea}`,
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
