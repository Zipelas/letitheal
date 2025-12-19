'use client';

import { useMemo, useState } from 'react';

type Props = {
  value?: Date | null;
  onChange: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  className?: string;
};

const svWeekdays = ['M', 'T', 'O', 'T', 'F', 'L', 'S'];
const svMonths = [
  'januari',
  'februari',
  'mars',
  'april',
  'maj',
  'juni',
  'juli',
  'augusti',
  'september',
  'oktober',
  'november',
  'december',
];

function startOfDay(d: Date) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

function inRange(d: Date, min?: Date, max?: Date) {
  const time = d.getTime();
  if (min && time < startOfDay(min).getTime()) return false;
  if (max && time > startOfDay(max).getTime()) return false;
  return true;
}

export default function DatePicker({
  value = null,
  onChange,
  minDate,
  maxDate,
  className,
}: Props) {
  const initial = value ?? new Date();
  const [viewYear, setViewYear] = useState<number>(initial.getFullYear());
  const [viewMonth, setViewMonth] = useState<number>(initial.getMonth());

  const today = useMemo(() => startOfDay(new Date()), []);
  const selected = value ? startOfDay(value) : null;

  function prevMonth() {
    const m = viewMonth - 1;
    if (m < 0) {
      setViewMonth(0);
      setViewYear((y) => y - 1);
    } else setViewMonth(m);
  }

  function nextMonth() {
    const m = viewMonth + 1;
    if (m > 11) {
      setViewMonth(11);
      setViewYear((y) => y + 1);
    } else setViewMonth(m);
  }

  const grid = useMemo(() => {
    const first = new Date(viewYear, viewMonth, 1);
    const firstWeekday = (first.getDay() + 6) % 7; // 0 = Monday
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const cells: { date: Date; inMonth: boolean; disabled: boolean }[] = [];

    // Fill leading days from previous month
    for (let i = 0; i < firstWeekday; i++) {
      const d = new Date(viewYear, viewMonth, -(firstWeekday - 1 - i));
      cells.push({
        date: d,
        inMonth: false,
        disabled: !inRange(d, minDate, maxDate),
      });
    }
    // Current month
    for (let day = 1; day <= daysInMonth; day++) {
      const d = new Date(viewYear, viewMonth, day);
      cells.push({
        date: d,
        inMonth: true,
        disabled: !inRange(d, minDate, maxDate),
      });
    }
    // Trailing to fill to 42 cells (6 weeks)
    while (cells.length % 7 !== 0) {
      const last = cells[cells.length - 1].date;
      const d = new Date(
        last.getFullYear(),
        last.getMonth(),
        last.getDate() + 1
      );
      cells.push({
        date: d,
        inMonth: false,
        disabled: !inRange(d, minDate, maxDate),
      });
    }
    while (cells.length < 42) {
      const last = cells[cells.length - 1].date;
      const d = new Date(
        last.getFullYear(),
        last.getMonth(),
        last.getDate() + 1
      );
      cells.push({
        date: d,
        inMonth: false,
        disabled: !inRange(d, minDate, maxDate),
      });
    }
    return cells;
  }, [viewYear, viewMonth, minDate, maxDate]);

  function isSameDay(a: Date, b: Date) {
    return (
      a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate()
    );
  }

  return (
    <div className={['w-full', className].filter(Boolean).join(' ')}>
      <div className='flex items-center justify-between mb-2'>
        <button
          type='button'
          onClick={prevMonth}
          className='px-2 py-1 border border-[#2e7d32] rounded-md text-sm hover:bg-(--muted)'
          aria-label='Föregående månad'>
          ‹
        </button>
        <div className='text-quicksand-sans-serif font-semibold'>
          {svMonths[viewMonth]} {viewYear}
        </div>
        <button
          type='button'
          onClick={nextMonth}
          className='px-2 py-1 border border-[#2e7d32] rounded-md text-sm hover:bg-(--muted)'
          aria-label='Nästa månad'>
          ›
        </button>
      </div>

      <div className='grid grid-cols-7 gap-1 text-center text-xs text-gray-600 mb-1'>
        {svWeekdays.map((d) => (
          <div
            key={d}
            className='py-1'>
            {d}
          </div>
        ))}
      </div>
      <div className='grid grid-cols-7 gap-1'>
        {grid.map(({ date, inMonth, disabled }, idx) => {
          const isToday = isSameDay(today, date);
          const isSelected = selected ? isSameDay(selected, date) : false;
          const base =
            'h-9 rounded-md flex items-center justify-center select-none';
          const styles = [
            'border',
            'text-sm',
            inMonth ? 'bg-(--background)' : 'bg-gray-50 text-gray-400',
            disabled
              ? 'opacity-40 cursor-not-allowed'
              : 'cursor-pointer hover:bg-(--muted)',
            isSelected
              ? 'border-[#2e7d32] ring-2 ring-[#2e7d32]/30'
              : 'border-gray-200',
            isToday && !isSelected ? 'ring-1 ring-[#2e7d32]/40' : '',
          ].join(' ');
          return (
            <button
              type='button'
              key={idx}
              className={`${base} ${styles}`}
              disabled={disabled}
              onClick={() => onChange(startOfDay(date))}
              aria-pressed={isSelected}>
              {date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}
