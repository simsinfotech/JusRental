import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServer } from '@/lib/supabase-ssr';
import { supabaseAdmin } from '@/lib/supabase-server';

export async function PATCH(req: NextRequest) {
  const { id, status } = await req.json();

  if (!id || !status) {
    return NextResponse.json({ error: 'Property ID and status are required' }, { status: 400 });
  }

  // Verify user is authenticated
  const supabase = await createSupabaseServer();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Use admin client to bypass RLS
  const { error } = await supabaseAdmin
    .from('js_properties')
    .update({ status })
    .eq('id', id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
