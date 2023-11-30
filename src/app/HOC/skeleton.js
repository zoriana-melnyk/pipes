import React, { Suspense } from 'react';
import { AppFooter, Header } from '../components';
import { Flowbite, Spinner } from 'flowbite-react';

const Skeleton = ({ children }) => {
  return (
      <Flowbite>
        <Header />
        <Suspense fallback={<Spinner />}>
          <main className="main main__container">{children}</main>
        </Suspense>
        <AppFooter />
      </Flowbite>
  );
};

export default Skeleton;
