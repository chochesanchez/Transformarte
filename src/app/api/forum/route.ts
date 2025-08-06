import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

export async function POST(request: Request) {
  const prisma = new PrismaClient();
  try {
    const data = await request.json();
    const { name, title, content, imageUrl } = data;

    // Create a temporary user for the post
    const user = await prisma.user.create({
      data: {
        email: `${Date.now()}@temp.com`, // Temporary email
        passwordHash: 'temp',
        fullName: name,
        role: 'user'
      }
    });

    // Create the forum post
    const post = await prisma.forumPost.create({
      data: {
        userId: user.id,
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
  } finally {
    await prisma.$disconnect();
  }
} 