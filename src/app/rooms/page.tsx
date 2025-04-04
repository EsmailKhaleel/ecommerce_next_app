import Link from 'next/link';
import React from 'react';
import styles from './rooms.module.css';
import { rooms } from './[id]/page';
import { Room } from '@/types/room';
import FilterRooms from '@/components/filterRooms/filterRooms';

interface props {
  searchParams: Promise<{ capacity: string }>;
}
export default async function Rooms({ searchParams }: props) {
  const { capacity } = await searchParams;
  const filteredValue = capacity ?? "all";
  console.log(filteredValue);
  const filterFunctions: Record<string, (room: Room) => boolean> = {
    small: (room) => room.capacity <= 2,
    medium: (room) => room.capacity > 2 && room.capacity <= 4,
    large: (room) => room.capacity > 4,
  };

  const filteredRooms =
    filteredValue in filterFunctions ? rooms.filter(filterFunctions[filteredValue]) : rooms;
    const getDarkColor = () =>
      `hsl(${Math.floor(Math.random() * 360)}, ${Math.floor(Math.random() * 30) + 20}%, ${Math.floor(Math.random() * 20) + 5}%)`;
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Available Rooms</h1>
      <FilterRooms />
      <ul className={styles.roomGrid}>
        {filteredRooms.map(room => (
          <li key={room.id} className={styles.roomCard} style={{ backgroundColor: getDarkColor() }}>
            <h2 className={styles.roomTitle}>{room.title}</h2>
            <p className={styles.roomDescription}>{room.description}</p>
            <p className={styles.roomPrice}>
              <strong>${room.price}</strong> / night
            </p>
            <Link href={`/rooms/${room.id}`} className={`viewButton`}>
              View Details
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
