import Image from 'next/image';
import Link from 'next/link';

const Header = () => {
  return (
    <header className='flex flex-row items-center justify-between p-4 shadow-sm'>
      <div className='flex items-center gap-1'>
        <Link href='/'>
          <Image
            src='/logo.png'
            alt='Let it Heal Logo'
            width={32}
            height={32}
          />
        </Link>
        <Link
          href='/'
          className='text-tangerine-calligraphy font-bold text-2xl sm:text-3xl'>
          Let it Heal
        </Link>
      </div>
      <nav>
        <ul>
          <Link
            href='/#onSite'
            className='text-inter-sans-serif p-4'>
            På plats
          </Link>
          <Link
            href='/#online'
            className='text-inter-sans-serif p-4'>
            Online
          </Link>
          <Link
            href='/booking'
            className='text-inter-sans-serif p-4'>
            Boka
          </Link>
          <Link
            href='/reviews'
            className='text-inter-sans-serif p-4'>
            Recensioner
          </Link>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
