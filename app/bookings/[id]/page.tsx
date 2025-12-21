import { dbConnect } from '@/lib/mongoose';
import Booking from '@/models/Booking';
import mongoose from 'mongoose';
import Link from 'next/link';

type PageProps = { params: Promise<{ id: string }> };

function formatDateTime(d: Date): { date: string; time: string } {
  const date = new Intl.DateTimeFormat('sv-SE', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(d);
  const time = new Intl.DateTimeFormat('sv-SE', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(d);
  return { date, time };
}

export default async function BookingDetailPage({ params }: PageProps) {
  const { id } = await params;
  const valid = mongoose.isValidObjectId(id);
  await dbConnect();
  const booking = valid
    ? await Booking.findById(new mongoose.Types.ObjectId(id)).lean()
    : null;

  if (!valid || !booking) {
    return (
      <main className='min-h-screen p-6 text-inter-sans-serif'>
        <section className='max-w-2xl mx-auto'>
          <h1 className='text-quicksand-sans-serif text-2xl sm:text-3xl font-semibold'>
            Bokning kunde inte hittas
          </h1>
          <p className='mt-2 text-gray-600'>
            {valid
              ? `Vi hittar ingen bokning med ID: ${id}.`
              : 'Ogiltigt boknings-ID.'}
          </p>
          <div className='mt-4'>
            <Link
              href='/bookings'
              className='underline'>
              Tillbaka till bokning
            </Link>
          </div>
        </section>
      </main>
    );
  }

  const { date, time } = formatDateTime(new Date(booking.scheduledAt));
  const created = formatDateTime(new Date(booking.createdAt));
  const modeLabel = booking.mode === 'onsite' ? 'På plats' : 'På distans';

  return (
    <main className='min-h-screen p-6 text-inter-sans-serif'>
      <section className='max-w-2xl mx-auto'>
        <h1 className='text-quicksand-sans-serif text-2xl sm:text-3xl font-semibold'>
          Tack för din beställning, {booking.firstName} {booking.lastName}
        </h1>
        <p className='mt-2 text-gray-600'>Din bokning är mottagen. ID: {id}</p>

        <div className='mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4'>
          <div className='border border-[#2e7d32] rounded-md p-3'>
            <p className='font-medium'>Datum</p>
            <p>{date}</p>
          </div>
          <div className='border border-[#2e7d32] rounded-md p-3'>
            <p className='font-medium'>Tid</p>
            <p>{time}</p>
          </div>
          <div className='border border-[#2e7d32] rounded-md p-3'>
            <p className='font-medium'>Läge</p>
            <p>{modeLabel}</p>
          </div>
          <div className='border border-[#2e7d32] rounded-md p-3'>
            <p className='font-medium'>Status</p>
            <p>{booking.status}</p>
          </div>
        </div>

        {/* Vad och när (mellan Läge och Namn) */}
        <div className='mt-4 border border-[#2e7d32] rounded-md p-3'>
          <p className='font-medium'>Vad</p>
          <p>{modeLabel}</p>
          <p className='font-medium mt-2'>När</p>
          <p className='text-sm text-gray-600'>
            {date} kl {time}
          </p>
        </div>

        {/* Namn med adress, telefon och e-post under */}
        <div className='mt-6 border border-[#2e7d32] rounded-md p-3'>
          <p className='font-medium'>Namn</p>
          <p>
            {booking.firstName} {booking.lastName}
          </p>
          <div className='mt-2'>
            <p className='font-medium'>Adress</p>
            <p>
              {[
                booking.address?.street,
                booking.address?.postalCode,
                booking.address?.city,
              ]
                .filter(Boolean)
                .join(' ')}
            </p>
          </div>
          <div className='mt-2'>
            <p className='font-medium'>Kontakt</p>
            <p>{booking.phone || '—'}</p>
            <p>{booking.email || '—'}</p>
          </div>
        </div>

        {/* Stäng-knapp och skapad-tid */}
        <div className='mt-6 flex items-center justify-between'>
          <Link
            href='/'
            className='login-button font-medium'>
            Till startsidan
          </Link>
          <p className='text-sm text-gray-600'>
            Skapad: {created.date} kl {created.time}
          </p>
        </div>
      </section>
    </main>
  );
}
