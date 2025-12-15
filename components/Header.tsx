import { getSession } from '@/lib/auth';
import Image from 'next/image';
import Link from 'next/link';
import AuthButton from './AuthButton';

const Header = async () => {
  let session: { user?: { name?: string; email?: string } } | null = null;
  try {
    session = await getSession();
  } catch {
    // If JWT decryption fails (e.g., secret changed), treat as signed-out
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
        <ul className='flex items-center gap-4'>
          <Link
            href='/#onSite'
            className='text-inter-sans-serif font-medium p-1 sm:p-4'>
            På plats
          </Link>
          <Link
            href='/#online'
            className='text-inter-sans-serif font-medium p-1 sm:p-4'>
            Online
          </Link>
          {session && (
            <Link
              href='/booking'
              className='text-inter-sans-serif font-medium p-1 sm:p-4'>
              Boka
            </Link>
          )}
          <AuthButton />
        </ul>
      </nav>
    </header>
  );
};

export default Header;
