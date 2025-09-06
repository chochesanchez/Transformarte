import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAuthUser } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const authUser = await getAuthUser(request);
    if (!authUser) {
      return NextResponse.json({ success: false, error: 'Authentication required' }, { status: 401 });
    }
    const data = await request.json();
    const { title, content, imageUrl } = data;

    // Create the forum post
    const post = await prisma.forumPost.create({
      data: {
        userId: authUser.id,
        title,
        content,
        imageUrl,
        isHidden: false // Posts are visible by default
      }
    });

    return NextResponse.json({ success: true, post });
  } catch (error) {
    console.error('Error creating forum post:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create post' },
      { status: 500 }
    );
  }
} 