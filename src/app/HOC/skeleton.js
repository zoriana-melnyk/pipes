import React, { Suspense, useContext, useEffect, useState } from 'react';
import { AppFooter, Header } from '../components';
import { Flowbite, Spinner } from 'flowbite-react';
import { Toaster } from 'sonner';
import { AppContext } from '../service/AppContext';

const Skeleton = ({ children }) => {
  let initialThemeMode = false;
  const appState = useContext(AppContext);
  const { user, dispatch } = appState;
  const storedUser = user || {};

  if (typeof window !== 'undefined') {
    // Client-side-only code
    initialThemeMode =
      window?.matchMedia &&
      window?.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  const [isDarkMode, setIsDarkMode] = useState(initialThemeMode);

  // theme change listener
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

  // get auth data if user token is stored
  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch('/api/user/me', {
        method: 'POST',
        body: JSON.stringify({
          token: storedUser.token || localStorage.getItem('token'),
        }),
      });
      const { data } = await response.json();
      dispatch({ type: 'SET_USER', payload: data });
    };
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Flowbite theme={{ dark: isDarkMode }}>
      <Header />
      <Toaster richColors />
      <Suspense fallback={<Spinner size="xl" />}>
        <main className="main main__container flex flex-col mx-5 my-3">
          {children}
        </main>
      </Suspense>
      <AppFooter />
    </Flowbite>
  );
};

export default Skeleton;
