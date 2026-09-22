'use client';

import { useState, useCallback, useRef } from 'react';
import { LuUpload, LuX, LuLoader, LuCircleAlert, LuMoveLeft, LuMoveRight, LuStar } from 'react-icons/lu';
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
  maxFiles = 10,
  bucket = 'property-images',
  folder = 'properties',
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [uploadProgressText, setUploadProgressText] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadFiles = useCallback(
    async (files: FileList | File[]) => {
      setErrorMessage(null);
      const fileArray = Array.from(files);
      const remaining = maxFiles - images.length;
      if (remaining <= 0) {
        setErrorMessage(`Maximum limit of ${maxFiles} images reached.`);
        return;
      }

      const toUpload = fileArray
        .filter((f) => f.type.startsWith('image/'))
        .slice(0, remaining);

      if (toUpload.length === 0) {
        setErrorMessage('Please select valid image files (JPG, PNG, WebP, HEIC).');
        return;
      }

      setUploading(true);
      setUploadProgressText(`Preparing ${toUpload.length} image${toUpload.length > 1 ? 's' : ''}...`);

      const supabase = createSupabaseBrowser();
      const newUrls: string[] = [];
      const errorList: string[] = [];

      try {
        // Step 1: Request signed upload authorizations
        const signRes = await fetch('/api/upload/sign', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            files: toUpload.map((f) => ({ name: f.name, type: f.type, size: f.size })),
            bucket,
            folder,
          }),
        });

        let signData: {
          signedUrls?: Array<{
            originalName: string;
            path: string;
            token: string;
            signedUrl: string;
            publicUrl: string;
          }>;
          errors?: string[];
          error?: string;
        } = {};

        try {
          signData = await signRes.json();
        } catch {
          throw new Error('Server returned an invalid response. Please try again.');
        }

        if (!signRes.ok || !signData.signedUrls) {
          throw new Error(signData.error || 'Failed to authorize image upload.');
        }

        // Step 2: Upload each file directly to Supabase Storage using signed tokens
        const signedList = signData.signedUrls;
        for (let i = 0; i < toUpload.length; i++) {
          const file = toUpload[i];
          const signInfo = signedList.find((s) => s.originalName === file.name) || signedList[i];

          if (!signInfo) continue;

          setUploadProgressText(`Uploading ${i + 1} of ${toUpload.length}...`);

          const { error: uploadError } = await supabase.storage
            .from(bucket)
            .uploadToSignedUrl(signInfo.path, signInfo.token, file, {
              contentType: file.type || 'image/jpeg',
            });

          if (uploadError) {
            console.error('Direct signed upload error:', uploadError);
            errorList.push(`Failed to upload ${file.name}: ${uploadError.message}`);
          } else {
            newUrls.push(signInfo.publicUrl);
          }
        }

        if (newUrls.length > 0) {
          onChange([...images, ...newUrls]);
        }

        if (errorList.length > 0) {
          setErrorMessage(errorList.join('; '));
        } else if (signData.errors && signData.errors.length > 0) {
          setErrorMessage(signData.errors.join('; '));
        }
      } catch (err: unknown) {
        console.error('Upload handler error:', err);
        const msg = err instanceof Error ? err.message : 'Error uploading images. Please try again.';
        setErrorMessage(msg);
      } finally {
        setUploading(false);
        setUploadProgressText('');
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
    },
    [images, onChange, maxFiles, bucket, folder]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        uploadFiles(e.dataTransfer.files);
      }
    },
    [uploadFiles]
  );

  const handleRemove = (index: number) => {
    onChange(images.filter((_, i) => i !== index));
    setErrorMessage(null);
  };

  const handleSetCover = (index: number) => {
    if (index === 0) return;
    const selected = images[index];
    const rest = images.filter((_, i) => i !== index);
    onChange([selected, ...rest]);
  };

  const handleMove = (index: number, direction: 'left' | 'right') => {
    const targetIndex = direction === 'left' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= images.length) return;
    const newImages = [...images];
    const temp = newImages[index];
    newImages[index] = newImages[targetIndex];
    newImages[targetIndex] = temp;
    onChange(newImages);
  };

  return (
    <div className="space-y-4">
      {errorMessage && (
        <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 text-red-600 text-sm border border-red-500/20">
          <LuCircleAlert className="w-4 h-4 shrink-0" />
          <span className="flex-1">{errorMessage}</span>
          <button
            type="button"
            onClick={() => setErrorMessage(null)}
            className="p-1 hover:bg-red-500/10 rounded cursor-pointer"
          >
            <LuX className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Drop zone */}
      <label
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={`relative flex flex-col items-center justify-center p-8 rounded-2xl border-2 border-dashed transition-all cursor-pointer ${
          dragOver
            ? 'border-[#006194] bg-[#006194]/10 scale-[0.99]'
            : 'border-glass-border hover:border-[#006194]/50 hover:bg-surface-light'
        } ${uploading ? 'opacity-60 pointer-events-none' : ''}`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              uploadFiles(e.target.files);
            }
          }}
          disabled={uploading || images.length >= maxFiles}
        />

        {uploading ? (
          <div className="flex flex-col items-center py-2">
            <LuLoader className="w-9 h-9 text-[#006194] animate-spin mb-3" />
            <p className="text-sm font-semibold text-[#006194]">
              {uploadProgressText || 'Uploading images...'}
            </p>
            <p className="text-xs text-[var(--muted)] mt-1">Direct upload in progress</p>
          </div>
        ) : (
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-2xl bg-[#006194]/10 text-[#006194] flex items-center justify-center mb-3">
              <LuUpload className="w-6 h-6" />
            </div>
            <p className="text-sm font-semibold text-[var(--foreground)]">
              Drop images here or <span className="text-[#006194] underline">browse files</span>
            </p>
            <p className="text-xs text-[var(--muted)] mt-1.5">
              {images.length}/{maxFiles} images added · Supports JPG, PNG, WebP (up to 10MB each)
            </p>
          </div>
        )}
      </label>

      {/* Preview grid */}
      {images.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
              Uploaded Photos ({images.length})
            </span>
            <span className="text-xs text-[var(--muted)]">
              First image will be the primary cover photo
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5">
            {images.map((url, i) => (
              <div
                key={`${url}-${i}`}
                className={`relative aspect-[4/3] rounded-xl overflow-hidden border transition-all group ${
                  i === 0
                    ? 'border-[#006194] ring-2 ring-[#006194]/20 shadow-sm'
                    : 'border-glass-border hover:border-slate-300'
                } bg-slate-50`}
              >
                <Image
                  src={url}
                  alt={`Property image ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                />

                {/* Top overlay with action buttons */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/40 opacity-0 group-hover:opacity-100 transition-opacity p-2 flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    {i !== 0 ? (
                      <button
                        type="button"
                        onClick={() => handleSetCover(i)}
                        title="Set as cover image"
                        className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-white/90 text-[#131b2e] text-[11px] font-medium hover:bg-white shadow-sm cursor-pointer"
                      >
                        <LuStar className="w-3 h-3 text-amber-500 fill-amber-500" />
                        Set Cover
                      </button>
                    ) : (
                      <span />
                    )}

                    <button
                      type="button"
                      onClick={() => handleRemove(i)}
                      title="Remove image"
                      className="p-1.5 rounded-lg bg-red-600/90 text-white hover:bg-red-600 transition-colors shadow-sm cursor-pointer ml-auto"
                    >
                      <LuX className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Reorder buttons */}
                  <div className="flex items-center justify-between gap-1 mt-auto">
                    <div className="flex gap-1">
                      {i > 0 && (
                        <button
                          type="button"
                          onClick={() => handleMove(i, 'left')}
                          title="Move left"
                          className="p-1 rounded bg-black/60 text-white hover:bg-black/80 text-xs cursor-pointer"
                        >
                          <LuMoveLeft className="w-3.5 h-3.5" />
                        </button>
                      )}
                      {i < images.length - 1 && (
                        <button
                          type="button"
                          onClick={() => handleMove(i, 'right')}
                          title="Move right"
                          className="p-1 rounded bg-black/60 text-white hover:bg-black/80 text-xs cursor-pointer"
                        >
                          <LuMoveRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                    <span className="text-[10px] text-white/90 font-medium bg-black/50 px-1.5 py-0.5 rounded">
                      #{i + 1}
                    </span>
                  </div>
                </div>

                {/* Primary Cover Badge */}
                {i === 0 && (
                  <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-[#006194] text-white text-[11px] font-semibold tracking-wide shadow-md flex items-center gap-1 pointer-events-none">
                    <LuStar className="w-3 h-3 fill-white" />
                    Cover Photo
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
