'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { z } from 'zod';

const RegisterSchema = z.object({
  email: z.string().trim().toLowerCase().email('Ogiltig e-postadress'),
  password: z.string().min(8, 'Lösenordet måste vara minst 8 tecken'),
  firstName: z.string().trim().optional(),
  lastName: z.string().trim().optional(),
  street: z.string().trim().optional(),
  postalCode: z.string().trim().optional(),
  city: z.string().trim().optional(),
  phone: z
    .string()
    .trim()
    .optional()
    .superRefine((val, ctx) => {
      if (val && val.length > 0) {
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
      }
    }),
  termsAccepted: z.coerce.boolean(),
});

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setError(null);
    setSubmitting(true);
    if (!email.includes('@')) {
      setError('E-post måste innehålla @');
      setSubmitting(false);
      return;
    }
    try {
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false,
        callbackUrl: '/',
      });
      if (!res || res.error) {
        setError('Felaktig e-post eller lösenord.');
        return;
      }
      setError(null);
      const url = (res && 'url' in res && (res as any).url) || '/';
      router.replace(url);
      router.refresh();
    } catch (e) {
      setError('Kunde inte logga in just nu. Försök igen.');
    } finally {
      setSubmitting(false);
    }
  };

  const [showRegister, setShowRegister] = useState(false);

  const onRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());
    const parsed = RegisterSchema.safeParse(payload);
    if (!parsed.success) {
      const firstErr = parsed.error.errors[0]?.message || 'Ogiltig data';
      setError(firstErr);
      return;
    }
    if (!parsed.data.termsAccepted) {
      setError('Du måste godkänna villkoren');
      return;
    }
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed.data),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Registreringen misslyckades');
        return;
      }
      setError(null);
      setShowRegister(false);
    } catch (error) {
      if (process.env.NODE_ENV !== 'production') {
        console.error('Registrering misslyckades:', error);
      }
      setError('Något gick fel. Försök igen.');
    }
  };

  return (
    <div className='fixed inset-0 z-30 flex items-start justify-center backdrop-blur-sm bg-black/20 overflow-y-auto p-4'>
      <section className='relative border-2 border-[#2e7d32] rounded-xl max-w-md w-full mx-auto p-6 text-inter-sans-serif bg-(--background) shadow-lg my-8 max-h-[90vh] overflow-y-auto'>
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
          Logga in
        </h1>
        <form
          onSubmit={onSubmit}
          className='flex flex-col gap-3'>
          <label className='flex flex-col'>
            <span className='mb-1'>E-post</span>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='border border-[#2e7d32] rounded-md p-2'
              required
            />
          </label>
          <label className='flex flex-col'>
            <span className='mb-1'>Lösenord</span>
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='border border-[#2e7d32] rounded-md p-2'
              required
            />
          </label>
          {error && <p className='text-red-600'>{error}</p>}
          <button
            type='submit'
            disabled={submitting}
            className='login-button font-medium disabled:opacity-70 disabled:cursor-not-allowed'>
            {submitting ? 'Loggar in…' : 'Logga in'}
          </button>
          <button
            type='button'
            className='mt-2 underline text-inter-sans-serif'
            onClick={() => setShowRegister(true)}>
            Skapa konto
          </button>
        </form>
        {showRegister && (
          <div className='mt-6 border-t pt-6'>
            <h2 className='text-quicksand-sans-serif text-2xl sm:text-3xl font-semibold mb-3'>
              Skapa konto
            </h2>
            <form
              onSubmit={onRegister}
              className='flex flex-col gap-3'>
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
                  required
                  className='border border-[#2e7d32] rounded-md p-2'
                  placeholder='exempel@gmail.com'
                />
              </label>
              <label className='flex flex-col'>
                <span className='mb-1'>Lösenord</span>
                <input
                  name='password'
                  type='password'
                  required
                  className='border border-[#2e7d32] rounded-md p-2'
                  placeholder='********'
                />
              </label>
              <label className='inline-flex items-center gap-2'>
                <input
                  name='termsAccepted'
                  type='checkbox'
                  className='accent-[#2e7d32]'
                />
                <span>Jag godkänner villkoren</span>
              </label>
              <p className='text-sm text-gray-600 -mt-1'>
                Jag godkänner villkoren och samtycker till att mina
                personuppgifter lagras i en databas och behandlas enligt GDPR.
              </p>
              <div className='flex gap-3'>
                <button
                  type='submit'
                  className='login-button font-medium'>
                  Registrera
                </button>
                <button
                  type='button'
                  className='font-medium underline'
                  onClick={() => setShowRegister(false)}>
                  Avbryt
                </button>
              </div>
            </form>
          </div>
        )}
      </section>
    </div>
  );
}
