import Image from 'next/image';
import Link from 'next/link';

const Header = () => {
  return (
    <header className='flex flex-row items-center justify-between px-4 shadow-sm'>
      <div className='flex items-center gap-1'>
        <Link
          href='/'
          className='flex items-center gap-2'
          aria-label='Let it Heal startsida'>
          <Image
            src='/logo.png'
            alt='Let it Heal Logo'
            width={32}
            height={32}
          />
          <span className='text-tangerine-calligraphy font-bold text-2xl sm:text-3xl'>
            Let it Heal
          </span>
        </Link>
      </div>
      <nav>
        <ul>
          <Link
            href='/#onSite'
            className='text-inter-sans-serif p-2 sm:p-4'>
            På plats
          </Link>
          <Link
            href='/#online'
            className='text-inter-sans-serif p-2 sm:p-4'>
            Online
          </Link>
          <Link
            href='/booking'
            className='text-inter-sans-serif p-2 sm:p-4'>
            Boka
          </Link>
          <Link
            href='/reviews'
            className='text-inter-sans-serif p-2 sm:p-4'>
            Recensioner
          </Link>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
