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

    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      redirect: 'follow',
    });

    // Google Apps Script redirects; read the final response
    const text = await res.text();
    return NextResponse.json({ result: 'success', response: text });
  } catch {
    return NextResponse.json({ error: 'Failed to submit to Google Sheets' }, { status: 502 });
  }
}
