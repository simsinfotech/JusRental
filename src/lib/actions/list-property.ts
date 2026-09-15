'use server';

import { supabaseAdmin } from '@/lib/supabase-server';

export interface ListPropertyFormState {
  success: boolean;
  error?: string;
}

export async function submitListProperty(
  _prevState: ListPropertyFormState,
  formData: FormData
): Promise<ListPropertyFormState> {
  const name = formData.get('name') as string;
  const phone = formData.get('phone') as string;
  const propertyType = formData.get('propertyType') as string;
  const bhk = formData.get('bhk') as string;
  const area = formData.get('area') as string;
  const plan = formData.get('plan') as string;

  if (!name || !phone) {
    return { success: false, error: 'Please fill in all required fields.' };
  }

  const { error } = await supabaseAdmin
    .from('js_property_listing_requests')
    .insert({
      name,
      phone,
      property_type: propertyType || '',
      bhk: bhk || '',
      area: area || '',
      plan: plan || 'free',
      status: 'pending',
    });

  if (error) {
    console.error('Error submitting listing request:', error);
    return { success: false, error: 'Something went wrong. Please try again.' };
  }

  return { success: true };
}
