'use server';

import { createSupabaseServer } from '@/lib/supabase-ssr';

export async function fetchAdminProperties(filters?: {
  status?: string;
  search?: string;
  area?: string;
}) {
  const supabase = await createSupabaseServer();

  let query = supabase
    .from('js_properties')
    .select('*')
    .order('created_at', { ascending: false });

  if (filters?.status) {
    query = query.eq('status', filters.status);
  }
  if (filters?.area) {
    query = query.eq('area', filters.area);
  }
  if (filters?.search) {
    query = query.ilike('title', `%${filters.search}%`);
  }

  const { data, error } = await query;
  return { data: data || [], error: error?.message };
}

export async function updatePropertyStatus(id: string, status: string) {
  const supabase = await createSupabaseServer();
  const { error } = await supabase
    .from('js_properties')
    .update({ status })
    .eq('id', id);

  return { error: error?.message };
}

export async function verifyProperty(id: string, verified: boolean) {
  const supabase = await createSupabaseServer();
  const { error } = await supabase
    .from('js_properties')
    .update({ verified })
    .eq('id', id);

  return { error: error?.message };
}

export async function deleteProperty(id: string) {
  const supabase = await createSupabaseServer();
  const { error } = await supabase
    .from('js_properties')
    .delete()
    .eq('id', id);

  return { error: error?.message };
}
