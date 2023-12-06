'use client';

import { Footer, Label } from 'flowbite-react';
import Image from 'next/image';
import ua_region from '../img/logo_mob_ua_region.svg';
import allbiz_new from '../img/allbiz_logo_new.svg';
import map from '../img/map.png';
import Link from 'next/link';

const AppFooter = () => {
  return (
    <Footer container>
      <div className="flex flex-col w-full text-center">
        <div className="flex-1 flex flex-col items-center gap-5 md:flex-row md:justify-between md:content-start">
          <Footer.Brand
            href="/"
            src="/img/icon.png"
            style={{ width: 'auto', height: 'auto' }}
            alt="App-Logo"
            name="Поліпресмаш"
          />
          <Footer.LinkGroup className="flex gap-2">
            <Footer.Link as={Link} href="/">
              Головна
            </Footer.Link>
            <Footer.Link as={Link} href="/search">
              Пошук
            </Footer.Link>
            <Footer.Link as={Link} href="/about">
              Про нас
            </Footer.Link>
          </Footer.LinkGroup>
          <div>
            <Label>Ми на карті</Label>
            <Image
              src={map}
              style={{ aspectRatio: '1 / 1', width: '100px', height: 'auto' }}
              alt="map"
            />
          </div>
        </div>

        <Footer.Divider />
        <Label>Партнери</Label>
        <div className="flex items-center justify-center gap-4">
          <a
            href="https://www.ua-region.com.ua/en/36767570"
            className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
          >
            <Image
              src={ua_region}
              style={{ aspectRatio: '1 / 1', width: '50px', height: 'auto' }}
              alt="ua_region-Logo"
            />
          </a>
          <a
            href="https://85682-ua.all.biz/uk/"
            className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
          >
            <Image
              src={allbiz_new}
              style={{ aspectRatio: '1 / 1', width: '50px', height: 'auto' }}
              alt="allbiz_new-Logo"
            />
          </a>
        </div>
        <Footer.Divider />
        <Footer.Copyright
          href="/"
          by="Поліпресмаш™"
          year={new Date().getFullYear()}
        />
      </div>
    </Footer>
  );
};

export { AppFooter };
