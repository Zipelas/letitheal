import { dbConnect } from '@/lib/mongoose';
import Booking from '@/models/Booking';
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function DELETE(
  _req: Request,
  context: { params: { id: string } }
) {
  try {
    const id = context.params.id;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Ogiltigt ID' }, { status: 400 });
    }

    await dbConnect();

    const deleted = await Booking.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json(
        { error: 'Bokning hittades inte' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: 'Serverfel' }, { status: 500 });
  }
}
