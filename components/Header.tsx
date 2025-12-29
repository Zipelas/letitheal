import { getSession } from '@/lib/auth';
import type { Session } from 'next-auth';
import Image from 'next/image';
import Link from 'next/link';
import AuthButton from './AuthButton';

const Header = async () => {
  let session: Session | null = null;
  try {
    session = await getSession();
  } catch {
    session = null;
  }
  return (
    <header className='site-header flex flex-row items-center justify-between px-4 shadow-sm'>
      <div className='flex items-center gap-1'>
        <Link
          href='/'
          className='flex items-center gap-2'
          aria-label='Let it Heal startsida'>
          <Image
            src='/images/logo.png'
            alt='Let it Heal Logo'
            width={32}
            height={32}
          />
          <span className='text-tangerine-calligraphy font-bold text-2xl sm:text-3xl hidden sm:block'>
            Let it Heal
          </span>
        </Link>
      </div>
      <nav>
        <ul className='flex items-center gap-3'>
          <Link
            href='/#onSite'
            className='text-inter-sans-serif font-medium p-1 sm:p-4 text-sm sm:text-base'>
            På plats
          </Link>
          <Link
            href='/#online'
            className='text-inter-sans-serif font-medium p-1 sm:p-4 text-sm sm:text-base'>
            Online
          </Link>
          {session && (
            <Link
              href='/bookings'
              className='text-inter-sans-serif font-medium p-1 sm:p-4 text-sm sm:text-base'>
              Boka
            </Link>
          )}
          {session && (
            <Link
              href='/bookings/mine'
              className='text-inter-sans-serif font-medium p-1 sm:p-4 text-sm sm:text-base'>
              Mina bokningar
            </Link>
          )}
          <AuthButton className='text-sm sm:text-base' />
        </ul>
      </nav>
    </header>
  );
};

export default Header;
