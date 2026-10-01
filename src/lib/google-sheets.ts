/**
 * Send lead data to Google Sheets via webhook.
 * Handles the Google Apps Script 302 redirect pattern.
 * Awaitable so callers can ensure the request completes before the
 * serverless function exits. Never throws — logs errors and resolves.
 */
export async function sendToGoogleSheets(payload: Record<string, string>) {
  const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK || process.env.NEXT_PUBLIC_GOOGLE_SHEET_WEBHOOK;
  if (!webhookUrl) return;

  try {
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
    console.error('Google Sheets webhook error:', err);
  }
}
