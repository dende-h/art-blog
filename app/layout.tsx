import './globals.css';
import type { Metadata } from 'next';
import { Noto_Serif_JP } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const notoSerifJP = Noto_Serif_JP({ 
  subsets: ['latin'],
  weight: ['400', '700'] // Adding weight specification
});

export const metadata: Metadata = {
  title: '夜の文豪の書斎',
  description: '和風で落ち着いた雰囲気のブログサイト',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={`${notoSerifJP.className} min-h-screen flex flex-col`}>
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">{children}</main>
        <Footer />
      </body>
    </html>
  );
}