'use client';

import { useEffect, useState } from 'react';
import NavLinks from './NavLinks';

type MobileNavProps = {
	isAuthed: boolean;
};

export default function MobileNav({ isAuthed }: MobileNavProps) {
	const [menuOpen, setMenuOpen] = useState(false);

	useEffect(() => {
		if (!menuOpen) {
			return;
		}

		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				setMenuOpen(false);
			}
		};

		window.addEventListener('keydown', onKeyDown);
		return () => window.removeEventListener('keydown', onKeyDown);
	}, [menuOpen]);

	const closeMenu = () => setMenuOpen(false);

	return (
		<>
			<button
				type='button'
				className='inline-flex lg:hidden items-center justify-center rounded-md p-2 text-color hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e7d32]'
				aria-label='Öppna meny'
				aria-expanded={menuOpen}
				aria-controls='mobile-navigation'
				onClick={() => setMenuOpen((prev) => !prev)}>
				<span className='sr-only'>Meny</span>
				<span className='relative block h-5 w-6'>
					<span
						className={`absolute left-0 top-0 block h-0.5 w-6 bg-current transition ${menuOpen ? 'translate-y-2 rotate-45' : ''}`}
					/>
					<span
						className={`absolute left-0 top-2 block h-0.5 w-6 bg-current transition ${menuOpen ? 'opacity-0' : ''}`}
					/>
					<span
						className={`absolute left-0 top-4 block h-0.5 w-6 bg-current transition ${menuOpen ? '-translate-y-2 -rotate-45' : ''}`}
					/>
				</span>
			</button>

			{menuOpen && (
				<button
					type='button'
					className='fixed inset-0 z-40 bg-black/30 lg:hidden'
					aria-label='Stäng meny'
					onClick={closeMenu}
				/>
			)}

			<nav
				id='mobile-navigation'
				className={`fixed right-0 top-16 sm:top-[72px] z-50 w-full max-w-xs border-l border-black/10 rounded-l-4xl bg-[#f0fff0] shadow-lg transition-transform duration-200 lg:hidden ${
					menuOpen ? 'translate-x-0' : 'translate-x-full'
				}`}
				aria-label='Mobil meny'>
				<ul className='flex flex-col gap-1 p-4'>
					<NavLinks
						isAuthed={isAuthed}
						layout='mobile'
						onLinkClick={closeMenu}
					/>
				</ul>
			</nav>
		</>
	);
}
