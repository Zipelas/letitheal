'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const res = await signIn('credentials', {
      email,
      password,
      redirect: true,
      callbackUrl: '/',
    });
    if (!res?.ok) setError('Felaktig e-post eller lösenord.');
  };

  const [showRegister, setShowRegister] = useState(false);

  const onRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Registreringen misslyckades');
        return;
      }
      setError(null);
      setShowRegister(false);
    } catch (err) {
      setError('Serverfel vid registrering');
    }
  };

  return (
    <div className='fixed inset-0 z-30 flex items-center justify-center backdrop-blur-sm bg-black/20 overflow-y-auto'>
      <section className='border-2 border-[#2e7d32] rounded-xl max-w-md w-full mx-auto p-6 bg-[var(--background)] shadow-lg my-8'>
        <h1 className='!text-2xl sm:!text-3xl font-semibold mb-4'>Logga in</h1>
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
            className='login-button font-medium'>
            Logga in
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
            <h2 className='text-xl font-semibold mb-3'>Skapa konto</h2>
            <form onSubmit={onRegister} className='flex flex-col gap-3'>
              <label className='flex flex-col'>
                <span className='mb-1'>Förnamn</span>
                <input name='firstName' className='border border-[#2e7d32] rounded-md p-2' />
              </label>
              <label className='flex flex-col'>
                <span className='mb-1'>Efternamn</span>
                <input name='lastName' className='border border-[#2e7d32] rounded-md p-2' />
              </label>
              <label className='flex flex-col'>
                <span className='mb-1'>E-post</span>
                <input name='email' type='email' required className='border border-[#2e7d32] rounded-md p-2' />
              </label>
              <label className='flex flex-col'>
                <span className='mb-1'>Lösenord</span>
                <input name='password' type='password' required className='border border-[#2e7d32] rounded-md p-2' />
              </label>
              <label className='inline-flex items-center gap-2'>
                <input name='termsAccepted' type='checkbox' className='accent-[#2e7d32]' />
                <span>Jag godkänner villkoren</span>
              </label>
              <div className='flex gap-3'>
                <button type='submit' className='login-button font-medium'>Registrera</button>
                <button type='button' className='font-medium underline' onClick={() => setShowRegister(false)}>Avbryt</button>
              </div>
            </form>
          </div>
        )}
      </section>
    </div>
  );
}
