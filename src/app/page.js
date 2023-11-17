'use client';

import { Flowbite } from 'flowbite-react';
import { AppFooter, Header,  } from './components';
import { Products } from './containers/Products';

export default function HomePage() {
  return (
    <Flowbite>
      <Header />
      <main>
        <Products />
      </main>
      <AppFooter />
    </Flowbite>
  );
}
