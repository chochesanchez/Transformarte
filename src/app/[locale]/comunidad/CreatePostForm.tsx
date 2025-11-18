'use client';

import React, { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import LocaleProfileLink from './LocaleProfileLink';

interface CreatePostFormProps {
  labels: {
    title: string;
    nameLabel: string;
    titleLabel: string;
    contentLabel: string;
    imageLabel: string;
    button: string;
  };
  locale?: string;
}

export default function CreatePostForm({ labels, locale = 'es' }: CreatePostFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    content: '',
    images: [] as File[]
  });
  const [previews, setPreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isConverting, setIsConverting] = useState(false);

  React.useEffect(() => {
    fetch('/api/profile', { cache: 'no-store' })
      .then(r=>r.json())
      .then(j=>{
        if (j?.user?.fullName) setFormData(prev=>({ ...prev, name: j.user.fullName }));
      })
      .catch(()=>{});
  }, []);
  
  // Cleanup blob URLs on unmount
  React.useEffect(() => {
    return () => {
      previews.forEach(preview => {
        if (preview && preview.startsWith('blob:')) {
          URL.revokeObjectURL(preview);
        }
      });
    };
  }, [previews]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const convertHeicIfNeeded = async (file: File): Promise<File> => {
    const nameLower = (file.name || '').toLowerCase();
    const typeLower = (file.type || '').toLowerCase();
    const isHeic = typeLower.includes('heic') || typeLower.includes('heif') || nameLower.endsWith('.heic') || nameLower.endsWith('.heif');
    if (!isHeic) return file;
    try {
      setIsConverting(true);
      const mod = await import('heic2any');
      const heic2any = (mod as any).default || (mod as any);
      const blob: Blob = await heic2any({ blob: file, toType: 'image/jpeg', quality: 0.9 });
      const jpegFile = new File([blob], file.name.replace(/\.[^.]+$/, '.jpg'), { type: 'image/jpeg' });
      return jpegFile;
    } catch (err) {
      console.warn('HEIC conversion failed, uploading original file', err);
      return file;
    } finally {
      setIsConverting(false);
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files.length) return;
    const incoming = Array.from(e.target.files);
    const processed: File[] = [];
    const newPreviews: string[] = [];
    
    for (const f of incoming) {
      const convertedFile = await convertHeicIfNeeded(f);
      processed.push(convertedFile);
      
      // Create preview using FileReader for better reliability
      try {
        const reader = new FileReader();
        const preview = await new Promise<string>((resolve) => {
          reader.onload = (e) => {
            resolve(e.target?.result as string || '');
          };
          reader.onerror = () => {
            // Fallback to createObjectURL if FileReader fails
            resolve(URL.createObjectURL(convertedFile));
          };
          reader.readAsDataURL(convertedFile);
        });
        newPreviews.push(preview);
      } catch {
        // Final fallback
        newPreviews.push(URL.createObjectURL(convertedFile));
      }
    }
    
    setFormData(prev => {
      const next = [...prev.images, ...processed].slice(0, 5);
      return { ...prev, images: next };
    });
    setPreviews(prev => {
      const next = [...prev, ...newPreviews].slice(0, 5);
      return next;
    });
    // reset input so selecting the same file again re-triggers change
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removeImage = (idx: number) => {
    // Clean up blob URL if it exists
    const previewToRemove = previews[idx];
    if (previewToRemove && previewToRemove.startsWith('blob:')) {
      URL.revokeObjectURL(previewToRemove);
    }
    setFormData(prev => ({ ...prev, images: prev.images.filter((_,i)=> i!==idx) }));
    setPreviews(prev => prev.filter((_,i)=> i!==idx));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const imageUrls: string[] = [];
      if (formData.images.length) {
        for (const file of formData.images) {
          const fileForm = new FormData();
          fileForm.append('file', file);
          fileForm.append('context', 'forum');
          const up = await fetch('/api/upload', { method: 'POST', body: fileForm });
          const upJson = await up.json();
          if (up.ok && (upJson.publicUrl || upJson.fileUrl)) {
            // Prefer public URL when available; fall back to signed
            imageUrls.push(upJson.publicUrl || upJson.fileUrl);
          }
        }
      }

      // Create the forum post
      const response = await fetch('/api/forum', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          title: formData.title,
          content: formData.content,
          imageUrls
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Post created successfully!');
        // Reset form
        setFormData({
          name: '',
          title: '',
          content: '',
          images: []
        });
        // Hide form
        document.getElementById('createPostForm')?.classList.add('hidden');
        // Refresh page to show new post
        window.location.reload();
      } else {
        throw new Error(data.error || 'Failed to create post');
      }
    } catch (error) {
      console.error('Error creating post:', error);
      toast.error('Failed to create post. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="createPostForm" className="hidden mb-8">
      <h3 className="text-xl font-semibold mb-4">{labels.title}</h3>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-gray-700 mb-2">{labels.nameLabel}</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-md"
            required
            readOnly
          />
          <LocaleProfileLink locale={locale} />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">{labels.titleLabel}</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">{labels.contentLabel}</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-md"
            rows={4}
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">{labels.imageLabel} (max 5)</label>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
            multiple
          />
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="border px-4 py-2 rounded-md hover:bg-gray-50"
              disabled={formData.images.length >= 5 || isConverting}
            >
              {formData.images.length === 0 ? 'Choose image' : '+ Add another image'}
            </button>
            <span className="text-sm text-gray-500">{formData.images.length}/5</span>
            {isConverting && <span className="text-sm text-gray-500">Converting…</span>}
          </div>
          {previews.length>0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {previews.map((src, i)=> (
                <div key={i} className="relative h-20 w-20">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt="preview" className="h-20 w-20 object-cover rounded" />
                  <button type="button" onClick={()=>removeImage(i)} className="absolute -top-2 -right-2 bg-black/70 text-white rounded-full h-6 w-6">×</button>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`bg-primary text-white px-6 py-2 rounded-full font-semibold ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary/90'
            }`}
          >
            {isSubmitting ? 'Publishing...' : labels.button}
          </button>
        </div>
      </form>
    </div>
  );
} 