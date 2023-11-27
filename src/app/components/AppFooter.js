'use client';

import { Footer } from 'flowbite-react';
import Image from 'next/image';
import ua_region from '../img/logo_mob_ua_region.svg';
import allbiz_new from '../img/allbiz_logo_new.svg';
import map from '../img/map.png';

const AppFooter = () => {
  return (
    <Footer container>
      <div class="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div class="md:flex md:justify-between">
          <Footer.Brand
            href="/"
            src="/img/icon.png"
            style={{ aspectRatio: '1 / 1', width: '50px', height: 'auto' }}
            alt="App-Logo"
            name="Поліпресмаш"
          />
          <div>
            <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Сторінки</h2>
            <Footer.LinkGroup class="text-gray-500 dark:text-gray-400 font-medium mb-4">
              <Footer.Link href="#" class="hover:underline">Головна</Footer.Link>
              <Footer.Link href="#" class="hover:underline">Про нас</Footer.Link>
              <Footer.Link href="#" class="hover:underline">Продукція</Footer.Link>
              <Footer.Link href="#" class="hover:underline">- Труба безшовна</Footer.Link>
              <Footer.Link href="#" class="hover:underline">- Труба електризварна</Footer.Link>
              <Footer.Link href="#" class="hover:underline">- Труба водогазопровідна</Footer.Link>
              <Footer.Link href="#" class="hover:underline">- Труба профільна</Footer.Link>
              <Footer.Link href="#" class="hover:underline">- Труба профільна</Footer.Link>
              <Footer.Link href="#" class="hover:underline">- Труба чавунна</Footer.Link>
              <Footer.Link href="#" class="hover:underline">Ціни</Footer.Link>
              <Footer.Link href="#" class="hover:underline">Контакти</Footer.Link>
            </Footer.LinkGroup>
          </div>
          <div>
            <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Ми на карті</h2>
            <Image src={map} style={{ aspectRatio: '1 / 1', width: '100px', height: 'auto' }}
              alt="map" />
          </div>
        </div>
        <Footer.Divider className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div class="sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright href="#" by="Polipresmash™" year={2022} />
          <div class="flex mt-4 sm:justify-center sm:mt-0 gap-4">
            <a href="https://www.ua-region.com.ua/en/36767570" class="text-gray-500 hover:text-gray-900 dark:hover:text-white">
              <Image src={ua_region} style={{ aspectRatio: '1 / 1', width: '50px', height: 'auto' }}
                alt="ua_region-Logo" />
            </a>
            <a href="https://85682-ua.all.biz/uk/" class="text-gray-500 hover:text-gray-900 dark:hover:text-white">
              <Image src={allbiz_new} style={{ aspectRatio: '1 / 1', width: '50px', height: 'auto' }}
                alt="allbiz_new-Logo" />
            </a>
          </div>
        </div>
      </div>
    </Footer>
  );
}

export { AppFooter };
