import { getSession } from '@/lib/auth';
import { dbConnect } from '@/lib/mongoose';
import Booking from '@/models/Booking';
import User from '@/models/User';
import Link from 'next/link';

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

export default async function MyBookingsPage() {
  const session = await getSession();
  if (!session?.user?.email) {
    return (
      <main className='min-h-screen p-6 text-inter-sans-serif'>
        <section className='max-w-2xl mx-auto'>
          <h1 className='text-quicksand-sans-serif text-2xl sm:text-3xl font-semibold'>
            Du måste vara inloggad
          </h1>
          <p className='mt-2 text-gray-600'>
            Logga in för att se dina bokningar.
          </p>
          <div className='mt-4'>
            <Link
              href='/login'
              className='login-button font-medium'>
              Logga in
            </Link>
          </div>
        </section>
      </main>
    );
  }

  await dbConnect();
  const user = await User.findOne({ email: session.user.email })
    .select('_id')
    .lean();
  if (!user?._id) {
    return (
      <main className='min-h-screen p-6 text-inter-sans-serif'>
        <section className='max-w-2xl mx-auto'>
          <h1 className='text-quicksand-sans-serif text-2xl sm:text-3xl font-semibold'>
            Inga bokningar hittades
          </h1>
          <p className='mt-2 text-gray-600'>
            Vi kunde inte koppla ditt konto till några bokningar.
          </p>
          <div className='mt-4'>
            <Link
              href='/bookings'
              className='login-button font-medium'>
              Boka tid
            </Link>
          </div>
        </section>
      </main>
    );
  }

  const bookings = await Booking.find({ user: user._id })
    .sort({ createdAt: -1 })
    .lean();

  return (
    <main className='min-h-screen p-6 text-inter-sans-serif'>
      <section className='max-w-2xl mx-auto'>
        <h1 className='text-quicksand-sans-serif text-2xl sm:text-3xl font-semibold'>
          Mina bokningar
        </h1>
        {bookings.length === 0 ? (
          <p className='mt-2 text-gray-600'>Du har inga bokningar ännu.</p>
        ) : (
          <div className='mt-4 space-y-3'>
            {bookings.map((b: any) => {
              const { date, time } = formatDateTime(new Date(b.scheduledAt));
              const created = formatDateTime(new Date(b.createdAt));
              const label = b.mode === 'onsite' ? 'På plats' : 'På distans';
              return (
                <div
                  key={b._id?.toString()}
                  className='border border-[#2e7d32] rounded-md p-3 text-inter-sans-serif text-color text-sm'>
                  <div className='flex items-center justify-between'>
                    <div>
                      <p>
                        Skapad {created.date} kl {created.time}
                      </p>
                      <p>
                        {date} kl {time}
                      </p>
                      <p>
                        {label}
                        {b.status !== 'pending' ? ` • ${b.status}` : ''}
                      </p>
                    </div>
                    <div className='flex items-center gap-2'>
                      <Link
                        href={`/bookings/${b._id?.toString()}`}
                        className='login-button font-medium'>
                        Visa
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
