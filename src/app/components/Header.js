import Link from 'next/link';
import { Navbar } from 'flowbite-react';
import { DarkThemeToggle } from 'flowbite-react';
import logo from '../img/icon.png';
import Image from 'next/image';
import { useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
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
        <Navbar.Link as={Link} href="/" active={location.pathname === '/'} >
          Головна
        </Navbar.Link>
        <Navbar.Link as={Link} href="/about" active={location.pathname === '/about'} >
          Про нас
        </Navbar.Link>
        <Navbar.Link as={Link} href="/product" active={location.pathname === '/product'}>
          Продукція
        </Navbar.Link>
        <Navbar.Link as={Link} href="/price" active={location.pathname === '/price'}>
          Ціни
        </Navbar.Link>
        <Navbar.Link as={Link} href="/contact" active={location.pathname === '/contact'}>
          Контакти
        </Navbar.Link>
        <Navbar.Link as={Link} href="/search" active={location.pathname === '/search'}>Пошук</Navbar.Link>
        <DarkThemeToggle />
      </Navbar.Collapse>
    </Navbar>
  );
};

export { Header };
