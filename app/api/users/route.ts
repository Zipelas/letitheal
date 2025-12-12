import { dbConnect } from '@/lib/mongoose';
import User from '@/models/User';
import { NextRequest, NextResponse } from 'next/server';
import argon2 from 'argon2';

export async function GET() {
  await dbConnect();
  const users = await User.find({}, { passwordHash: 0 }).sort({ createdAt: -1 }).lean();
  return NextResponse.json(users);
}

export async function POST(req: NextRequest) {
  await dbConnect();
  const body = (await req.json().catch(() => null)) as null | {
    email?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    address?: { street?: string; city?: string; postalCode?: string };
    phone?: string;
    termsAccepted?: boolean;
  };

  if (!body) {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const { email, password, firstName, lastName, address, phone, termsAccepted } = body;

  if (!email) return NextResponse.json({ error: 'email is required' }, { status: 400 });
  if (!/.+@.+\..+/.test(email))
    return NextResponse.json({ error: 'invalid email' }, { status: 400 });

  if (!password || typeof password !== 'string' || password.length < 8) {
    return NextResponse.json({ error: 'password min length 8' }, { status: 400 });
  }

  if (termsAccepted !== true) {
    return NextResponse.json({ error: 'termsAccepted must be true' }, { status: 400 });
  }

  const existing = await User.findOne({ email }).lean();
  if (existing) {
    return NextResponse.json({ error: 'email already in use' }, { status: 409 });
  }

  const passwordHash = await argon2.hash(password);

  const doc = await User.create({
    email,
    passwordHash,
    firstName,
    lastName,
    address,
    phone,
    role: 'user',
    termsAccepted: true,
    termsAcceptedAt: new Date(),
  });

  const safe = {
    _id: doc._id,
    email: doc.email,
    firstName: doc.firstName,
    lastName: doc.lastName,
    address: doc.address,
    phone: doc.phone,
    role: doc.role,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  };

  return NextResponse.json(safe, { status: 201 });
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
    role: 'user' | 'admin';
    termsAccepted: boolean; // immutable here; must be true at creation
    password?: string; // optional: if present, re-hash and replace
  }>;

  const id = body.id ?? idFromQuery ?? undefined;
  if (!id || typeof id !== 'string') {
    return NextResponse.json(
      { error: 'id is required (query ?id= or in body)' },
      { status: 400 }
    );
  }

  const update: Record<string, unknown> = {};
  if (typeof body.firstName === 'string') update.firstName = body.firstName;
  if (typeof body.lastName === 'string') update.lastName = body.lastName;
  if (typeof body.phone === 'string') update.phone = body.phone;
  if (typeof body.role === 'string') update.role = body.role;
  if (body.address && typeof body.address === 'object') update.address = body.address;

  // Disallow changing termsAccepted here; must be true at creation
  if (typeof body.termsAccepted === 'boolean') {
    return NextResponse.json({ error: 'termsAccepted cannot be changed via PUT' }, { status: 400 });
  }

  // Optional password reset: when provided, hash and store
  if (typeof body.password === 'string') {
    if (body.password.length < 8)
      return NextResponse.json({ error: 'password min length 8' }, { status: 400 });
    const passwordHash = await argon2.hash(body.password);
    update.passwordHash = passwordHash;
  }

  if (Object.keys(update).length === 0) {
    return NextResponse.json({ error: 'No fields to update' }, { status: 400 });
  }

  const updated = await User.findByIdAndUpdate(id, update, {
    new: true,
    projection: { passwordHash: 0 },
  }).lean();
  if (!updated) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
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

  const deleted = await User.findByIdAndDelete(id, { projection: { passwordHash: 0 } }).lean();
  if (!deleted) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}