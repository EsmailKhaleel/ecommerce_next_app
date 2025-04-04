import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import styles from './roomDetails.module.css';
import { rooms } from '@/rooms-data/rooms-data';

interface props {
  params: Promise<{
    id: string;
  }>;
}

export const generateMetadata = async ({ params }: props) => {
  const { id } = await params;
  const room = rooms.find(r => r.id === parseInt(id));
  if (!room) {
    return {
      title: 'Room Not Found',
    };
  }
  return {
    title: room.title,
  };
}
export default async function RoomDetails({ params }: props) {

const { id } = await params;
  const room = rooms.find(r => r.id === parseInt(id));
  
  if (!room) {
    notFound();
  }

  return (
    <main className={styles.container}>
      <Link href="/rooms" className={styles.backLink}>← Back to Rooms</Link>
      <div className={styles.roomContainer}>
        <h1 className={styles.title}>{room.title}</h1>
        <p className={styles.description}>{room.description}</p>
        <div className={styles.detailsGrid}>
          <div>
            <h2 className={styles.sectionTitle}>Details</h2>
            <p className={styles.detailsText}>Size: {room.size}</p>
            <p className={styles.detailsText}>Max Occupancy: {room.capacity} persons</p>
            <p className={styles.detailsText}>Price per night: ${room.price}</p>
          </div>
          
          <div>
            <h2 className={styles.sectionTitle}>Amenities</h2>
            <ul className={styles.amenitiesList}>
              {room.amenities.map((amenity, index) => (
                <li key={index}>{amenity}</li>
              ))}
            </ul>
          </div>
        </div>
        <button className={styles.bookButton}>
          Book Now
        </button>
      </div>
    </main>
  );
}

