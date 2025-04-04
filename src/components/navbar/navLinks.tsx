"use client"
import styles from './navbar.module.css'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'
interface props {
    to: string,
    label: string
}
export default function NavLinks({ to , label } : props) {
    const pathname = usePathname();
    const getLinkClassName = (href: string) => {
        return pathname === href ? `${styles.link} ${styles.active}` : styles.link;
    };
    return (
        <div>
            <Link
                key={to}
                href={to}
                className={getLinkClassName(to)}
            >
                {label}
            </Link>
        </div>
    )
}
