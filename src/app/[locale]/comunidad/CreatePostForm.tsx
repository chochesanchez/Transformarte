'use client';

import React from 'react';

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
  return (
    <div id="createPostForm" className="hidden mb-8">
      <h3 className="text-xl font-semibold mb-4">{labels.title}</h3>
      <form className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-2">{labels.nameLabel}</label>
          <input type="text" className="w-full px-4 py-2 border rounded-md" required />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">{labels.titleLabel}</label>
          <input type="text" className="w-full px-4 py-2 border rounded-md" required />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">{labels.contentLabel}</label>
          <textarea className="w-full px-4 py-2 border rounded-md" rows={4} required />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">{labels.imageLabel}</label>
          <input type="file" accept="image/*" className="w-full" />
        </div>
        <div className="flex justify-end">
          <button type="submit" className="bg-primary text-white px-6 py-2 rounded-full font-semibold">
            {labels.button}
          </button>
        </div>
      </form>
    </div>
  );
} 