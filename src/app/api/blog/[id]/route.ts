import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Blog from '@/models/Blog';
import { verifyAuth } from '@/lib/security';
import { isValidObjectId } from '@/lib/validation';

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;

    let post = await Blog.findOne({ slug: id }).lean();
    if (!post && isValidObjectId(id)) {
      post = await Blog.findById(id).lean();
    }

    if (!post) {
      return NextResponse.json({ success: false, message: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: post });
  } catch (error) {
    console.error('Error fetching post:', error);
    return NextResponse.json({ success: false, message: 'Failed to fetch post' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const auth = verifyAuth(request);
    if (!auth.valid) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    if (!isValidObjectId(id)) {
      return NextResponse.json({ message: 'Invalid post ID' }, { status: 400 });
    }

    const post = await Blog.findById(id);
    if (!post) {
      return NextResponse.json({ message: 'Post not found' }, { status: 404 });
    }

    const body = await request.json();
    const { title, content, excerpt, tags, status } = body;

    if (title !== undefined) {
      post.title = title.trim();
      const newSlug = slugify(title.trim());
      if (newSlug !== post.slug) {
        const conflict = await Blog.findOne({ slug: newSlug, _id: { $ne: id } });
        post.slug = conflict ? `${newSlug}-${Date.now()}` : newSlug;
      }
    }
    if (content !== undefined) post.content = content;
    if (excerpt !== undefined) post.excerpt = excerpt?.trim() || '';
    if (tags !== undefined) post.tags = Array.isArray(tags) ? tags.filter(Boolean) : [];
    if (status !== undefined) {
      const wasUnpublished = post.status !== 'published';
      post.status = status;
      if (status === 'published' && wasUnpublished) {
        post.publishDate = new Date();
      }
    }

    await post.save();

    return NextResponse.json({ success: true, data: post });
  } catch (error) {
    console.error('Error updating post:', error);
    return NextResponse.json({ success: false, message: 'Failed to update post' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const auth = verifyAuth(request);
    if (!auth.valid) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    if (!isValidObjectId(id)) {
      return NextResponse.json({ message: 'Invalid post ID' }, { status: 400 });
    }

    const post = await Blog.findByIdAndDelete(id);
    if (!post) {
      return NextResponse.json({ message: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Post deleted' });
  } catch (error) {
    console.error('Error deleting post:', error);
    return NextResponse.json({ success: false, message: 'Failed to delete post' }, { status: 500 });
  }
}
