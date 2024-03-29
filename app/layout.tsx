import BurgerMenu from './BurgerMenu';
import Menu from './Menu';
import './globals.css';
import type { Metadata } from 'next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';

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
      <body className='bg-slate-100 text-slate-600 flex min-h-screen w-screen'>
        <Menu />
        <BurgerMenu />
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
