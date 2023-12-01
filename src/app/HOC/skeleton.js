import React, { Suspense } from 'react';
import { AppFooter, Header } from '../components';
import { Flowbite, Spinner } from 'flowbite-react';
import { CartProvider } from '../service/CartContext';

const Skeleton = ({ children }) => {
  return (
    <Flowbite>
      <CartProvider>
        <Header />
        <Suspense fallback={<Spinner />}>
          <main className="main main__container flex flex-col">{children}</main>
        </Suspense>
        <AppFooter />
      </CartProvider>
    </Flowbite>
  );
};

export default Skeleton;
