import React from 'react';
import { AppFooter, Header } from '../components';
import { Flowbite } from 'flowbite-react';

const Skeleton = ({ children }) => {
  return (
      <Flowbite>
        <Header />
        <main className="main main__container">{children}</main>
        <AppFooter />
      </Flowbite>
  );
};

export default Skeleton;
