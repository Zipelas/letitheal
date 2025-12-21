import { dbConnect } from '@/lib/mongoose';
import Booking from '@/models/Booking';
import { notFound } from 'next/navigation';

type PageProps = { params: { id: string } };

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
  const { id } = params;
  await dbConnect();
  const booking = await Booking.findById(id).lean();
  if (!booking) return notFound();

  const { date, time } = formatDateTime(new Date(booking.scheduledAt));
  const modeLabel = booking.mode === 'onsite' ? 'På plats' : 'På distans';

  return (
    <main className='min-h-screen p-6 text-inter-sans-serif'>
      <section className='max-w-2xl mx-auto'>
        <h1 className='text-quicksand-sans-serif text-2xl sm:text-3xl font-semibold'>
          Bokningsdetaljer
        </h1>
        <p className='mt-2 text-gray-600'>ID: {id}</p>

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

        <div className='mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4'>
          <div className='border border-[#2e7d32] rounded-md p-3'>
            <p className='font-medium'>Namn</p>
            <p>
              {booking.firstName} {booking.lastName}
            </p>
          </div>
          <div className='border border-[#2e7d32] rounded-md p-3'>
            <p className='font-medium'>Kontakt</p>
            <p>{booking.email || '—'}</p>
            <p>{booking.phone || '—'}</p>
          </div>
          <div className='border border-[#2e7d32] rounded-md p-3 sm:col-span-2'>
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
        </div>
      </section>
    </main>
  );
}
