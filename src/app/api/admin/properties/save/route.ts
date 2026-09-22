import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      id,
      title,
      location,
      area,
      price,
      bhk,
      sqft,
      deposit,
      type,
      furnished,
      floor,
      facing,
      sharing_type,
      description,
      amenities,
      images,
      nearby_places,
      available,
      verified,
      status,
      owner_phone,
      verification_fee,
      concierge_name,
    } = body;

    if (!id) {
      return NextResponse.json({ error: 'Property ID is required.' }, { status: 400 });
    }

    if (!title || !location || !area || price === undefined) {
      return NextResponse.json({ error: 'Title, location, area, and rent price are required.' }, { status: 400 });
    }

    const updatePayload: Record<string, unknown> = {
      title,
      location,
      area,
      price: parseInt(price.toString(), 10),
      bhk: parseInt((bhk || 1).toString(), 10),
      sqft: parseInt((sqft || 0).toString(), 10),
      deposit: deposit !== undefined && deposit !== '' ? parseInt(deposit.toString(), 10) : parseInt(price.toString(), 10) * 2,
      type: type || 'Apartment',
      furnished: furnished || 'Semi-Furnished',
      floor: floor || '',
      facing: facing || 'East',
      sharing_type: sharing_type || 'Family',
      description: description || '',
      amenities: Array.isArray(amenities) ? amenities : [],
      images: Array.isArray(images) && images.length > 0 ? images : ['/images/scene-1.png'],
      available: available ?? true,
      verified: verified ?? false,
      status: status || 'active',
      updated_at: new Date().toISOString(),
    };

    if (Array.isArray(nearby_places)) {
      updatePayload.nearby_places = nearby_places;
    }

    if (owner_phone !== undefined) {
      updatePayload.owner_phone = owner_phone;
    }

    if (verification_fee !== undefined && verification_fee !== null) {
      updatePayload.verification_fee = parseInt(verification_fee.toString(), 10);
    }

    if (concierge_name !== undefined && concierge_name !== null) {
      updatePayload.concierge_name = concierge_name;
    }

    const { data, error } = await supabaseAdmin
      .from('js_properties')
      .update(updatePayload)
      .eq('id', id)
      .select('*')
      .single();

    if (error) {
      console.error('Admin property update database error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      property: data,
    });
  } catch (err: unknown) {
    console.error('Admin property save route error:', err);
    const message = err instanceof Error ? err.message : 'Internal Server Error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
