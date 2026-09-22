import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-server';

const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/heic',
  'image/heif',
  'image/svg+xml',
  'image/gif',
  'image/avif',
];

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB per file

interface FileRequest {
  name: string;
  type: string;
  size: number;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const files: FileRequest[] = body.files || [];
    const bucket = body.bucket || 'property-images';
    const folder = body.folder || 'properties';

    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: 'No files specified.' },
        { status: 400 }
      );
    }

    const signedUrls = [];
    const errors = [];

    for (const file of files) {
      if (!ALLOWED_MIME_TYPES.includes(file.type)) {
        errors.push(`File "${file.name}" has unsupported format: ${file.type}`);
        continue;
      }

      if (file.size > MAX_FILE_SIZE) {
        errors.push(`File "${file.name}" exceeds 10MB limit.`);
        continue;
      }

      const ext = file.name.split('.').pop() || 'jpg';
      const cleanFolder = folder.replace(/^\/+|\/+$/g, '');
      const uniqueSuffix = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
      const filePath = cleanFolder ? `${cleanFolder}/${uniqueSuffix}.${ext}` : `${uniqueSuffix}.${ext}`;

      const { data, error } = await supabaseAdmin.storage
        .from(bucket)
        .createSignedUploadUrl(filePath);

      if (error || !data) {
        errors.push(`Failed to create upload authorization for "${file.name}": ${error?.message || 'Unknown error'}`);
        continue;
      }

      const { data: pubData } = supabaseAdmin.storage
        .from(bucket)
        .getPublicUrl(filePath);

      signedUrls.push({
        originalName: file.name,
        path: data.path,
        token: data.token,
        signedUrl: data.signedUrl,
        publicUrl: pubData.publicUrl,
      });
    }

    if (signedUrls.length === 0 && errors.length > 0) {
      return NextResponse.json(
        { error: errors.join('; ') },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      signedUrls,
      errors: errors.length > 0 ? errors : undefined,
    });
  } catch (err: unknown) {
    console.error('Sign API error:', err);
    const message = err instanceof Error ? err.message : 'Internal Server Error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
