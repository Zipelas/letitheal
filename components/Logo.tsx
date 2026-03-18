import Image from 'next/image';
import Link from 'next/link';

export default function Logo() {
	return (
		<div className='flex items-center gap-0'>
			<Link
				href='/'
				className='flex items-center gap-1'
				aria-label='Let it Heal startsida'>
				<Image
					src='/images/logo.png'
					alt='Let it Heal Logo'
					width={28}
					height={28}
					className='block'
				/>
				<span className='text-tangerine-calligraphy font-bold text-xl sm:text-3xl'>
					Let it Heal
				</span>
			</Link>
		</div>
	);
}
