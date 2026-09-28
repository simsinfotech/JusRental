import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { name, phone, email, propertyTitle, preferredDate, preferredTime } = await request.json();

  if (!name || !phone || !email) {
    return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
  }

  const webhookUrl = process.env.NEXT_PUBLIC_GOOGLE_SHEET_WEBHOOK;
  if (!webhookUrl) {
    return NextResponse.json({ error: 'Webhook not configured' }, { status: 500 });
  }

  try {
    const payload: Record<string, string> = { name, phone, email };
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
        return NextResponse.json({ result: 'success', response: text });
      }
      return NextResponse.json({ result: 'success', response: 'redirect-no-location' });
    }

    // Non-redirect response
    if (!res.ok) {
      const text = await res.text();
      console.error('Google Sheets webhook error:', res.status, text);
      return NextResponse.json({ error: `Webhook returned ${res.status}` }, { status: 502 });
    }

    const text = await res.text();
    return NextResponse.json({ result: 'success', response: text });
  } catch (err) {
    console.error('Leads capture error:', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Failed to submit to Google Sheets' },
      { status: 502 },
    );
  }
}
