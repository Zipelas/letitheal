import { dbConnect } from '@/lib/mongoose';
import Booking from '@/models/Booking';
import User from '@/models/User';
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';
import { z } from 'zod';

export const runtime = 'nodejs';

// Minimal API stubs to satisfy Next.js module requirements
// TODO: Implement real booking CRUD
export async function GET() {
  return NextResponse.json([]);
}

const ALLOWED_SLOT_IDS = [
  '09:00-09:45',
  '10:00-10:45',
  '11:00-11:45',
  '13:00-13:45',
  '14:00-14:45',
  '15:00-15:45',
  '16:00-16:45',
] as const;

const BodySchema = z.object({
  scheduledDate: z
    .string()
    .min(1)
    .refine((v) => !Number.isNaN(new Date(v).getTime()), 'Ogiltigt datum'),
  scheduledTime: z
    .string()
    .refine(
      (val) => /^\d{2}:\d{2}-\d{2}:\d{2}$/.test(val),
      'Ogiltigt tidsformat'
    )
    .refine(
      (val) =>
        ALLOWED_SLOT_IDS.includes(val as (typeof ALLOWED_SLOT_IDS)[number]),
      'Välj en giltig tidslucka'
    ),
  mode: z.enum(['onsite', 'online']),
  firstName: z.string().trim().min(1),
  lastName: z.string().trim().min(1),
  street: z.string().trim().min(1),
  postalCode: z.string().trim().min(1),
  city: z.string().trim().min(1),
  phone: z
    .string()
    .trim()
    .min(1)
    .superRefine((val, ctx) => {
      const digits = val.replace(/\D/g, '');
      if (digits.length < 7)
        ctx.addIssue({
          code: 'custom',
          message: 'Telefonnumret måste innehålla minst 7 siffror',
        });
      if (digits.length > 12)
        ctx.addIssue({
          code: 'custom',
          message: 'Telefonnumret får innehålla högst 12 siffror',
        });
      if (!/^\+?[\d\s\-()]+$/.test(val))
        ctx.addIssue({
          code: 'custom',
          message: 'Ogiltigt telefonnummerformat',
        });
      if (val.includes('+') && !val.startsWith('+'))
        ctx.addIssue({
          code: 'custom',
          message: 'Plustecken får bara stå först i numret',
        });
    }),
  email: z.string().trim().toLowerCase().email('Ogiltig e-postadress'),
  termsAccepted: z.coerce.boolean(),
});

function normalizePhone(p: string): string {
  let s = p.trim();
  s = s.replace(/\s+/g, '');
  if (s.startsWith('00')) s = '+' + s.slice(2);
  if (!s.startsWith('+') && /^0/.test(s)) {
    // naive: assume Swedish numbers when no country code
    s = '+46' + s.replace(/^0+/, '');
  }
  return s;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = BodySchema.safeParse(body);
    if (!parsed.success) {
      const first = parsed.error.errors[0]?.message || 'Ogiltig data';
      return NextResponse.json({ error: first }, { status: 400 });
    }
    if (!parsed.data.termsAccepted) {
      return NextResponse.json(
        { error: 'Du måste godkänna villkoren' },
        { status: 400 }
      );
    }

    const {
      scheduledDate,
      scheduledTime,
      mode,
      firstName,
      lastName,
      street,
      postalCode,
      city,
      phone,
      email,
    } = parsed.data;

    // Compute scheduledAt from date and the slot start
    const [start] = scheduledTime.split('-');
    const [hh, mm] = start.split(':').map((n) => parseInt(n, 10));
    const scheduledAt = new Date(scheduledDate);
    scheduledAt.setHours(hh, mm, 0, 0);

    await dbConnect();

    // Provide a placeholder heal ObjectId until UI supplies a real one
    const healId = new mongoose.Types.ObjectId('000000000000000000000000');

    const existingUser = await User.findOne({ email }).select('_id').lean();
    const created = await Booking.create({
      user: existingUser?._id,
      heal: healId,
      firstName,
      lastName,
      address: { street, postalCode, city },
      phone: normalizePhone(phone),
      email,
      scheduledAt,
      mode,
      termsAccepted: true,
      termsAcceptedAt: new Date(),
    });

    return NextResponse.json({ id: created._id.toString() }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: 'Serverfel' }, { status: 500 });
  }
}
