'use client';

import { Sofia_Sans } from 'next/font/google';
import './globals.css';
import Skeleton from './HOC/skeleton';
import { usePathname } from 'next/navigation';
import { AppContextProvider } from './service/AppContext';

const sofia = Sofia_Sans({ subsets: ['latin'], weight: '600' });

export default function RootLayout({ children }) {
  const pathname = usePathname();

  const getPageTitle = () => {
    switch (pathname) {
      case '/':
        return 'Home';
      case '/about':
      case '/contact':
        return 'About';
      case '/cart':
        return 'Cart';
      case '/search':
        return 'Search';
      case '/login':
        return 'Login';
      case '/profile':
        return 'Profile';
      default:
        return 'Page Not Found';
    }
  };

  const getPageDescription = () => {
    switch (pathname) {
      case '/':
        return 'Home page of the Next.js Boilerplate';
      case '/about':
        return 'About page of the Next.js Boilerplate';
      case '/cart':
        return 'Cart page of the Next.js Boilerplate';
      case '/search':
        return 'Search page of the Next.js Boilerplate';
      case '/login':
        return 'Login page of the Next.js Boilerplate';
      case '/profile':
        return 'Profile page of the Next.js Boilerplate';
      default:
        return 'Page Not Found';
    }
  };

  return (
    <html>
      <head>
        <title>{getPageTitle()}</title>
        <meta name="description" content={getPageDescription()} />
      </head>
      <body
        className={`${sofia.className} bg-white bg-slate-200 dark:bg-slate-800`}
        suppressHydrationWarning={true}
      >
        <AppContextProvider>
          <Skeleton>{children}</Skeleton>
        </AppContextProvider>
      </body>
    </html>
  );
}
