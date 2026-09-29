import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-server';

export async function POST(request: NextRequest) {
  const { latitude, longitude, city, area, userAgent, denied } = await request.json();

  // Send to Google Sheets
  const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK || process.env.NEXT_PUBLIC_GOOGLE_SHEET_WEBHOOK;
  if (webhookUrl) {
    try {
      const payload: Record<string, string> = { source: 'Visitor Location' };
      if (latitude != null) payload.latitude = String(latitude);
      if (longitude != null) payload.longitude = String(longitude);
      if (city) payload.city = city;
      if (area) payload.area = area;
      if (userAgent) payload.userAgent = userAgent;
      if (denied) payload.denied = 'true';

      const res = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        redirect: 'manual',
      });

      if (res.status >= 300 && res.status < 400) {
        const redirectUrl = res.headers.get('location');
        if (redirectUrl) {
          await fetch(redirectUrl, { method: 'GET' });
        }
      }
    } catch (err) {
      console.error('Visitor location Google Sheets error:', err);
    }
  }

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
