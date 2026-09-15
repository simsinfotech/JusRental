import { supabase } from '@/lib/supabase';
import type { DbRentData } from './mappers';

export async function fetchRentData(): Promise<Record<string, Record<string, string>>> {
  const { data, error } = await supabase
    .from('js_rent_data')
    .select('*')
    .order('area', { ascending: true });

  if (error) {
    console.error('Error fetching rent data:', error);
    return {};
  }

  const result: Record<string, Record<string, string>> = {};

  for (const row of data as DbRentData[]) {
    if (!result[row.bhk]) {
      result[row.bhk] = {};
    }
    result[row.bhk][row.area] = row.rent_range;
  }

  return result;
}

export async function fetchRentAreas(): Promise<string[]> {
  const { data, error } = await supabase
    .from('js_rent_data')
    .select('area')
    .order('area', { ascending: true });

  if (error) return [];

  return [...new Set((data as { area: string }[]).map((d) => d.area))];
}
