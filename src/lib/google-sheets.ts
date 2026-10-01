/**
 * Fire-and-forget helper to send lead data to Google Sheets via webhook.
 * Handles the Google Apps Script 302 redirect pattern.
 * Never throws — logs errors and returns silently.
 */
export function sendToGoogleSheets(payload: Record<string, string>) {
  const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK || process.env.NEXT_PUBLIC_GOOGLE_SHEET_WEBHOOK;
  if (!webhookUrl) return;

  fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    redirect: 'manual',
  })
    .then((res) => {
      if (res.status >= 300 && res.status < 400) {
        const redirectUrl = res.headers.get('location');
        if (redirectUrl) return fetch(redirectUrl, { method: 'GET' });
      }
    })
    .catch((err) => {
      console.error('Google Sheets webhook error:', err);
    });
}
