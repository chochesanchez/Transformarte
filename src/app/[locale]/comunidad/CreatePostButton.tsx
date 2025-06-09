'use client';

import React from 'react';

interface CreatePostButtonProps {
  buttonText: string;
}

export default function CreatePostButton({ buttonText }: CreatePostButtonProps) {
  return (
    <button 
      onClick={() => document.getElementById('createPostForm')?.classList.remove('hidden')}
      className="bg-primary text-white px-6 py-2 rounded-full font-semibold inline-block hover:bg-primary/90"
    >
      {buttonText}
    </button>
  );
} 