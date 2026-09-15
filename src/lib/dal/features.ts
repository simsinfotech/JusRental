import { supabase } from '@/lib/supabase';
import { mapDbKeyFeature, type DbKeyFeature } from './mappers';
import type { KeyFeature } from '@/types';

export async function fetchKeyFeatures(): Promise<KeyFeature[]> {
  const { data, error } = await supabase
    .from('js_key_features')
    .select('*')
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('Error fetching key features:', error);
    return [];
  }

  return (data as DbKeyFeature[]).map(mapDbKeyFeature);
}
