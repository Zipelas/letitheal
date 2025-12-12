import { dbConnect } from '@/lib/mongoose';
import Booking from '@/models/Booking';
import Heal from '@/models/Heal';
import { NextRequest, NextResponse } from 'next/server';
import { Types } from 'mongoose';

export async function GET(req: NextRequest) {
  await dbConnect();
  const url = new URL(req.url);
  const limitParam = url.searchParams.get('limit');
  const pageParam = url.searchParams.get('page');
  const limit = Math.min(Math.max(parseInt(limitParam || '20', 10) || 20, 1), 100);
  const page = Math.max(parseInt(pageParam || '1', 10) || 1, 1);
  const skip = (page - 1) * limit;
  const items = await Booking.find({}).sort({ createdAt: -1 }).skip(skip).limit(limit).lean();
  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
  } catch {
    return NextResponse.json({ error: 'DB connect failed' }, { status: 500 });
  }
  const body = (await req.json().catch(() => null)) as null | {
    heal?: string;
    firstName?: string;
    lastName?: string;
    address?: { street?: string; city?: string; postalCode?: string };
    phone?: string;
    email?: string;
    scheduledAt?: string | Date;
    mode?: 'onsite' | 'online';
    termsAccepted?: boolean;
  };

  if (!body)
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });

  const {
    heal,
    firstName,
    lastName,
    address,
    phone,
    email,
    scheduledAt,
    mode,
    termsAccepted,
  } = body;

  if (!heal)
    return NextResponse.json({ error: 'heal is required' }, { status: 400 });
  if (!firstName)
    return NextResponse.json(
      { error: 'firstName is required' },
      { status: 400 }
    );
  if (!lastName)
    return NextResponse.json(
      { error: 'lastName is required' },
      { status: 400 }
    );
  if (!scheduledAt)
    return NextResponse.json(
      { error: 'scheduledAt is required' },
      { status: 400 }
    );
  if (mode !== 'onsite' && mode !== 'online')
    return NextResponse.json(
      { error: 'mode must be onsite or online' },
      { status: 400 }
    );
  if (termsAccepted !== true)
    return NextResponse.json(
      { error: 'termsAccepted must be true' },
      { status: 400 }
    );

  // Validate heal id format before querying
  if (!Types.ObjectId.isValid(heal)) {
    return NextResponse.json({ error: 'invalid heal id' }, { status: 400 });
  }
  // Verify referenced Heal exists
  const healExists = await Heal.findById(heal).select('_id').lean();
  if (!healExists) {
    return NextResponse.json({ error: 'Heal not found' }, { status: 404 });
  }

  const scheduled =
    typeof scheduledAt === 'string' ? new Date(scheduledAt) : scheduledAt;
  if (!scheduled || isNaN(scheduled.getTime())) {
    return NextResponse.json(
      { error: 'scheduledAt must be a valid date' },
      { status: 400 }
    );
  }

  try {
    const doc = await Booking.create({
      heal,
      firstName,
      lastName,
      address,
      phone,
      email,
      scheduledAt: scheduled,
      mode,
      termsAccepted: true,
      termsAcceptedAt: new Date(),
    });
    return NextResponse.json(doc, { status: 201 });
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Create failed';
    return NextResponse.json(
      { error: 'Create failed', message: msg },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  await dbConnect();
  const url = new URL(req.url);
  const idFromQuery = url.searchParams.get('id');
  const body = (await req.json().catch(() => ({}))) as Partial<{
    id: string;
    firstName: string;
    lastName: string;
    address: { street?: string; city?: string; postalCode?: string };
    phone: string;
    email: string;
    scheduledAt: string | Date;
    mode: 'onsite' | 'online';
    status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
    termsAccepted: boolean; // immutable by policy
  }>;

  const id = body.id ?? idFromQuery ?? undefined;
  if (!id || typeof id !== 'string') {
    return NextResponse.json(
      { error: 'id is required (query ?id= or in body)' },
      { status: 400 }
    );
  }
  if (!Types.ObjectId.isValid(id)) {
    return NextResponse.json({ error: 'invalid id' }, { status: 400 });
  }

  const update: Record<string, unknown> = {};
  if (typeof body.firstName === 'string') update.firstName = body.firstName;
  if (typeof body.lastName === 'string') update.lastName = body.lastName;
  if (body.address && typeof body.address === 'object')
    update.address = body.address;
  if (typeof body.phone === 'string') update.phone = body.phone;
  if (typeof body.email === 'string') update.email = body.email;
  if (typeof body.status === 'string') {
    const allowed: Array<'pending' | 'confirmed' | 'cancelled' | 'completed'> = ['pending', 'confirmed', 'cancelled', 'completed'];
    if (!allowed.includes(body.status)) {
      return NextResponse.json({ error: 'invalid status' }, { status: 400 });
    }
    update.status = body.status;
  }
  if (body.mode === 'onsite' || body.mode === 'online') update.mode = body.mode;
  if (
    typeof body.scheduledAt === 'string' ||
    body.scheduledAt instanceof Date
  ) {
    const d =
      typeof body.scheduledAt === 'string'
        ? new Date(body.scheduledAt)
        : body.scheduledAt;
    if (!d || isNaN(d.getTime())) {
      return NextResponse.json(
        { error: 'scheduledAt must be a valid date' },
        { status: 400 }
      );
    }
    update.scheduledAt = d;
  }

  if (typeof body.termsAccepted === 'boolean') {
    return NextResponse.json(
      { error: 'termsAccepted cannot be changed' },
      { status: 400 }
    );
  }

  if (Object.keys(update).length === 0) {
    return NextResponse.json({ error: 'No fields to update' }, { status: 400 });
  }

  const updated = await Booking.findByIdAndUpdate(id, update, {
    new: true,
    runValidators: true,
  }).lean();
  if (!updated)
    return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
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
  if (!Types.ObjectId.isValid(id)) {
    return NextResponse.json({ error: 'invalid id' }, { status: 400 });
  }

  const deleted = await Booking.findByIdAndDelete(id).lean();
  if (!deleted)
    return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
  return NextResponse.json({ ok: true });
}
