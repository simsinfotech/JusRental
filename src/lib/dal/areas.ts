import { supabase } from '@/lib/supabase';
import { mapDbArea, type DbArea } from './mappers';
import type { Area } from '@/types';

export async function fetchAreas(): Promise<Area[]> {
  const { data, error } = await supabase
    .from('js_areas')
    .select('*')
    .order('popular', { ascending: false });

  if (error) {
    console.error('Error fetching areas:', error);
    return [];
  }

  return (data as DbArea[]).map(mapDbArea);
}
