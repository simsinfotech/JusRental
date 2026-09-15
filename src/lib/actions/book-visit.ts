'use server';

import { supabaseAdmin } from '@/lib/supabase-server';

export interface BookVisitFormState {
  success: boolean;
  error?: string;
}

export async function submitBookVisit(
  _prevState: BookVisitFormState,
  formData: FormData
): Promise<BookVisitFormState> {
  const name = formData.get('name') as string;
  const phone = formData.get('phone') as string;
  const email = formData.get('email') as string;
  const preferredDate = formData.get('preferredDate') as string;
  const preferredTime = formData.get('preferredTime') as string;
  const message = formData.get('message') as string;
  const propertyId = formData.get('propertyId') as string;

  if (!name || !phone) {
    return { success: false, error: 'Please fill in all required fields.' };
  }

  const { error } = await supabaseAdmin
    .from('js_book_visit_requests')
    .insert({
      name,
      phone,
      email: email || '',
      preferred_date: preferredDate || null,
      preferred_time: preferredTime || '',
      message: message || '',
      property_id: propertyId || null,
      status: 'pending',
    });

  if (error) {
    console.error('Error submitting book visit:', error);
    return { success: false, error: 'Something went wrong. Please try again.' };
  }

  return { success: true };
}
