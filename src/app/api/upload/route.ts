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

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const files = formData.getAll('files') as File[];
    const bucket = (formData.get('bucket') as string) || 'property-images';
    const folder = (formData.get('folder') as string) || 'properties';

    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: 'No files provided for upload.' },
        { status: 400 }
      );
    }

    const uploadedUrls: string[] = [];
    const errors: string[] = [];

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

      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const { error: uploadError } = await supabaseAdmin.storage
        .from(bucket)
        .upload(filePath, buffer, {
          contentType: file.type,
          cacheControl: '3600',
          upsert: false,
        });

      if (uploadError) {
        console.error('Storage upload error for file:', file.name, uploadError);
        errors.push(`Failed to upload "${file.name}": ${uploadError.message}`);
        continue;
      }

      const { data } = supabaseAdmin.storage.from(bucket).getPublicUrl(filePath);
      if (data?.publicUrl) {
        uploadedUrls.push(data.publicUrl);
      }
    }

    if (uploadedUrls.length === 0 && errors.length > 0) {
      return NextResponse.json(
        { error: errors.join('; ') },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      urls: uploadedUrls,
      errors: errors.length > 0 ? errors : undefined,
    });
  } catch (err: unknown) {
    console.error('Upload API internal error:', err);
    const message = err instanceof Error ? err.message : 'Internal Server Error during upload';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
