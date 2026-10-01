import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-server';

export async function POST(request: NextRequest) {
  const { name, phone, email, propertyTitle, preferredDate, preferredTime, source } = await request.json();

  if (!name || !phone || !email) {
    return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
  }

  const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK || process.env.NEXT_PUBLIC_GOOGLE_SHEET_WEBHOOK;
  if (!webhookUrl) {
    return NextResponse.json({ error: 'Webhook not configured' }, { status: 500 });
  }

  // Fire-and-forget: also persist to Supabase so leads appear in the admin panel
  const persistToSupabase = () => {
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
  };

  try {
    const payload: Record<string, string> = { name, phone, email };
    if (source) payload.source = source;
    if (propertyTitle) payload.propertyTitle = propertyTitle;
    if (preferredDate) payload.preferredDate = preferredDate;
    if (preferredTime) payload.preferredTime = preferredTime;

    // Google Apps Script returns a 302 redirect whose destination only accepts GET.
    // Use redirect:'manual' to capture the 302 and follow it with a GET request.
    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      redirect: 'manual',
    });

    // Handle 302 redirect (expected from Google Apps Script)
    if (res.status >= 300 && res.status < 400) {
      const redirectUrl = res.headers.get('location');
      if (redirectUrl) {
        const followRes = await fetch(redirectUrl, { method: 'GET' });
        const text = await followRes.text();
        persistToSupabase();
        return NextResponse.json({ result: 'success', response: text });
      }
      persistToSupabase();
      return NextResponse.json({ result: 'success', response: 'redirect-no-location' });
    }

    // Non-redirect response
    if (!res.ok) {
      const text = await res.text();
      console.error('Google Sheets webhook error:', res.status, text);
      return NextResponse.json({ error: `Webhook returned ${res.status}` }, { status: 502 });
    }

    const text = await res.text();
    persistToSupabase();
    return NextResponse.json({ result: 'success', response: text });
  } catch (err) {
    console.error('Leads capture error:', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Failed to submit to Google Sheets' },
      { status: 502 },
    );
  }
}
