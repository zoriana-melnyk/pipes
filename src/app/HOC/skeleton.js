import React, { Suspense } from 'react';
import { AppFooter, Header } from '../components';
import { Flowbite, Spinner } from 'flowbite-react';
import { AppContextProvider } from '../service/AppContext';

const Skeleton = ({ children }) => {
  return (
    <Flowbite>
      <AppContextProvider>
        <Header />
        <Suspense fallback={<Spinner size="xl" />}>
          <main className="main main__container flex flex-col mx-5 my-3">{children}</main>
        </Suspense>
        <AppFooter />
      </AppContextProvider>
    </Flowbite>
  );
};

export default Skeleton;
