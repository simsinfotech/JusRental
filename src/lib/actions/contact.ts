'use server';

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
  const userCity = (formData.get('userCity') as string) || '';
  const userArea = (formData.get('userArea') as string) || '';

  if (!name || !phone || !subject || !message) {
    return { success: false, error: 'Please fill in all required fields.' };
  }

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
    userCity,
    userArea,
  });

  return { success: true };
}
