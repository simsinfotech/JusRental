'use server';

import { createSupabaseServer } from '@/lib/supabase-ssr';

export async function fetchSettings() {
  const supabase = await createSupabaseServer();
  const { data, error } = await supabase
    .from('js_site_settings')
    .select('*');

  if (error) return { data: null, error: error.message };

  const settings: Record<string, Record<string, string>> = {};
  data?.forEach((row) => {
    settings[row.key] = typeof row.value === 'string' ? JSON.parse(row.value) : row.value;
  });

  return { data: settings, error: null };
}

export async function updateSettings(key: string, value: Record<string, string>) {
  const supabase = await createSupabaseServer();

  const { error } = await supabase
    .from('js_site_settings')
    .upsert({
      key,
      value,
      updated_at: new Date().toISOString(),
    }, { onConflict: 'key' });

  return { error: error?.message };
}
