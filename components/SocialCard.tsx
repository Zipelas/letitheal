import Image from 'next/image';
import Link from 'next/link';

interface Props {
  image: string;
  title: string;
  href: string;
}

const SocialCard = ({ image, title, href }: Props) => {
  return (
    <Link
      href={href}
      id='social-card'
      aria-label={title}
      className='flex items-center gap-2'>
      <Image
        src={image}
        alt='' // decorative icon; accessible name comes from link
        aria-hidden
        width={32}
        height={32}
      />
      <span>{title}</span>
    </Link>
  );
};

export default SocialCard;
