import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServer } from '@/lib/supabase-ssr';

export async function POST(request: NextRequest) {
  const { propertyId } = await request.json();

  if (!propertyId) {
    return NextResponse.json({ error: 'Property ID required' }, { status: 400 });
  }

  const viewerIp = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  const supabase = await createSupabaseServer();

  // Check if this IP already viewed in last 24 hours
  const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

  const { data: existing } = await supabase
    .from('js_property_views')
    .select('id')
    .eq('property_id', propertyId)
    .eq('viewer_ip', viewerIp)
    .gte('viewed_at', twentyFourHoursAgo)
    .limit(1);

  if (existing && existing.length > 0) {
    return NextResponse.json({ tracked: false, reason: 'duplicate' });
  }

  // Insert view record
  await supabase.from('js_property_views').insert({
    property_id: propertyId,
    viewer_ip: viewerIp,
  });

  // Increment views_count on property
  const { data: currentProp } = await supabase
    .from('js_properties')
    .select('views_count')
    .eq('id', propertyId)
    .single();

  await supabase
    .from('js_properties')
    .update({ views_count: (currentProp?.views_count || 0) + 1 })
    .eq('id', propertyId);

  // Create notification for property owner
  const { data: property } = await supabase
    .from('js_properties')
    .select('owner_id, title')
    .eq('id', propertyId)
    .single();

  if (property?.owner_id) {
    await supabase.from('js_notifications').insert({
      recipient_id: property.owner_id,
      type: 'property_view',
      title: 'New Property View',
      message: `Someone viewed your property "${property.title}"`,
      property_id: propertyId,
    });
  }

  return NextResponse.json({ tracked: true });
}
