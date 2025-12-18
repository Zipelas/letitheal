'use client';

import { useRouter } from 'next/navigation';

export default function BookingsPage() {
  const router = useRouter();
  return (
    <div className='fixed inset-0 z-30 flex items-start justify-center backdrop-blur-sm bg-black/20 overflow-y-auto p-4'>
      <section className='relative border-2 border-[#2e7d32] rounded-xl w-full sm:max-w-md lg:w-[70vw] lg:max-w-none mx-auto p-6 text-inter-sans-serif bg-(--background) shadow-lg my-8 max-h-[90vh] overflow-y-auto'>
        <div className='sticky top-0 z-10 -mt-2 -mr-2 mb-2 flex justify-end bg-transparent'>
          <button
            aria-label='Stäng'
            title='Stäng'
            onClick={() => router.back()}
            className='h-8 w-8 rounded-full bg-[#BB1716] text-white flex items-center justify-center leading-none hover:bg-[#980e0e] focus:outline-none focus:ring-2 focus:ring-red-500'>
            ×
          </button>
        </div>
        <h1 className='text-quicksand-sans-serif text-2xl sm:text-3xl font-semibold mb-4'>
          Boka tid
        </h1>
        <form className='flex flex-col gap-3'>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
            <label className='flex flex-col'>
              <span className='mb-1'>Förnamn</span>
              <input
                name='firstName'
                className='border border-[#2e7d32] rounded-md p-2'
                placeholder='Peter'
              />
            </label>
            <label className='flex flex-col'>
              <span className='mb-1'>Efternamn</span>
              <input
                name='lastName'
                className='border border-[#2e7d32] rounded-md p-2'
                placeholder='Andersson'
              />
            </label>
          </div>
          <label className='flex flex-col'>
            <span className='mb-1'>Gatuadress</span>
            <input
              name='street'
              className='border border-[#2e7d32] rounded-md p-2'
              placeholder='Vasagatan 7'
            />
          </label>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
            <label className='flex flex-col'>
              <span className='mb-1'>Postnummer</span>
              <input
                name='postalCode'
                className='border border-[#2e7d32] rounded-md p-2'
                placeholder='131 98'
              />
            </label>
            <label className='flex flex-col'>
              <span className='mb-1'>Stad</span>
              <input
                name='city'
                className='border border-[#2e7d32] rounded-md p-2'
                placeholder='Stockholm'
              />
            </label>
          </div>
          <button
            type='submit'
            className='login-button font-medium w-fit self-start'>
            Fortsätt
          </button>
        </form>
      </section>
    </div>
  );
}
