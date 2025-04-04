"use client"
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

export default function FilterRooms() {
    const router = useRouter();
    const pathName = usePathname();
    const searchParams = useSearchParams();
    function handleFilter (filter: string) {
        const newSearchParams = new URLSearchParams(searchParams.toString());
        if (filter === "All") {
            newSearchParams.delete("capacity");
        } else {
            newSearchParams.set("capacity", filter);
        }
        const newPathName = `${pathName}?${newSearchParams.toString()}`;
        router.push(newPathName);
    }
  return (
    <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", justifyContent: "center"}}>
        <button className='viewButton' onClick={() => handleFilter("all")}>All</button>
        <button className='viewButton' onClick={() => handleFilter("small")}>Small</button>
        <button className='viewButton' onClick={() => handleFilter("medium")}>Medium</button>
        <button className='viewButton' onClick={() => handleFilter("large")}>Large</button>
    </div>
  )
}
