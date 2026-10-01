'use server';

import { headers } from 'next/headers';
import { supabaseAdmin } from '@/lib/supabase-server';
import { sendToGoogleSheets } from '@/lib/google-sheets';

export interface ContactFormState {
  success: boolean;
  error?: string;
}

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const phone = formData.get('phone') as string;
  const subject = formData.get('subject') as string;
  const message = formData.get('message') as string;

  if (!name || !phone || !subject || !message) {
    return { success: false, error: 'Please fill in all required fields.' };
  }

  // Get user location from Vercel's IP geolocation headers
  const h = await headers();
  const city = decodeURIComponent(h.get('x-vercel-ip-city') || '');
  const area = decodeURIComponent(h.get('x-vercel-ip-country-region') || '');

  const { error } = await supabaseAdmin
    .from('js_contact_submissions')
    .insert({
      name,
      email: email || '',
      phone,
      subject,
      message,
      status: 'new',
    });

  if (error) {
    console.error('Error submitting contact form:', error);
    return { success: false, error: 'Something went wrong. Please try again.' };
  }

  await sendToGoogleSheets({
    source: 'Contact Form',
    name,
    phone,
    email: email || '',
    subject,
    message,
    city,
    area,
  });

  return { success: true };
}
