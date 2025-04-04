"use client";

import { useState } from 'react';
import Link from 'next/link';
import styles from './navbar.module.css';
import NavLinks from './navLinks';
import AddProductLink from './addProductLink';
import { AiOutlineWeiboCircle, AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { Session } from 'next-auth';

const navLinks = [
  { to: '/rooms', label: 'Rooms' },
  { to: '/products', label: 'Products' },
  { to: '/account', label: 'Account' },
  { to: '/users', label: 'Users' },
  { to: '/cart', label: 'Cart' },
];

export default function Navbar({ session }: { session: Session | null }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const extendedNavLinks = session
    ? [...navLinks, { to: '/logout', label: 'Logout' }]
    : [...navLinks, { to: '/login', label: 'Login' }];

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.navContent}>
          <Link href="/" passHref>
            <div className={styles.logo} style={{ cursor: 'pointer' }}>
              <AiOutlineWeiboCircle />
            </div>
          </Link>
          <div className={styles.hamburger} onClick={toggleMenu}>
            {menuOpen ? <AiOutlineClose style={{ fontSize: '2rem', color: 'black'}}/> : <AiOutlineMenu  style={{ fontSize: '2rem', color: 'black'}}/>}
          </div>
          <div className={`${styles.navLinks} ${menuOpen ? styles.showMenu : ''}`}>
            {extendedNavLinks.map(({ to, label }) => (
              <NavLinks key={to} to={to} label={label} />
            ))}
            <div>
              <AddProductLink session={session} />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
