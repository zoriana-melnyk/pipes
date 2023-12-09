import React, { Suspense, useEffect, useState } from 'react';
import { AppFooter, Header } from '../components';
import { Flowbite, Spinner } from 'flowbite-react';
import { AppContextProvider } from '../service/AppContext';

const Skeleton = ({ children }) => {
  let initialThemeMode = false;
  if (typeof window !== 'undefined') {
    // Client-side-only code
    initialThemeMode =
      window?.matchMedia &&
      window?.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  const [isDarkMode, setIsDarkMode] = useState(initialThemeMode);

  useEffect(() => {
    // listener dor theme change
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      if (
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches
      ) {
        setIsDarkMode(true);
      } else {
        setIsDarkMode(false);
      }
    };
    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [initialThemeMode]);

  return (
    <Flowbite theme={{ dark: isDarkMode}}>
      <AppContextProvider>
        <Header />
        <Suspense fallback={<Spinner size="xl" />}>
          <main className="main main__container flex flex-col mx-5 my-3">
            {children}
          </main>
        </Suspense>
        <AppFooter />
      </AppContextProvider>
    </Flowbite>
  );
};

export default Skeleton;
