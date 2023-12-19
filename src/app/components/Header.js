'use client';

import Link from 'next/link';
import { Avatar, Dropdown, Navbar, Spinner } from 'flowbite-react';
import { DarkThemeToggle } from 'flowbite-react';
import logo from '../img/icon.png';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { AppContext } from '../service/AppContext';
import { useContext } from 'react';
import UserIcon from '../img/icon_user.svg';
import { REMOVE_USER } from '../service/contextDispatchTypes';

const vocabulary = {
  en: {
    home: 'Home',
    search: 'Search',
    cart: 'Cart',
    about: 'About',
    login: 'Login',
    logout: 'Logout',
    settings: 'Settings',
    notifications: 'Notifications',
  },
  ua: {
    home: 'Головна',
    search: 'Пошук',
    cart: 'Кошик',
    about: 'Про нас',
    login: 'Вхід',
    logout: 'Вийти',
    settings: 'Налаштування',
    notifications: 'Сповіщення',
  },
};

const Header = () => {
  const lang = 'ua';
  const t = (key) => vocabulary[lang][key];
  const pathname = usePathname();
  const appState = useContext(AppContext);
  const { selectedProducts, user, dispatch, isUserLoading } = appState;
  const storedUser = user || {};

  const onLogout = () => {
    dispatch({ type: REMOVE_USER });
    localStorage.removeItem('token');
  };

  const NotificationBudge = () => {
    const amount = [...selectedProducts].length;
    if (amount) {
      return (
        <>
          <span className="sr-only">{t('notifications')}</span>
          <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">
            {amount}
          </div>
        </>
      );
    }
  };

  const UserSection = ({ children }) => {
    const isLoggedIn = storedUser.email;

    if (isLoggedIn) {
      return (
        <div className="flex md:order-2">
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <div className="relative">
                <Avatar
                  alt="User settings"
                  img={storedUser.avatarUrl}
                  rounded
                />
                <NotificationBudge />
              </div>
            }
          >
            <Dropdown.Header>
              <span className="block text-sm"> </span>
              <span className="block truncate text-sm font-medium">
                {storedUser.email}
              </span>
            </Dropdown.Header>
            <Dropdown.Item>
              <Navbar.Link
                as={Link}
                href="/profile"
                active={pathname === '/profile'}
              >
                {t('settings')}
              </Navbar.Link>
            </Dropdown.Item>
            <Dropdown.Item className="relative">
              <Navbar.Link as={Link} href="/cart" active={pathname === '/cart'}>
                {t('cart')}
                <NotificationBudge />
              </Navbar.Link>
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={onLogout}>Вийти</Dropdown.Item>
          </Dropdown>

          {children}
        </div>
      );
    }

    return (
      <div className="flex list-none items-center">
        {!isLoggedIn && isUserLoading ? (
          <Spinner />
        ) : (
          <>
            <div className="relative mx-3 w-8">
              <Image
                src={UserIcon}
                style={{ aspectRatio: '1 / 1', width: '25px', height: 'auto' }}
                alt="User-Icon"
              />
              <NotificationBudge />
            </div>
            <Navbar.Link
              as={Link}
              href={isLoggedIn ? '/profile' : '/login'}
              className="flex items-center list-none border-none text-sm"
            >
              {t(isLoggedIn ? 'settings' : 'login')}
            </Navbar.Link>
          </>
        )}

        {children}
      </div>
    );
  };

  return (
    <Navbar fluid rounded>
      <Navbar.Brand as={Link} href="/">
        <Image
          src={logo}
          style={{ aspectRatio: '1 / 1', width: '50px', height: 'auto' }}
          alt="App-Logo"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold text-black dark:text-white text-xs md:text-base">
          Поліпресмаш
        </span>
      </Navbar.Brand>
      <Navbar.Collapse>
        <Navbar.Link as={Link} href="/" active={pathname === '/'}>
          {t('home')}
        </Navbar.Link>
        <Navbar.Link as={Link} href="/search" active={pathname === '/search'}>
          {t('search')}
        </Navbar.Link>
        <Navbar.Link as={Link} href="/cart" active={pathname === '/cart'}>
          {t('cart')}
        </Navbar.Link>
        <Navbar.Link as={Link} href="/about" active={pathname === '/about'}>
          {t('about')}
        </Navbar.Link>
      </Navbar.Collapse>

      <UserSection>
        <div className="ml-2">
          <DarkThemeToggle />
        </div>
      </UserSection>
      <Navbar.Toggle />
    </Navbar>
  );
};

export { Header };
