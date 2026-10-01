import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-server';

const ALLOWED_TABLES = [
  'js_contact_submissions',
  'js_book_visit_requests',
  'js_property_listing_requests',
] as const;

type AllowedTable = (typeof ALLOWED_TABLES)[number];

export async function GET() {
  const [contacts, visits, listings] = await Promise.all([
    supabaseAdmin.from('js_contact_submissions').select('*').order('created_at', { ascending: false }),
    supabaseAdmin.from('js_book_visit_requests').select('*').order('created_at', { ascending: false }),
    supabaseAdmin.from('js_property_listing_requests').select('*').order('created_at', { ascending: false }),
  ]);

  return NextResponse.json({
    contacts: contacts.data || [],
    visits: visits.data || [],
    listings: listings.data || [],
  });
}

export async function PATCH(request: NextRequest) {
  const { table, id, status } = await request.json();

  if (!table || !id || !status) {
    return NextResponse.json({ error: 'table, id, and status are required' }, { status: 400 });
  }

  if (!ALLOWED_TABLES.includes(table as AllowedTable)) {
    return NextResponse.json({ error: 'Invalid table' }, { status: 400 });
  }

  const { error } = await supabaseAdmin
    .from(table)
    .update({ status })
    .eq('id', id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
