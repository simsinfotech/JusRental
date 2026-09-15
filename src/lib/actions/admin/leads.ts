'use server';

import { createSupabaseServer } from '@/lib/supabase-ssr';

export async function fetchContactLeads() {
  const supabase = await createSupabaseServer();
  const { data, error } = await supabase
    .from('js_contact_submissions')
    .select('*')
    .order('created_at', { ascending: false });

  return { data: data || [], error: error?.message };
}

export async function fetchVisitRequests() {
  const supabase = await createSupabaseServer();
  const { data, error } = await supabase
    .from('js_book_visit_requests')
    .select('*')
    .order('created_at', { ascending: false });

  return { data: data || [], error: error?.message };
}

export async function fetchListingRequests() {
  const supabase = await createSupabaseServer();
  const { data, error } = await supabase
    .from('js_property_listing_requests')
    .select('*')
    .order('created_at', { ascending: false });

  return { data: data || [], error: error?.message };
}

export async function updateContactStatus(id: string, status: string) {
  const supabase = await createSupabaseServer();
  const { error } = await supabase
    .from('js_contact_submissions')
    .update({ status })
    .eq('id', id);

  return { error: error?.message };
}

export async function updateVisitStatus(id: string, status: string) {
  const supabase = await createSupabaseServer();
  const { error } = await supabase
    .from('js_book_visit_requests')
    .update({ status })
    .eq('id', id);

  return { error: error?.message };
}

export async function updateListingStatus(id: string, status: string) {
  const supabase = await createSupabaseServer();
  const { error } = await supabase
    .from('js_property_listing_requests')
    .update({ status })
    .eq('id', id);

  return { error: error?.message };
}
