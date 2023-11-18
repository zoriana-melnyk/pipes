import Link from 'next/link';
import { Navbar } from 'flowbite-react';
import { DarkThemeToggle } from 'flowbite-react';

const Header = () => {
  return (
    <Navbar fluid rounded>
      <Navbar.Brand as={Link} href="/">
        <img
          src="https://img.freepik.com/premium-vector/a-blue-square-with-a-globe-icon-on-it_876006-15.jpg"
          className="mr-3 h-6 sm:h-9"
          alt="Flowbite React Logo"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white text-blue-800">
          Flowbite React
        </span>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Navbar.Link href="/" active>
          Home
        </Navbar.Link>
        <Navbar.Link as={Link} href="/about">
          About
        </Navbar.Link>
        <Navbar.Link href="/search">Search</Navbar.Link>
        <DarkThemeToggle />
      </Navbar.Collapse>
    </Navbar>
  );
};

export { Header };
