import BurgerMenu from './BurgerMenu';
import Menu from './Menu';
import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Forza App',
  description: 'Generated by Mariusz Krawczyk'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className='bg-slate-300 text-slate-600 flex min-h-screen'>
        <Menu />
        <BurgerMenu />
        {children}
      </body>
    </html>
  );
}
