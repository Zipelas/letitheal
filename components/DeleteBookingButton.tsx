'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

type Props = {
  id: string;
  className?: string;
};

export default function DeleteBookingButton({ id, className }: Props) {
  const router = useRouter();
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
      // Go back to start page after deletion
      router.push('/');
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type='button'
      onClick={onDelete}
      disabled={loading}
      className={`logout-button font-medium ${className ?? ''}`}>
      {loading ? 'Tar bort…' : 'Ta bort bokning'}
    </button>
  );
}
