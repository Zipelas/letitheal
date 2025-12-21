'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Optional: log error for debugging
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.error('Booking detail error:', error);
    }
  }, [error]);

  return (
    <main className='min-h-screen p-6 text-inter-sans-serif'>
      <section className='max-w-2xl mx-auto'>
        <h1 className='text-quicksand-sans-serif text-2xl sm:text-3xl font-semibold'>
          Något gick fel
        </h1>
        <p className='mt-2 text-gray-600'>
          Vi kunde inte ladda bokningen just nu.
        </p>
        <div className='mt-4 flex gap-3'>
          <button
            onClick={() => reset()}
            className='login-button font-medium'>
            Försök igen
          </button>
          <a
            href='/'
            className='underline'>
            Gå till startsidan
          </a>
        </div>
      </section>
    </main>
  );
}
