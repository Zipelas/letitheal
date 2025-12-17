import { dbConnect } from '@/lib/mongoose';
import User from '@/models/User';
import argon2 from 'argon2';
import { NextResponse } from 'next/server';
import { z } from 'zod';

export const runtime = 'nodejs';
// API route runs on Node.js runtime for database access

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
    await dbConnect();

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
    console.error('Register API error');
    return NextResponse.json({ error: 'Serverfel' }, { status: 500 });
  }
}
