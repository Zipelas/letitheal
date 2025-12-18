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
  phone: z
    .string()
    .trim()
    .optional()
    .superRefine((val, ctx) => {
      if (val && val.length > 0) {
        const digits = val.replace(/\D/g, '');
        if (digits.length < 7) {
          ctx.addIssue({
            code: 'custom',
            message: 'Telefonnumret måste innehålla minst 7 siffror',
          });
        }
        if (!/^\+?[\d\s\-()]+$/.test(val)) {
          ctx.addIssue({
            code: 'custom',
            message: 'Ogiltigt telefonnummerformat',
          });
        }
      }
    }),
  termsAccepted: z.coerce.boolean(),
});

function normalizePhone(input: string): string {
  const trimmed = input.trim();
  if (!trimmed) return '';
  let cleaned = trimmed.replace(/[^\d+]/g, '');
  if (cleaned.startsWith('+')) {
    cleaned = '+' + cleaned.slice(1).replace(/[^\d]/g, '');
  } else {
    cleaned = cleaned.replace(/[^\d]/g, '');
  }
  return cleaned;
}

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
          if (digits.length < 7) {
      phone,
      termsAccepted,
          if (digits.length > 12) {
            ctx.addIssue({ code: 'custom', message: 'Telefonnumret får innehålla högst 12 siffror' });
          }
          // Allow optional single leading + for international numbers
          if (!/^\+?[\d\s\-()]+$/.test(val)) {

    if (!termsAccepted) {
          if (val.includes('+') && !val.startsWith('+')) {
            ctx.addIssue({ code: 'custom', message: 'Plustecken får bara stå först i numret' });
          }
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
      phone: phone ? normalizePhone(phone) : undefined,
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
    console.error('Register API error:', error);
    return NextResponse.json({ error: 'Serverfel' }, { status: 500 });
  }
}
