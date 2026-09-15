import { supabase } from '@/lib/supabase';
import { mapDbNRIService, type DbNRIService } from './mappers';
import type { NRIService } from '@/types';

export async function fetchNRIServices(): Promise<NRIService[]> {
  const { data, error } = await supabase
    .from('js_nri_services')
    .select('*')
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('Error fetching NRI services:', error);
    return [];
  }

  return (data as DbNRIService[]).map(mapDbNRIService);
}
