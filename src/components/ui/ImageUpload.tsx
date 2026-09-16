'use client';

import { useState, useCallback } from 'react';
import { Upload, X, ImageIcon } from 'lucide-react';
import Image from 'next/image';
import { createSupabaseBrowser } from '@/lib/supabase-browser';

interface ImageUploadProps {
  images: string[];
  onChange: (images: string[]) => void;
  maxFiles?: number;
  bucket?: string;
  folder?: string;
}

export function ImageUpload({
  images,
  onChange,
  maxFiles = 6,
  bucket = 'property-images',
  folder = '',
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const uploadFiles = useCallback(
    async (files: FileList | File[]) => {
      const fileArray = Array.from(files);
      const remaining = maxFiles - images.length;
      if (remaining <= 0) return;

      const toUpload = fileArray
        .filter((f) => f.type.startsWith('image/'))
        .slice(0, remaining);

      if (toUpload.length === 0) return;

      setUploading(true);
      const supabase = createSupabaseBrowser();
      const newUrls: string[] = [];

      for (const file of toUpload) {
        const ext = file.name.split('.').pop();
        const name = `${folder ? folder + '/' : ''}${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

        const { error } = await supabase.storage
          .from(bucket)
          .upload(name, file, { cacheControl: '3600', upsert: false });

        if (!error) {
          const { data } = supabase.storage.from(bucket).getPublicUrl(name);
          newUrls.push(data.publicUrl);
        }
      }

      if (newUrls.length > 0) {
        onChange([...images, ...newUrls]);
      }
      setUploading(false);
    },
    [images, onChange, maxFiles, bucket, folder]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      if (e.dataTransfer.files.length > 0) {
        uploadFiles(e.dataTransfer.files);
      }
    },
    [uploadFiles]
  );

  const handleRemove = (index: number) => {
    onChange(images.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-3">
      {/* Drop zone */}
      <label
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={`flex flex-col items-center justify-center p-8 rounded-xl border-2 border-dashed transition-all cursor-pointer ${
          dragOver
            ? 'border-[#006194] bg-[#006194]/10'
            : 'border-glass-border hover:border-[#006194]/50 hover:bg-surface-light'
        } ${uploading ? 'opacity-50 pointer-events-none' : ''}`}
      >
        <input
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => {
            if (e.target.files) uploadFiles(e.target.files);
            e.target.value = '';
          }}
          disabled={uploading || images.length >= maxFiles}
        />
        <Upload className="w-8 h-8 text-[var(--muted)] mb-2" />
        <p className="text-sm font-medium text-[var(--muted)]">
          {uploading ? 'Uploading...' : 'Drop images here or click to browse'}
        </p>
        <p className="text-xs text-[var(--muted)] mt-1">
          {images.length}/{maxFiles} images · JPG, PNG, WebP
        </p>
      </label>

      {/* Preview grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
          {images.map((url, i) => (
            <div key={i} className="relative aspect-square rounded-xl overflow-hidden border border-glass-border group">
              <Image
                src={url}
                alt={`Property image ${i + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 33vw, 25vw"
              />
              <button
                type="button"
                onClick={() => handleRemove(i)}
                className="absolute top-1.5 right-1.5 p-1 rounded-lg bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
              {i === 0 && (
                <span className="absolute bottom-1.5 left-1.5 px-2 py-0.5 rounded-md bg-black/60 text-white text-xs">
                  Cover
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
