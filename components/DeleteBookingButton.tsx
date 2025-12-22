'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

type Props = {
  id: string;
  className?: string;
};

export default function DeleteBookingButton({ id, className }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  async function onDelete() {
    if (loading) return;
    const ok = window.confirm('Är du säker på att du vill ta bort bokningen?');
    if (!ok) return;
    try {
      setLoading(true);
      const res = await fetch(`/api/bookings/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        alert(data?.error || 'Kunde inte ta bort bokningen');
        return;
      }
      // If we're on "Mina bokningar", stay and refresh the list
      if (pathname?.startsWith('/bookings/mine')) {
        router.refresh();
      } else {
        // Otherwise, go back to the start page
        router.push('/');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type='button'
      onClick={onDelete}
      disabled={loading}
      className={`logout-button font-medium px-4 sm:px-6 ${className ?? ''}`}>
      {loading ? (
        'Tar bort…'
      ) : (
        <>
          <span className='sm:hidden'>Ta bort</span>
          <span className='hidden sm:inline'>Ta bort bokning</span>
        </>
      )}
    </button>
  );
}
