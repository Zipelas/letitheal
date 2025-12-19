'use client';

import DatePicker from '@/components/DatePicker';
import TimePicker from '@/components/TimePicker';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { z } from 'zod';

const BookingSchema = z.object({
  scheduledDate: z.string().min(1, 'Datum är obligatoriskt'),
  scheduledTime: z.string().min(1, 'Tid är obligatoriskt'),
  firstName: z.string().trim().min(1, 'Förnamn är obligatoriskt'),
  lastName: z.string().trim().min(1, 'Efternamn är obligatoriskt'),
  street: z.string().trim().min(1, 'Gatuadress är obligatoriskt'),
  postalCode: z.string().trim().min(1, 'Postnummer är obligatoriskt'),
  city: z.string().trim().min(1, 'Stad är obligatoriskt'),
  phone: z
    .string()
    .trim()
    .min(1, 'Telefon är obligatoriskt')
    .superRefine((val, ctx) => {
      const digits = val.replace(/\D/g, '');
      if (digits.length < 7) {
        ctx.addIssue({
          code: 'custom',
          message: 'Telefonnumret måste innehålla minst 7 siffror',
        });
      }
      if (digits.length > 12) {
        ctx.addIssue({
          code: 'custom',
          message: 'Telefonnumret får innehålla högst 12 siffror',
        });
      }
      if (!/^\+?[\d\s\-()]+$/.test(val)) {
        ctx.addIssue({
          code: 'custom',
          message: 'Ogiltigt telefonnummerformat',
        });
      }
      if (val.includes('+') && !val.startsWith('+')) {
        ctx.addIssue({
          code: 'custom',
          message: 'Plustecken får bara stå först i numret',
        });
      }
    }),
  email: z.string().trim().toLowerCase().email('Ogiltig e-postadress'),
});

export default function BookingsPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [scheduledDate, setScheduledDate] = useState<Date | null>(null);
  const [scheduledTime, setScheduledTime] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const form = e.currentTarget;
    const formData = new FormData(form);
    // Inject selected date into payload as ISO string (date only)
    if (scheduledDate) {
      formData.set('scheduledDate', scheduledDate.toISOString());
    }
    if (scheduledTime) {
      formData.set('scheduledTime', scheduledTime);
    }
    const payload = Object.fromEntries(formData.entries()) as Record<
      string,
      string
    >;
    const parsed = BookingSchema.safeParse(payload);
    if (!parsed.success) {
      const firstErr = parsed.error.errors[0]?.message || 'Ogiltig data';
      setError(firstErr);
      return;
    }
    // TODO: Submit to bookings API endpoint when ready
    // For now, just close modal or keep user on page
    // console.log('Booking payload', parsed.data);
  };
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
        <form
          onSubmit={onSubmit}
          className='flex flex-col gap-3'>
          {/* Date + Time row */}
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
            <label className='flex flex-col'>
              <span className='mb-1'>Datum</span>
              <DatePicker
                value={scheduledDate}
                onChange={setScheduledDate}
              />
              <input
                type='hidden'
                name='scheduledDate'
                value={scheduledDate ? scheduledDate.toISOString() : ''}
              />
            </label>
            <label className='flex flex-col'>
              <span className='mb-1'>Välj tid</span>
              <TimePicker
                value={scheduledTime}
                onChange={setScheduledTime}
                disabled={!scheduledDate}
              />
              <input
                type='hidden'
                name='scheduledTime'
                value={scheduledTime ?? ''}
              />
            </label>
          </div>
          {/* Mode selection: Onsite + Remote under date/time */}
          <div
            className='flex items-center gap-6 mt-2'
            role='radiogroup'
            aria-label='Bokningsläge'>
            <label className='inline-flex items-center gap-2 cursor-pointer select-none'>
              <input
                type='radio'
                name='mode'
                value='onsite'
                required
                className='h-5 w-5 accent-[#2e7d32] border-2 border-[#2e7d32] rounded-sm'
              />
              <span>På plats</span>
            </label>
            <label className='inline-flex items-center gap-2 cursor-pointer select-none'>
              <input
                type='radio'
                name='mode'
                value='online'
                className='h-5 w-5 accent-[#2e7d32] border-2 border-[#2e7d32] rounded-sm'
              />
              <span>På distans</span>
            </label>
          </div>
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
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
            <label className='flex flex-col'>
              <span className='mb-1'>Telefon</span>
              <input
                name='phone'
                type='tel'
                className='border border-[#2e7d32] rounded-md p-2'
                placeholder='031-12 34 56'
              />
            </label>
            <label className='flex flex-col'>
              <span className='mb-1'>E-post</span>
              <input
                name='email'
                type='email'
                className='border border-[#2e7d32] rounded-md p-2'
                placeholder='exempel@gmail.com'
              />
            </label>
          </div>
          {error && <p className='text-red-600'>{error}</p>}
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
