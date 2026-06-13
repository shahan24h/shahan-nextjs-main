import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Blog from '@/models/Blog';
import { verifyAuth } from '@/lib/security';

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const url = new URL(request.url);
    const showAll = url.searchParams.get('all') === 'true';

    if (showAll) {
      const auth = verifyAuth(request);
      if (!auth.valid) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
      }
      const posts = await Blog.find({})
        .sort({ createdAt: -1 })
        .select('title slug excerpt tags status publishDate createdAt updatedAt')
        .lean();
      return NextResponse.json({ success: true, data: posts });
    }

    const posts = await Blog.find({ status: 'published' })
      .sort({ publishDate: -1, createdAt: -1 })
      .select('title slug excerpt tags publishDate createdAt')
      .lean();

    return NextResponse.json({ success: true, data: posts });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json({ success: false, message: 'Failed to fetch posts' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const auth = verifyAuth(request);
    if (!auth.valid) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { title, content, excerpt, tags, status } = body;

    if (!title?.trim() || !content?.trim()) {
      return NextResponse.json({ message: 'Title and content are required' }, { status: 400 });
    }

    let slug = slugify(title.trim());
    const existing = await Blog.findOne({ slug });
    if (existing) {
      slug = `${slug}-${Date.now()}`;
    }

    const post = new Blog({
      title: title.trim(),
      slug,
      content: content.trim(),
      excerpt: excerpt?.trim() || '',
      tags: Array.isArray(tags) ? tags.filter(Boolean) : [],
      status: status === 'published' ? 'published' : 'draft',
      author: auth.userId,
      publishDate: status === 'published' ? new Date() : undefined,
    });

    await post.save();

    return NextResponse.json({ success: true, data: post }, { status: 201 });
  } catch (error) {
    console.error('Error creating blog post:', error);
    return NextResponse.json({ success: false, message: 'Failed to create post' }, { status: 500 });
  }
}
