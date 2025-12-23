import { dbConnect } from '@/lib/mongoose';
import Booking from '@/models/Booking';
import User from '@/models/User';
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';
import { z } from 'zod';

export const runtime = 'nodejs';

// Minimal API stubs to satisfy Next.js module requirements
// TODO: Implement real booking CRUD
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const userIdParam = url.searchParams.get('userId');
    const emailParam = url.searchParams.get('email');

    // Allow optional filtering; if none provided, return all

    if (userIdParam && !mongoose.Types.ObjectId.isValid(userIdParam)) {
      return NextResponse.json({ error: 'Ogiltigt userId' }, { status: 400 });
    }

    await dbConnect();

    const filter: Record<string, unknown> = {};
    if (userIdParam) {
      filter.user = new mongoose.Types.ObjectId(userIdParam);
    }
    if (emailParam) {
      filter.email = emailParam.toLowerCase();
    }

    const bookings = await Booking.find(filter).sort({ createdAt: -1 }).lean();

    return NextResponse.json(
      bookings.map((b) => ({
        _id: b._id,
        user: b.user,
        heal: b.heal,
        firstName: b.firstName,
        lastName: b.lastName,
        address: b.address,
        phone: b.phone,
        email: b.email,
        scheduledAt: b.scheduledAt,
        mode: b.mode,
        createdAt: b.createdAt,
      }))
    );
  } catch {
    return NextResponse.json({ error: 'Serverfel' }, { status: 500 });
  }
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

    // Provide stable sentinel Heal ObjectIds by mode
    // These can later be replaced with real Heal documents
    const healId = new mongoose.Types.ObjectId(
      mode === 'onsite'
        ? '000000000000000000005001'
        : '000000000000000000005002'
    );

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
  } catch {
    return NextResponse.json({ error: 'Serverfel' }, { status: 500 });
  }
}

// Update booking via query id (supports requests.rest)
export async function PUT(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get('id');

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Ogiltigt id' }, { status: 400 });
    }

    await dbConnect();

    const booking = await Booking.findById(id).lean();
    if (!booking) {
      return NextResponse.json(
        { error: 'Bokning hittades inte' },
        { status: 404 }
      );
    }

    const UpdateSchema = z.object({
      firstName: z.string().trim().optional(),
      lastName: z.string().trim().optional(),
      address: z
        .object({
          street: z.string().trim().optional(),
          city: z.string().trim().optional(),
          postalCode: z.string().trim().optional(),
        })
        .optional(),
      phone: z.string().trim().optional(),
      email: z.string().trim().email().optional(),
      scheduledAt: z.string().optional(),
      mode: z.enum(['onsite', 'online']).optional(),
      status: z
        .enum(['pending', 'confirmed', 'cancelled', 'completed'])
        .optional(),
    });

    const body = await req.json().catch(() => ({}));
    const parsed = UpdateSchema.safeParse(body);
    if (!parsed.success) {
      const first = parsed.error.errors[0]?.message || 'Ogiltig data';
      return NextResponse.json({ error: first }, { status: 400 });
    }

    const update: Record<string, unknown> = {};
    if (parsed.data.firstName) update.firstName = parsed.data.firstName;
    if (parsed.data.lastName) update.lastName = parsed.data.lastName;
    if (parsed.data.address) update.address = parsed.data.address;
    if (parsed.data.phone) update.phone = normalizePhone(parsed.data.phone);
    if (parsed.data.email) update.email = parsed.data.email.toLowerCase();
    if (parsed.data.mode) update.mode = parsed.data.mode;
    if (parsed.data.status) update.status = parsed.data.status;
    if (parsed.data.scheduledAt) {
      const d = new Date(parsed.data.scheduledAt);
      if (Number.isNaN(d.getTime())) {
        return NextResponse.json({ error: 'Ogiltigt datum' }, { status: 400 });
      }
      update.scheduledAt = d;
    }

    const updated = await Booking.findByIdAndUpdate(
      id,
      { $set: update },
      { new: true }
    ).lean();
    return NextResponse.json({ id: updated?._id?.toString() }, { status: 200 });
  } catch {
    return NextResponse.json({ error: 'Serverfel' }, { status: 500 });
  }
}

// Delete booking via query id (supports requests.rest)
export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get('id');
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Ogiltigt id' }, { status: 400 });
    }
    await dbConnect();

    const booking = await Booking.findById(id).lean();
    if (!booking) {
      return NextResponse.json(
        { error: 'Bokning hittades inte' },
        { status: 404 }
      );
    }
    await Booking.findByIdAndDelete(id);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch {
    return NextResponse.json({ error: 'Serverfel' }, { status: 500 });
  }
}
