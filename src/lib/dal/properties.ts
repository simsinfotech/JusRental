import { supabase } from '@/lib/supabase';
import { mapDbProperty, type DbProperty } from './mappers';
import type { Property, PropertyFilters } from '@/types';

export async function fetchProperties(filters?: PropertyFilters): Promise<Property[]> {
  let query = supabase
    .from('js_properties')
    .select('*')
    .eq('available', true)
    .eq('status', 'active');

  if (filters?.type) {
    query = query.eq('type', filters.type);
  }
  if (filters?.bhk) {
    const bhkNum = parseInt(filters.bhk);
    if (bhkNum === 4) {
      query = query.gte('bhk', 4);
    } else {
      query = query.eq('bhk', bhkNum);
    }
  }
  if (filters?.budgetMin) {
    query = query.gte('price', filters.budgetMin);
  }
  if (filters?.budgetMax) {
    query = query.lte('price', filters.budgetMax);
  }
  if (filters?.area) {
    query = query.eq('area', filters.area);
  }
  if (filters?.furnished) {
    query = query.eq('furnished', filters.furnished);
  }

  // Sorting
  switch (filters?.sort) {
    case 'price-asc':
      query = query.order('price', { ascending: true });
      break;
    case 'price-desc':
      query = query.order('price', { ascending: false });
      break;
    case 'sqft-desc':
      query = query.order('sqft', { ascending: false });
      break;
    default:
      query = query.order('posted_date', { ascending: false });
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching properties:', error);
    return [];
  }

  return (data as DbProperty[]).map(mapDbProperty);
}

export async function fetchPropertyById(id: string): Promise<Property | null> {
  const { data, error } = await supabase
    .from('js_properties')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) {
    return null;
  }

  return mapDbProperty(data as DbProperty);
}

export async function fetchFeaturedProperties(limit = 6): Promise<Property[]> {
  const { data, error } = await supabase
    .from('js_properties')
    .select('*')
    .eq('available', true)
    .eq('status', 'active')
    .eq('verified', true)
    .order('posted_date', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching featured properties:', error);
    return [];
  }

  return (data as DbProperty[]).map(mapDbProperty);
}

export async function fetchSimilarProperties(
  property: Property,
  limit = 3
): Promise<Property[]> {
  const { data, error } = await supabase
    .from('js_properties')
    .select('*')
    .neq('id', property.id)
    .eq('available', true)
    .eq('status', 'active')
    .or(`area.eq.${property.area},bhk.eq.${property.bhk}`)
    .limit(limit);

  if (error) {
    console.error('Error fetching similar properties:', error);
    return [];
  }

  return (data as DbProperty[]).map(mapDbProperty);
}

export async function fetchAllAreas(): Promise<string[]> {
  const { data, error } = await supabase
    .from('js_properties')
    .select('area')
    .eq('available', true)
    .eq('status', 'active');

  if (error) return [];

  const areas = [...new Set((data as { area: string }[]).map((d) => d.area))].sort();
  return areas;
}

export async function fetchAllTypes(): Promise<string[]> {
  const { data, error } = await supabase
    .from('js_properties')
    .select('type')
    .eq('available', true)
    .eq('status', 'active');

  if (error) return [];

  const types = [...new Set((data as { type: string }[]).map((d) => d.type))].sort();
  return types;
}
