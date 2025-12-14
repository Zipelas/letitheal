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

  return (
    <main className='max-w-md mx-auto p-4'>
      <h1 className='text-2xl font-semibold mb-4'>Logga in</h1>
      <form
        onSubmit={onSubmit}
        className='flex flex-col gap-3'>
        <label className='flex flex-col'>
          <span className='mb-1'>E-post</span>
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='border rounded p-2'
            required
          />
        </label>
        <label className='flex flex-col'>
          <span className='mb-1'>Lösenord</span>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='border rounded p-2'
            required
          />
        </label>
        {error && <p className='text-red-600'>{error}</p>}
        <button
          type='submit'
          className='login-button font-medium'>
          Logga in
        </button>
      </form>
    </main>
  );
}
