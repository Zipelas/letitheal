'use client';

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
