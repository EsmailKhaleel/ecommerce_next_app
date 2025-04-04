'use client'
import { useMemo } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import styles from './products.module.css'
import FilterProductsByDiscount from '@/components/filter-products-by-discount/filter-products-by-discount'
import PriceFilterComponent from '@/components/price-filter/price-filter'
import { MdDiscount } from "react-icons/md";
import { BiCategoryAlt } from "react-icons/bi";
import { Product } from '@/types/product'

export const priceRanges = [
  { label: 'Filter by Price', min: 0, max: Infinity },
  { label: 'Under $500', min: 0, max: 500 },
  { label: '$500 - $2000', min: 500, max: 2000 },
  { label: 'Over $2000', min: 2000, max: Infinity },
];


export default function ProductsLayoutClient({ children, products: items }: { children: React.ReactNode, products: Product[] }) {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const isProductDetailsPage = /^\/products\/[A-Za-z0-9]+$/.test(pathName);
  const activeCategory = searchParams.get("category") || "All";

  function handleFilterByCategory(filter: string) {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    if (filter === "All") {
      newSearchParams.delete("category");
    } else {
      newSearchParams.set("category", filter);
    }
    const newPathName = `${pathName}?${newSearchParams.toString()}`;
    router.push(newPathName);
  }

  const categories = useMemo(() =>
    Array.from(new Set(items.map(product => product.category)))
    , [items]);

  return (
    <div>
      {!isProductDetailsPage && <div className={styles.filterContainer}>
        <div className={styles.filterGroup}>
          <div className={styles.filterGroupHeader}>
            <span className={styles.filterIcon}>
              <MdDiscount />
            </span>
            <h3 className={styles.filterSubtitle}>By Discount</h3>
          </div>
          <div className={styles.categoryButtons}>
            <FilterProductsByDiscount />
          </div>
        </div>
        <div className={styles.filterGroup}>
          <div className={styles.filterGroupHeader}>
            <span className={styles.filterIcon}><BiCategoryAlt /></span>
            <h3 className={styles.filterSubtitle}>By Category</h3>
          </div>
          <div className={styles.categoryButtons}>
            <button
              className={`deleteButton ${activeCategory === "All" ? "active" : ""}`}
              onClick={() => handleFilterByCategory("All")}
            >
              All Products
            </button>
            {categories.map((category) => (
              <button
                onClick={() => handleFilterByCategory(category)}
                key={category}
                className={`${styles.viewButton} ${activeCategory === category ? styles.active : ""}`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        <PriceFilterComponent />
      </div>
      }
      {children}
    </div>
  )
}