'use client';

import { Sofia_Sans } from 'next/font/google';
import './globals.css';
import Skeleton from './HOC/skeleton';

const sofia = Sofia_Sans({ subsets: ['latin'], weight: '600' });

// TODO: find a way to pass this to the page in client mode
// export const metadata = {
//   title: 'Create Next App',
//   description: 'Generated by create next app',
// };

export default function RootLayout({ children }) {
  return (
    <html>
      <body className={sofia.className} suppressHydrationWarning={true}>
        <Skeleton>{children}</Skeleton>
      </body>
    </html>
  );
}
