'use client';

interface PasswordVisibilityProps {
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
}

export default function PasswordVisibility({
  showPassword,
  setShowPassword,
}: PasswordVisibilityProps) {
  return (
    <button
      type='button'
      onClick={() => setShowPassword(!showPassword)}
      aria-label={showPassword ? 'Dölj lösenord' : 'Visa lösenord'}
      aria-pressed={showPassword}
      className='absolute right-2 top-1/2 -translate-y-1/2 p-1 text-[#111827] transition-colors hover:text-black cursor-pointer'>
      {showPassword ? (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='20'
          height='20'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='3'
          strokeLinecap='round'
          strokeLinejoin='round'
          aria-hidden>
          <path d='M1.5 12C3.1 9.2 7 5 12 5s8.9 4.2 10.5 7c-1.6 2.8-5.5 7-10.5 7S3.1 14.8 1.5 12z' />
          <circle
            cx='12'
            cy='12'
            r='3'
          />
          <line
            x1='2'
            y1='2'
            x2='22'
            y2='22'
            stroke='currentColor'
            strokeWidth='3'
            strokeLinecap='round'
          />
        </svg>
      ) : (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='20'
          height='20'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='3'
          strokeLinecap='round'
          strokeLinejoin='round'
          aria-hidden>
          <path d='M1.5 12C3.1 9.2 7 5 12 5s8.9 4.2 10.5 7c-1.6 2.8-5.5 7-10.5 7S3.1 14.8 1.5 12z' />
          <circle
            cx='12'
            cy='12'
            r='3'
          />
        </svg>
      )}
    </button>
  );
}