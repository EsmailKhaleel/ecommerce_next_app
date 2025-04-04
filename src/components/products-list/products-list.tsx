"use client"
import { useAppDispatch } from '@/redux/hooks';
import { addToCart } from '@/redux/slices/cartSlice';
import { Product } from '@/types/product';
import { useSearchParams } from 'next/navigation';
import React from 'react'
import ProductCard from '../product-card/product-card';
import styles from './products-list.module.css';

export default function ProductsList({ products, session }: { products: Product[], session: any }) {
    const dispatch = useAppDispatch();
    const handleAddToCart = (product: Product) => {
        dispatch(addToCart(product));
    }
    let filteredProducts = [...products];
    const searchParams = useSearchParams();
    const discount = searchParams.get('discount') || '';
    const category = searchParams.get('category') || '';
    const minPrice = searchParams.get('min') || '';
    const maxPrice = searchParams.get('max') || '';
    // Filter by price range
    if (minPrice && maxPrice) {
        const min = Number(minPrice);
        const max = Number(maxPrice);
        if (!isNaN(min) && !isNaN(max)) {
            filteredProducts = products.filter(
                (product) => product.price >= min && product.price <= max
            );
        }
    }

    // Filter by discount
    if (discount) {
        const discountValue = Number(discount);
        if (discountValue > 0) {
            filteredProducts = products.filter((product) => product.discount <= discountValue);
        } else if (discountValue === 0) {
            filteredProducts = products.filter((product) => product.discount === 0);
        }
    }

    // Filter by category
    if (category) {
        filteredProducts = products.filter((product) => product.category === category);
    }

    // Filter by category and discount
    if (discount && category) {
        const discountValue = Number(discount);
        if (discountValue > 0) {
            filteredProducts = products.filter((product) => product.discount <= discountValue && product.category === category);
        } else if (discountValue === 0) {
            filteredProducts = products.filter((product) => product.discount === 0 && product.category === category);
        }
    }
    // Filter by price and category
    if (minPrice && maxPrice && category) {
        const min = Number(minPrice);
        const max = Number(maxPrice);
        if (!isNaN(min) && !isNaN(max)) {
            filteredProducts = products.filter(
                (product) => product.price >= min && product.price <= max && product.category === category
            );
        }
    }
    // Filter by price and discount
    if (minPrice && maxPrice && discount) {
        const min = Number(minPrice);
        const max = Number(maxPrice);
        if (!isNaN(min) && !isNaN(max)) {
            filteredProducts = products.filter(
                (product) => product.price >= min && product.price <= max && product.discount <= Number(discount)
            );
        }
    }
    // Filter by all three: discount, category, and price
    if (discount && category && minPrice && maxPrice) {
        const discountValue = Number(discount);
        const min = Number(minPrice);
        const max = Number(maxPrice);
        if (!isNaN(min) && !isNaN(max)) {
            filteredProducts = products.filter(
                (product) => product.price >= min && product.price <= max 
                && product.discount <= discountValue 
                && product.category === category
            );
        }
    }

    // Handle empty state, If no products match the filter, show a message
    if (filteredProducts.length === 0) {
        return (
            <div className={styles.container}>
                <h2 className={styles.title} style={{ textAlign: 'center' }}>No products found</h2>
            </div>
        )
    }
    return (
        <div className={styles.container}>
            {filteredProducts.map((product: Product, index: number) => (
                <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                    index={index}
                    session={session}
                />
            ))}
        </div>
    )
}
