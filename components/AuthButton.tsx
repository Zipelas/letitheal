'use client';

import { signIn, signOut, useSession } from 'next-auth/react';

type Props = { className?: string };

export default function AuthButton({ className = '' }: Props) {
  const { data: session, status } = useSession();
  const isAuthed = !!session;

  if (status === 'loading') {
    return (
      <button
        className={`text-inter-sans-serif ${className}`}
        disabled>
        ...
      </button>
    );
  }

  return isAuthed ? (
    <button
      type='button'
      className={`logout-button text-inter-sans-serif font-medium ${className}`}
      onClick={() => signOut({ callbackUrl: '/' })}>
      Logga ut
    </button>
  ) : (
    <button
      type='button'
      className={`login-button text-inter-sans-serif font-medium ${className}`}
      onClick={() => signIn()}>
      Logga in
    </button>
  );
}
