import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-server';

// GET — list all blog posts (for admin/owner panels)
export async function GET() {
  const { data, error } = await supabaseAdmin
    .from('js_blog_posts')
    .select('id, title, slug, category, author, published_date, read_time, published')
    .order('published_date', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}

// POST — create a new blog post
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, excerpt, content, author, category, tags, cover_image, read_time, published } = body;

    if (!title || !category) {
      return NextResponse.json({ error: 'Title and category are required' }, { status: 400 });
    }

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-');

    const { data, error } = await supabaseAdmin.from('js_blog_posts').insert({
      title,
      slug,
      excerpt: excerpt || '',
      content: content || '',
      author: author || 'JusRental Team',
      category,
      tags: tags || [],
      cover_image: cover_image || '/images/scene-1.png',
      read_time: read_time || 5,
      published_date: new Date().toISOString().slice(0, 10),
      published: published ?? true,
    }).select('id').single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ result: 'success', id: data.id });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Failed to create blog post' },
      { status: 500 },
    );
  }
}

// PUT — update a blog post
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...fields } = body;

    if (!id) {
      return NextResponse.json({ error: 'Post id is required' }, { status: 400 });
    }

    const { error } = await supabaseAdmin
      .from('js_blog_posts')
      .update(fields)
      .eq('id', id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ result: 'success' });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Failed to update blog post' },
      { status: 500 },
    );
  }
}

// DELETE — delete a blog post
export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json({ error: 'Post id is required' }, { status: 400 });
    }

    const { error } = await supabaseAdmin
      .from('js_blog_posts')
      .delete()
      .eq('id', id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ result: 'success' });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Failed to delete blog post' },
      { status: 500 },
    );
  }
}
