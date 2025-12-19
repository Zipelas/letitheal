'use client';

import { useEffect, useRef, useState } from 'react';

type Slot = {
  id: string;
  label: string;
  startHour: number;
  startMinute: number;
  endHour: number;
  endMinute: number;
};

const DEFAULT_SLOTS: Slot[] = [
  {
    id: '09:00-09:45',
    label: '09.00 - 09.45',
    startHour: 9,
    startMinute: 0,
    endHour: 9,
    endMinute: 45,
  },
  {
    id: '10:00-10:45',
    label: '10.00 - 10.45',
    startHour: 10,
    startMinute: 0,
    endHour: 10,
    endMinute: 45,
  },
  {
    id: '11:00-11:45',
    label: '11.00 - 11.45',
    startHour: 11,
    startMinute: 0,
    endHour: 11,
    endMinute: 45,
  },
  {
    id: '13:00-13:45',
    label: '13.00 - 13.45',
    startHour: 13,
    startMinute: 0,
    endHour: 13,
    endMinute: 45,
  },
  {
    id: '14:00-14:45',
    label: '14.00 - 14.45',
    startHour: 14,
    startMinute: 0,
    endHour: 14,
    endMinute: 45,
  },
  {
    id: '15:00-15:45',
    label: '15.00 - 15.45',
    startHour: 15,
    startMinute: 0,
    endHour: 15,
    endMinute: 45,
  },
  {
    id: '16:00-16:45',
    label: '16.00 - 16.45',
    startHour: 16,
    startMinute: 0,
    endHour: 16,
    endMinute: 45,
  },
];

type Props = {
  value: string | null;
  onChange: (slotId: string) => void;
  slots?: Slot[];
  disabled?: boolean;
  className?: string;
};

export default function TimePicker({
  value,
  onChange,
  slots = DEFAULT_SLOTS,
  disabled,
  className,
}: Props) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  const selected = slots.find((s) => s.id === value) || null;
  const displayText = selected ? selected.label : 'Välj tid';

  // Close popover on outside click or Escape
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!open) return;
      const root = rootRef.current;
      if (root && !root.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (!open) return;
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDocClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div
      ref={rootRef}
      className={['relative', className].filter(Boolean).join(' ')}>
      <button
        type='button'
        aria-haspopup='listbox'
        aria-expanded={open}
        disabled={disabled}
        onClick={() => {
          if (!disabled) setOpen((v) => !v);
        }}
        className={[
          'w-full border rounded-md p-2 flex items-center justify-between text-sm',
          disabled
            ? 'opacity-50 cursor-not-allowed'
            : 'border-[#2e7d32] hover:bg-(--muted)',
        ].join(' ')}>
        <span>{displayText}</span>
        <span aria-hidden>▾</span>
      </button>

      {open && (
        <div
          role='listbox'
          aria-label='Tillgängliga tider'
          className='absolute z-50 mt-2 w-56 max-h-64 overflow-auto rounded-md border border-[#2e7d32] bg-(--background) shadow-lg'>
          {slots.map((s) => {
            const isSelected = value === s.id;
            return (
              <button
                type='button'
                role='option'
                aria-selected={isSelected}
                key={s.id}
                className={[
                  'w-full text-left px-3 py-2 text-sm rounded-md border transition-colors',
                  isSelected
                    ? 'bg-(--muted) border-[#2e7d32]'
                    : 'border-transparent hover:bg-(--muted) hover:border-[#2e7d32]',
                ].join(' ')}
                onClick={() => {
                  onChange(s.id);
                  setOpen(false);
                }}>
                {s.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export type { Slot };
