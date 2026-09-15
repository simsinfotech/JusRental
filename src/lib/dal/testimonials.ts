import { supabase } from '@/lib/supabase';
import { mapDbTestimonial, type DbTestimonial } from './mappers';
import type { Testimonial } from '@/types';

export async function fetchTestimonials(): Promise<Testimonial[]> {
  const { data, error } = await supabase
    .from('js_testimonials')
    .select('*')
    .eq('visible', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching testimonials:', error);
    return [];
  }

  return (data as DbTestimonial[]).map(mapDbTestimonial);
}
