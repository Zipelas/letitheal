import DeleteBookingButton from '@/components/DeleteBookingButton';
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
  // Bokningslistan visas på sidan /bookings/mine
  // const allBookings = booking.user
  //   ? await Booking.find({ user: booking.user })
  //       .sort({ createdAt: -1 })
  //       .lean<BookingListItem[]>()
  //   : await Booking.find({
  //       $or: [
  //         ...(booking.email ? [{ email: booking.email }] : []),
  //         ...(booking.phone ? [{ phone: booking.phone }] : []),
  //       ],
  //     })
  //       .sort({ createdAt: -1 })
  //       .lean<BookingListItem[]>();

  return (
    <main className='min-h-screen p-6 text-inter-sans-serif'>
      <section className='max-w-2xl mx-auto'>
        <h1 className='text-quicksand-sans-serif text-2xl sm:text-3xl font-semibold'>
          Tack för din beställning, {booking.firstName} {booking.lastName}
        </h1>
        <p className='mt-2 text-gray-600'>Din bokning är mottagen. ID: {id}</p>

        <div className='mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4'>
          <div className='border border-[#2e7d32] rounded-md p-3'>
            <h3 className='font-medium text-[1.25rem] sm:text-[1.5rem]'>
              Datum
            </h3>
            <p>{date}</p>
          </div>
          <div className='border border-[#2e7d32] rounded-md p-3'>
            <h3 className='font-medium text-[1.25rem] sm:text-[1.5rem]'>Tid</h3>
            <p>{time}</p>
          </div>
          <div className='border border-[#2e7d32] rounded-md p-3'>
            <h3 className='font-medium text-[1.25rem] sm:text-[1.5rem]'>
              Läge
            </h3>
            <p>{modeLabel}</p>
          </div>
          <div className='border border-[#2e7d32] rounded-md p-3'>
            <h3 className='font-medium text-[1.25rem] sm:text-[1.5rem]'>
              Status
            </h3>
            <p>{booking.status}</p>
          </div>
        </div>

        {/* Typ av healing + Skapad (samma bredd som Läge) */}
        <div className='mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4'>
          <div className='border border-[#2e7d32] rounded-md p-3'>
            <h3 className='font-medium text-[1.25rem] sm:text-[1.5rem]'>
              Typ av healing
            </h3>
            <p>{modeLabel}</p>
            <h3 className='font-medium text-[1.25rem] sm:text-[1.5rem] mt-2'>
              När
            </h3>
            <p className='text-sm text-gray-600'>
              {date} kl {time}
            </p>
          </div>
          <div className='border border-[#2e7d32] rounded-md p-3'>
            <h3 className='font-medium text-[1.25rem] sm:text-[1.5rem]'>
              Skapad
            </h3>
            <p className='text-sm text-gray-600'>
              {created.date} kl {created.time}
            </p>
          </div>
        </div>

        {/* Namn med adress, telefon och e-post under */}
        <div className='mt-6 border border-[#2e7d32] rounded-md p-3'>
          <h3 className='font-medium text-[1.25rem] sm:text-[1.5rem]'>Namn</h3>
          <p>
            {booking.firstName} {booking.lastName}
          </p>
          <div className='mt-2'>
            <h3 className='font-medium text-[1.25rem] sm:text-[1.5rem]'>
              Adress
            </h3>
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
            <h3 className='font-medium text-[1.25rem] sm:text-[1.5rem]'>
              Kontakt
            </h3>
            <p>{booking.phone || '—'}</p>
            <p>{booking.email || '—'}</p>
          </div>
        </div>

        {/* Åtgärder */}
        <div className='mt-6 flex items-center justify-between'>
          <Link
            href='/'
            className='login-button font-medium'>
            Till startsidan
          </Link>
          <DeleteBookingButton id={booking._id?.toString?.() ?? id} />
        </div>

        {/* Bokningslistan flyttad till /bookings/mine */}
      </section>
    </main>
  );
}
