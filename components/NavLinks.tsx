'use client';

import Link from 'next/link';
import AuthButton from './AuthButton';

type NavLinksProps = {
  isAuthed: boolean;
  layout: 'desktop' | 'mobile';
  onLinkClick?: () => void;
};

export default function NavLinks({
  isAuthed,
  layout,
  onLinkClick,
}: NavLinksProps) {
  const isDesktop = layout === 'desktop';
  const linkClassName = isDesktop
    ? 'text-inter-sans-serif font-medium px-3 py-1 text-base whitespace-nowrap hover:border-[#2e7d32] hover:border-2 rounded-lg transition'
    : 'block rounded-md px-3 py-2 text-inter-sans-serif font-medium hover:bg-[#2e7d32]/5';
  const authContainerClassName = isDesktop ? '' : 'pt-2';
  const authButtonClassName = isDesktop
    ? 'text-base px-4 py-1 whitespace-nowrap cursor-pointer'
    : 'w-full text-sm px-4 py-2 whitespace-nowrap cursor-pointer';

  return (
    <>
      <li>
        <Link
          href='/#onSite'
          className={linkClassName}
          onClick={onLinkClick}>
          På plats
        </Link>
      </li>
      <li>
        <Link
          href='/#online'
          className={linkClassName}
          onClick={onLinkClick}>
          Online
        </Link>
      </li>
      {isAuthed && (
        <li>
          <Link
            href='/bookings'
            className={linkClassName}
            onClick={onLinkClick}>
            Boka
          </Link>
        </li>
      )}
      {isAuthed && (
        <li>
          <Link
            href='/bookings/mine'
            className={linkClassName}
            onClick={onLinkClick}>
            Mina bokningar
          </Link>
        </li>
      )}
      <li className={authContainerClassName}>
        <AuthButton className={authButtonClassName} />
      </li>
    </>
  );
}
