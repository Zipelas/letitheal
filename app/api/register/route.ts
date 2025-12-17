import { dbConnect } from '@/lib/mongoose';
import User from '@/models/User';
import argon2 from 'argon2';
import { NextResponse } from 'next/server';
import { z } from 'zod';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function getErrInfo(err: unknown): { name?: string; message?: string } {
  const anyErr = err as { name?: string; message?: string };
  return { name: anyErr?.name, message: anyErr?.message };
}

const RegisterSchema = z.object({
  email: z.string().trim().toLowerCase().email('Ogiltig e-postadress'),
  password: z.string().min(8, 'Lösenordet måste vara minst 8 tecken'),
  firstName: z.string().trim().optional(),
  lastName: z.string().trim().optional(),
  street: z.string().trim().optional(),
  postalCode: z.string().trim().optional(),
  city: z.string().trim().optional(),
  termsAccepted: z.coerce.boolean(),
});

export async function POST(req: Request) {
  try {
    const vercelEnv = process.env.VERCEL_ENV;
    const mongoUriSet = !!process.env.MONGODB_URI;
    console.log('Register API init', { runtime, vercelEnv, mongoUriSet });

    const json = await req.json();
    const parsed = RegisterSchema.safeParse(json);
    if (!parsed.success) {
      const firstErr = parsed.error.errors[0]?.message || 'Ogiltig data';
      return NextResponse.json({ error: firstErr }, { status: 400 });
    }
    const {
      email,
      password,
      firstName,
      lastName,
      street,
      postalCode,
      city,
      termsAccepted,
    } = parsed.data;

    if (!termsAccepted) {
      return NextResponse.json(
        { error: 'Du måste godkänna villkoren' },
        { status: 400 }
      );
    }

    try {
      await dbConnect();
      // readyState: 1 means connected
      // 0: disconnected, 2: connecting, 3: disconnecting
      // We avoid importing mongoose here; just rely on successful promise
      console.log('Register API DB connected');
    } catch (connErr: unknown) {
      const { name, message } = getErrInfo(connErr);
      console.error('Register API DB connect error', { name, message });
      // Provide a clearer client error while keeping details in logs
      const isMissingUri = /Missing MONGODB_URI/i.test(message || '');
      const isSelectionErr = name === 'MongooseServerSelectionError';
      const hint = isMissingUri
        ? 'Databas-URL saknas i miljövariabler'
        : isSelectionErr
        ? 'Databasen kan inte nås från servern'
        : 'Kunde inte ansluta till databasen';
      return NextResponse.json({ error: hint }, { status: 500 });
    }

    const existing = await User.findOne({ email }).lean();
    if (existing) {
      return NextResponse.json(
        { error: 'E-postadressen är redan registrerad' },
        { status: 409 }
      );
    }

    const passwordHash = await argon2.hash(password);

    const user = await User.create({
      email,
      firstName,
      lastName,
      address: {
        street,
        city,
        postalCode,
      },
      termsAccepted: !!termsAccepted,
      termsAcceptedAt: termsAccepted ? new Date() : undefined,
      role: 'user',
      passwordHash,
    });

    return NextResponse.json(
      { id: user._id, email: user.email },
      { status: 201 }
    );
  } catch (error: unknown) {
    const { name, message } = getErrInfo(error);
    console.error('Register API error:', { name, message });
    return NextResponse.json({ error: 'Serverfel' }, { status: 500 });
  }
}

// Minimal GET for diagnostics: returns environment presence and DB reachability.
export async function GET() {
  try {
    const vercelEnv = process.env.VERCEL_ENV;
    const mongoUriSet = !!process.env.MONGODB_URI;
    try {
      await dbConnect();
      console.log('Register API GET: DB connected');
      return NextResponse.json(
        { ok: true, vercelEnv, mongoUriSet, db: 'connected' },
        { status: 200 }
      );
    } catch (e: unknown) {
      const { name, message } = getErrInfo(e);
      console.error('Register API GET DB connect error', { name, message });
      return NextResponse.json(
        { ok: false, vercelEnv, mongoUriSet, db: 'error' },
        { status: 500 }
      );
    }
  } catch (e: unknown) {
    const { name, message } = getErrInfo(e);
    console.error('Register API GET error', { name, message });
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
