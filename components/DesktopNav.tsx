import NavLinks from './NavLinks';

type DesktopNavProps = {
  isAuthed: boolean;
};

export default function DesktopNav({ isAuthed }: DesktopNavProps) {
  return (
    <nav
      className='hidden lg:block'
      aria-label='Huvudmeny'>
      <ul className='flex items-center gap-3 whitespace-nowrap'>
        <NavLinks
          isAuthed={isAuthed}
          layout='desktop'
        />
      </ul>
    </nav>
  );
}
