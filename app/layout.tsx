import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Providers from '@/components/Providers';
import type { Metadata } from 'next';
import { Inter, Quicksand, Tangerine } from 'next/font/google';
import './globals.css';

const QuicksandSansSerif = Quicksand({
  variable: '--font-quicksand-sans-serif',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

const InterSansSerif = Inter({
  variable: '--font-inter-sans-serif',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

const TangerineCalligraphy = Tangerine({
  variable: '--font-tangerine-calligraphy',
  subsets: ['latin'],
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  title: 'Let it Heal',
  description:
    'Let it Heal är en plats där du kan hitta information om healing, framför allt Reiki som är en holistisk japansk behandlingsmetod som syftar till stressreducering, avslappning och andlig läkning.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='sv'>
      <body
        className={`${QuicksandSansSerif.variable} ${InterSansSerif.variable} ${TangerineCalligraphy.variable} min-h-screen antialiased`}>
        <Providers>
          <Header />
          <main className='bg-[#f0fff0]'>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
