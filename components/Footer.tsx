import Image from 'next/image';
import Link from 'next/link';
import SocialCard from './SocialCard';

const socials = [
  {
    image: '/icons/socials/facebook.svg',
    title: 'Facebook',
    href: 'https://facebook.com/',
  },
  {
    image: '/icons/socials/instagram.svg',
    title: 'Instagram',
    href: 'https://instagram.com/',
  },
  { image: '/icons/socials/x.svg', title: 'X', href: 'https://x.com/' },
  {
    image: '/icons/socials/youtube.svg',
    title: 'Youtube',
    href: 'https://youtube.com/',
  },
];

const Footer = () => {
  return (
    <footer className='flex justify-between flex-col sm:flex-row m-4'>
      <div className='m-4 sm:m-2'>
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
          <span className='text-tangerine-calligraphy font-bold text-2xl sm:text-3xl'>
            Let it Heal
          </span>
        </Link>
      </div>
      <div className='m-4 sm:m-2'>
        <p>Kontakt:</p>
        <p>Skånegatan 17</p>
        <p>412 52 Göteborg</p>
        <p>031- 12 34 56</p>
        <p>hello@letitheal.se</p>
        <p>letitheal.se</p>
      </div>
      <nav>
        <ul className='socials'>
          {socials.map((icon) => (
            <li key={icon.title}>
              <SocialCard {...icon} />
            </li>
          ))}
        </ul>
        <p>&copy; 2025 Let it Heal</p>
      </nav>
    </footer>
  );
};

export default Footer;
