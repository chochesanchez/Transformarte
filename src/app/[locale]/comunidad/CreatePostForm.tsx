'use client';

import React, { useState } from 'react';
import toast from 'react-hot-toast';

interface CreatePostFormProps {
  labels: {
    title: string;
    nameLabel: string;
    titleLabel: string;
    contentLabel: string;
    imageLabel: string;
    button: string;
  };
}

export default function CreatePostForm({ labels }: CreatePostFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    content: '',
    image: null as File | null
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, image: e.target.files![0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let imageUrl = '';
      // Upload to Supabase Storage via server route if present
      if (formData.image) {
        const fileForm = new FormData();
        fileForm.append('file', formData.image);
        const up = await fetch('/api/upload', { method: 'POST', body: fileForm });
        const upJson = await up.json();
        if (up.ok && upJson.fileUrl) imageUrl = upJson.fileUrl;
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
          imageUrl
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
          image: null
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
          />
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
          <label className="block text-gray-700 mb-2">{labels.imageLabel}</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full"
          />
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