'use client';

import { Footer, Label } from 'flowbite-react';
import Image from 'next/image';
import ua_region from '../img/logo_mob_ua_region.svg';
import allbiz_new from '../img/allbiz_logo_new.svg';
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
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2564.9666307516773!2d24.241885576917394!3d49.9932350715084!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x473acfcb5a186407%3A0x711c55ddaaf4a40c!2sTov%20Polipresmash!5e0!3m2!1sen!2sua!4v1702899616041!5m2!1sen!2sua"
              width="400"
              height="350"
              style={{ border: '0' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
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
