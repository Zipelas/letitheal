'use client';

import { useEffect, useRef, useState } from 'react';

type Slot = {
  id: string; // e.g. '09:00-09:45'
  label: string; // e.g. '09.00 - 09.45'
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
    type Props = {
    endMinute: 45,
  },
  {
    id: '10:00-10:45',
    label: '10.00 - 10.45',
    startHour: 10,

    export default function TimePicker({ value, onChange, slots = DEFAULT_SLOTS, disabled, className }: Props) {
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
        <div ref={rootRef} className={["relative", className].filter(Boolean).join(' ')}>
          <button
            type="button"
            aria-haspopup="listbox"
            aria-expanded={open}
            disabled={disabled}
            onClick={() => { if (!disabled) setOpen((v) => !v); }}
            className={[
              'w-full border rounded-md p-2 flex items-center justify-between text-sm',
              disabled ? 'opacity-50 cursor-not-allowed' : 'border-[#2e7d32] hover:bg-(--muted)'
            ].join(' ')}
          >
            <span>{displayText}</span>
            <span aria-hidden>▾</span>
          </button>

          {open && (
            <div
              role="listbox"
              aria-label="Tillgängliga tider"
              className="absolute z-50 mt-2 w-56 max-h-64 overflow-auto rounded-md border border-[#2e7d32] bg-(--background) shadow-lg"
            >
              {slots.map((s) => {
                const isSelected = value === s.id;
                return (
                  <button
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    key={s.id}
                    className={[
                      'w-full text-left px-3 py-2 text-sm',
                      isSelected ? 'bg-(--muted) border-l-2 border-[#2e7d32]' : 'hover:bg-(--muted)'
                    ].join(' ')}
                    onClick={() => { onChange(s.id); setOpen(false); }}
                  >
                    {s.label}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      );
    }
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
  return (
    <div className={className}>
      <div className='grid grid-cols-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2'>
        {slots.map((s) => {
          const isSelected = value === s.id;
          const styles = [
            'text-sm px-2 py-2 border rounded-md text-center',
            disabled
              ? 'opacity-40 cursor-not-allowed'
              : 'hover:bg-(--muted) cursor-pointer',
            isSelected
              ? 'border-[#2e7d32] ring-2 ring-[#2e7d32]/30'
              : 'border-gray-200',
          ].join(' ');
          return (
            <button
              type='button'
              key={s.id}
              className={styles}
              disabled={disabled}
              aria-pressed={isSelected}
              onClick={() => onChange(s.id)}>
              {s.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export type { Slot };
