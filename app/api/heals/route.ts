import { dbConnect } from '@/lib/mongoose';
import Heal from '@/models/Heal';
import { NextRequest, NextResponse } from 'next/server';

// If client doesn't provide an explicit slug, automatically generate a unique one
// by appending -2, -3, ... when the base slug already exists.
async function generateUniqueSlug(base: string) {
  // Find all slugs matching base or base-<number>
  const regex = new RegExp(`^${base}(?:-\\d+)?$`);
  const existing = await Heal.find({ slug: { $regex: regex } })
    .select('slug')
    .lean();

  if (existing.length === 0) return base;

  // Track highest numeric suffix among matches
  let maxSuffix = 1; // 1 indicates the base exists, so next should be 2
  let baseExists = false;
  for (const doc of existing) {
    const s = (doc as { slug: string }).slug;
    if (s === base) {
      baseExists = true;
      continue;
    }
    const m = s.match(/-(\d+)$/);
    if (m) {
      const n = parseInt(m[1], 10);
      if (!Number.isNaN(n) && n > maxSuffix) maxSuffix = n;
    }
  }
  if (!baseExists) return base; // only suffixed variants exist; base is free
  return `${base}-${maxSuffix + 1}`;
}

export async function GET() {
  await dbConnect();
  const items = await Heal.find({}).sort({ createdAt: -1 }).lean();
  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  await dbConnect();
  const body = (await req.json().catch(() => null)) as null | {
    title?: string;
    slug?: string;
    description?: string;
    overview?: string;
    imageUrl?: string;
    location?: string;
    date?: string;
    time?: string;
    price?: number;
    mode?: 'onsite' | 'online' | 'hybrid';
    tags?: string[];
  };

  if (!body) {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const {
    title,
    slug,
    description,
    overview,
    imageUrl,
    location,
    date,
    time,
    price,
    mode,
    tags,
  } = body;

  // Basic validation aligned with schema
  if (!title)
    return NextResponse.json({ error: 'title is required' }, { status: 400 });
  if (!description)
    return NextResponse.json(
      { error: 'description is required' },
      { status: 400 }
    );
  if (!overview)
    return NextResponse.json(
      { error: 'overview is required' },
      { status: 400 }
    );
  if (!imageUrl)
    return NextResponse.json(
      { error: 'imageUrl is required' },
      { status: 400 }
    );
  if (!location)
    return NextResponse.json(
      { error: 'location is required' },
      { status: 400 }
    );
  if (!date)
    return NextResponse.json({ error: 'date is required' }, { status: 400 });
  if (!time)
    return NextResponse.json({ error: 'time is required' }, { status: 400 });
  if (typeof price !== 'number')
    return NextResponse.json(
      { error: 'price (number) is required' },
      { status: 400 }
    );
  if (!mode)
    return NextResponse.json(
      { error: 'mode is required (onsite|online|hybrid)' },
      { status: 400 }
    );
  if (!Array.isArray(tags) || tags.length === 0)
    return NextResponse.json(
      { error: 'tags (non-empty array) is required' },
      { status: 400 }
    );

  // Generate base slug from provided slug or title
  const baseSlug = (slug ?? title ?? '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
  if (!baseSlug) {
    return NextResponse.json(
      { error: 'slug could not be generated' },
      { status: 400 }
    );
  }

  // If client explicitly provided slug, enforce uniqueness strictly (409 on conflict).
  // If not provided, auto-deduplicate by appending -2, -3, ... as needed.
  let finalSlug = baseSlug;
  if (slug) {
    const exists = await Heal.exists({ slug: baseSlug });
    if (exists) {
      return NextResponse.json(
        { error: 'slug already exists' },
        { status: 409 }
      );
    }
  } else {
    finalSlug = await generateUniqueSlug(baseSlug);
  }

  const doc = await Heal.create({
    title,
    slug: finalSlug,
    description,
    overview,
    imageUrl,
    location,
    date,
    time,
    price,
    mode,
    tags,
  });

  return NextResponse.json(doc, { status: 201 });
}

export async function PUT(req: NextRequest) {
  await dbConnect();
  const url = new URL(req.url);
  const idFromQuery = url.searchParams.get('id');
  const body = (await req.json().catch(() => ({}))) as Partial<{
    id: string;
    title: string;
    slug: string; // immutable by policy
    description: string;
    overview: string;
    imageUrl: string;
    location: string;
    date: string;
    time: string;
    price: number;
    mode: 'onsite' | 'online' | 'hybrid';
    tags: string[];
  }>;

  const id = body.id ?? idFromQuery ?? undefined;
  if (!id || typeof id !== 'string') {
    return NextResponse.json(
      { error: 'id is required (query ?id= or in body)' },
      { status: 400 }
    );
  }

  const update: Record<string, unknown> = {};
  if (typeof body.title === 'string') update.title = body.title;
  // Disallow slug changes to keep stable permalinks
  if (typeof body.slug === 'string') {
    return NextResponse.json(
      { error: 'slug cannot be changed' },
      { status: 400 }
    );
  }
  if (typeof body.description === 'string')
    update.description = body.description;
  if (typeof body.overview === 'string') update.overview = body.overview;
  if (typeof body.imageUrl === 'string') update.imageUrl = body.imageUrl;
  if (typeof body.location === 'string') update.location = body.location;
  if (typeof body.date === 'string') update.date = body.date;
  if (typeof body.time === 'string') update.time = body.time;
  if (typeof body.price === 'number') update.price = body.price;
  if (typeof body.mode === 'string') update.mode = body.mode;
  if (Array.isArray(body.tags)) update.tags = body.tags;

  if (Object.keys(update).length === 0) {
    return NextResponse.json({ error: 'No fields to update' }, { status: 400 });
  }

  const updated = await Heal.findByIdAndUpdate(id, update, {
    new: true,
  }).lean();
  if (!updated) {
    return NextResponse.json({ error: 'Heal not found' }, { status: 404 });
  }
  return NextResponse.json(updated);
}

export async function DELETE(req: NextRequest) {
  await dbConnect();
  const url = new URL(req.url);
  const id = url.searchParams.get('id');
  if (!id || typeof id !== 'string') {
    return NextResponse.json(
      { error: 'id is required as query ?id=' },
      { status: 400 }
    );
  }

  const deleted = await Heal.findByIdAndDelete(id).lean();
  if (!deleted) {
    return NextResponse.json({ error: 'Heal not found' }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}
