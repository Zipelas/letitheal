import { getSession } from '@/lib/auth';
import type { Session } from 'next-auth';
import DesktopNav from './DesktopNav';
import Logo from './Logo';
import MobileNav from './MobileNav';

const Header = async () => {
  let session: Session | null = null;
  try {
    session = await getSession();
  } catch {
    session = null;
  }
  return (
    <header className='site-header flex flex-row items-center justify-between px-4 shadow-sm'>
      <Logo />
      <DesktopNav isAuthed={!!session} />
      <MobileNav isAuthed={!!session} />
    </header>
  );
};

export default Header;
