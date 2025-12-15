import { dbConnect } from '@/lib/mongoose';
import User from '@/models/User';
import argon2 from 'argon2';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, firstName, lastName, termsAccepted } = body || {};

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email och lösenord krävs' },
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
      termsAccepted: !!termsAccepted,
      termsAcceptedAt: termsAccepted ? new Date() : undefined,
      role: 'user',
      passwordHash,
    });

    return NextResponse.json(
      { id: user._id, email: user.email },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json({ error: 'Serverfel' }, { status: 500 });
  }
}
