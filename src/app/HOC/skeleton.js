import React from 'react';
import { AppFooter, Header } from '../components';
import { Flowbite } from 'flowbite-react';
import { BrowserRouter } from 'react-router-dom';

const Skeleton = ({ children }) => {
  return (
    <Flowbite>
      <BrowserRouter>
        <Header />
        <main className="main main__container">
          {children}
        </main>
        <AppFooter />
      </BrowserRouter>
    </Flowbite>

  );
};

export default Skeleton;
