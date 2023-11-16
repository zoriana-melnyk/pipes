'use client';

import { Flowbite } from 'flowbite-react';
import { AppFooter, Header,  } from './components';

export default function HomePage() {
  return (
    <Flowbite>
      <Header />
      <main>
        <h1>Pipis</h1>
      </main>
      <AppFooter />
    </Flowbite>
  );
}
