import { auth } from '@/util/auth';
import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import styles from './account.module.css';

export default async function Account() {
  const session = await auth();

  if (!session) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", fontSize: "2rem", fontWeight: "bold", }}
      >You are not logged in, Redirecting...</div>
    )
  }

  return (
    <div className={styles.accountContainer}>
      <div className={styles.accountCard}>
        <Image
          src={session.user?.image as string}
          alt={session.user?.name as string}
          width={100}
          height={100}
          className={styles.profileImage}
        />
        <div className={styles.welcomeText}>Welcome,</div>
        <div className={styles.welcomeText}> {session.user?.name}</div>
        <p className={styles.emailText}>{session.user?.email}</p>
        <Link href="/logout" className='deleteButton'>Sign Out</Link>
      </div>
    </div>
  );
}
