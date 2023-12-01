import Link from 'next/link';
import { Avatar, Dropdown, Navbar } from 'flowbite-react';
import { DarkThemeToggle } from 'flowbite-react';
import logo from '../img/icon.png';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { CartContext } from '../service/CartContext';
import { useContext } from 'react';

const Header = () => {
  const pathname = usePathname();
  const { selectedProducts } = useContext(CartContext);

  const NotificationBudge = () => {
    const amount = [...selectedProducts].length;
    if (amount) {
      return (
        <>
          <span className="sr-only">Notifications</span>
          <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">
            {amount}
          </div>
        </>
      );
    }
  };

  return (
    <Navbar fluid rounded>
      <Navbar.Brand as={Link} href="/">
        <Image
          src={logo}
          style={{ aspectRatio: '1 / 1', width: '50px', height: 'auto' }}
          alt="App-Logo"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold text-black dark:text-white">
          Поліпресмаш
        </span>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Navbar.Link as={Link} href="/" active={pathname === '/'}>
          Головна
        </Navbar.Link>
        <Navbar.Link as={Link} href="/search" active={pathname === '/search'}>
          Пошук
        </Navbar.Link>
        <Navbar.Link as={Link} href="/cart" active={pathname === '/cart'}>
          Кошик
        </Navbar.Link>
        <Navbar.Link as={Link} href="/about" active={pathname === '/about'}>
          Про нас
        </Navbar.Link>
      </Navbar.Collapse>
      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <div className="relative">
              <Avatar
                alt="User settings"
                img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                rounded
              />
              <NotificationBudge />
            </div>
          }
        >
          <Dropdown.Header>
            <span className="block text-sm"> </span>
            <span className="block truncate text-sm font-medium">
              Anonimous@dev.com
            </span>
          </Dropdown.Header>
          <Dropdown.Item>
            <Navbar.Link
              as={Link}
              href="/profile"
              active={pathname === '/profile'}
            >
              Налаштування
            </Navbar.Link>
          </Dropdown.Item>
          <Dropdown.Item className="relative">
            <Navbar.Link as={Link} href="/cart" active={pathname === '/cart'}>
              Кошик
              <NotificationBudge />
            </Navbar.Link>
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item>Вийти</Dropdown.Item>
        </Dropdown>
        <div className="mx-2">
          <DarkThemeToggle />
        </div>
        <Navbar.Toggle />
      </div>
    </Navbar>
  );
};

export { Header };
