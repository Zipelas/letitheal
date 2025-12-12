import Image from 'next/image';
import Link from 'next/link';
import Button from './Button';

const Header = () => {
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
        <ul>
          <Link
            href='/#onSite'
            className='text-inter-sans-serif p-1 sm:p-4'>
            På plats
          </Link>
          <Link
            href='/#online'
            className='text-inter-sans-serif p-1 sm:p-4'>
            Online
          </Link>
          <Link
            href='/booking'
            className='text-inter-sans-serif p-1 sm:p-4'>
            Boka
          </Link>
          <Button className='login-button text-inter-sans-serif'>
            Logga in
          </Button>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
