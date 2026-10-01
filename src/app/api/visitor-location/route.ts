import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-server';
import { sendToGoogleSheets } from '@/lib/google-sheets';

export async function POST(request: NextRequest) {
  const { latitude, longitude, city, area, userAgent, denied } = await request.json();

  // Send to Google Sheets
  const payload: Record<string, string> = { source: 'Visitor Location' };
  if (latitude != null) payload.latitude = String(latitude);
  if (longitude != null) payload.longitude = String(longitude);
  if (city) payload.city = city;
  if (area) payload.area = area;
  if (userAgent) payload.userAgent = userAgent;
  if (denied) payload.denied = 'true';

  await sendToGoogleSheets(payload);

  // Insert into Supabase
  try {
    await supabaseAdmin.from('js_visitor_locations').insert({
      latitude: latitude ?? null,
      longitude: longitude ?? null,
      city: city || null,
      area: area || null,
      user_agent: userAgent || null,
      denied: denied ?? false,
    });
  } catch (err) {
    console.error('Visitor location Supabase error:', err);
  }

  return NextResponse.json({ result: 'success' });
}
