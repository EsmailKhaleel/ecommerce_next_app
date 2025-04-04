import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import styles from './roomDetails.module.css';
import { Room } from '@/types/room';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export const generateMetadata = async ({ params }: PageProps) => {
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
export default async function RoomDetails({ params }: PageProps) {

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

export const rooms: Room[] = [
  { 
    id: 1, 
    title: 'Room A', 
    description: 'A cozy room in the city center.',
    price: 100,
    amenities: ['WiFi', 'Air Conditioning', 'TV'],
    size: '20m²',
    capacity: 2
  },
  { 
    id: 2, 
    title: 'Room B', 
    description: 'A spacious room with a great view.',
    price: 150,
    amenities: ['WiFi', 'Air Conditioning', 'TV', 'Mini Bar'],
    size: '30m²',
    capacity: 3
  },
  { 
    id: 3, 
    title: 'Room C', 
    description: 'A modern room with all amenities.',
    price: 200,
    amenities: ['WiFi', 'Air Conditioning', 'TV', 'Mini Bar', 'Balcony'],
    size: '40m²',
    capacity: 4
  },
  { 
    id: 4, 
    title: 'Room D', 
    description: 'A modern room with all amenities.',
    price: 2000,
    amenities: ['WiFi', 'Air Conditioning', 'TV', 'Mini Bar', 'Balcony'],
    size: '80m²',
    capacity: 10
  },
  { 
    id: 5, 
    title: 'Room E', 
    description: 'A spacious room with a great view.',
    price: 3000,
    amenities: ['WiFi', 'Air Conditioning', 'TV', 'Mini Bar', 'Balcony'],
    size: '100m²',
    capacity: 12
  },
  { 
    id: 6, 
    title: 'Room F', 
    description: 'A spacious room with a great view.',
    price: 500,
    amenities: ['WiFi', 'Air Conditioning', 'TV', 'Mini Bar', 'Balcony'],
    size: '30m²',
    capacity: 1
  },
];