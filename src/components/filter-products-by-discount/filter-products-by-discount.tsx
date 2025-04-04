"use client"
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React from 'react'


export default function FilterProductsByDiscount() {
    const router = useRouter();
    const pathName = usePathname();
    const searchParams = useSearchParams();
    const activeButton = searchParams.get("discount") || "-1";

    function handleFilter(filter: number) {
        const newSearchParams = new URLSearchParams(searchParams.toString());
        if (filter === -1) {
            newSearchParams.delete("discount");
        } else {
            newSearchParams.set("discount", filter.toString());
        }
        const newPathName = `${pathName}?${newSearchParams.toString()}`;
        router.push(newPathName);
    }

    return (
        <div>
            <button className={`deleteButton ${activeButton === "-1" ? "active" : ""}`} onClick={() => handleFilter(-1)}>Reset</button>
            <button className={`viewButton ${activeButton === "0" ? "active" : ""}`} onClick={() => handleFilter(0)}>No Discount</button>
            <button className={`viewButton ${activeButton === "25" ? "active" : ""}`} onClick={() => handleFilter(25)}>Up to 25% Discount</button>
            <button className={`viewButton ${activeButton === "50" ? "active" : ""}`} onClick={() => handleFilter(50)}>Up to 50% Discount</button>
            <button className={`viewButton ${activeButton === "75" ? "active" : ""}`} onClick={() => handleFilter(75)}>Up to 75% Discount</button>
            <button className={`viewButton ${activeButton === "100" ? "active" : ""}`} onClick={() => handleFilter(100)}>Up to 100% Discount</button>
        </div>
    );
}
