import React from 'react';
import { AppFooter, Header } from '../components';

const Skeleton = ({ children }) => {
  return (
    <>
      <Header />
      <main className="main main__container">
        {children}
      </main>
      <AppFooter />
    </>
  );
};

export default Skeleton;
