'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Product } from '@/types/product'
import { Toast } from '../Toast/Toast'
import styles from './ProductCard.module.css'
import { useAppSelector } from '@/redux/hooks'

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onRemoveFromCart?: (id: string) => void;
  showQuantity?: boolean;
  quantity?: number;
  index?: number;
  session?: unknown
}

export default function ProductCard({
  product,
  onAddToCart,
  onRemoveFromCart,
  showQuantity,
  quantity,
  index = 0,
  session
}: ProductCardProps) {
  const [toast, setToast] = useState<{
    show: boolean;
    message: string;
    type: 'success' | 'error';
  }>({ show: false, message: '', type: 'success' });

  const { items: cartItems } = useAppSelector(state => state.cart);
  /**
   * Handles adding a product to the cart. If a user session exists,
   * it triggers the `onAddToCart` callback with the provided product
   * and displays a success toast message. If there's no active session,
   * it displays an error toast message indicating the user must be logged in.
   *
   * @param product - The product to be added to the cart.
   */
  const handleAddToCart = (product: Product) => {
    if (session !== null && session !== undefined) {
      onAddToCart?.(product);
      setToast({
        show: true,
        message: `Item added to cart!`,
        type: 'success'
      });
    } else {
      setToast({
        show: true,
        message: `You must be logged in to add to cart`,
        type: 'error'
      });
    }
  };

  const handleRemoveFromCart = (id: string) => {
    console.log("session", session)
    if (session !== null && session !== undefined) {
      const cartItem = cartItems.find(item => item.id === product.id);
      if (cartItem?.quantity === 1) {
        onRemoveFromCart?.(id);
        setToast({
          show: true,
          message: 'Item removed from cart',
          type: 'success'
        })
      } else {
        onRemoveFromCart?.(id);
        setToast({
          show: true,
          message: 'Item quantity reduced',
          type: 'error'
        });
      }
    } else {
      setToast({
        show: true,
        message: `You must be logged in to remove from cart`,
        type: 'error'
      });
    }
  };



  return (
    <>
      {toast.show &&
        <Toast message={toast.message} type={toast.type} onClose={() => setToast({ show: false, message: '', type: 'success' })} />}
      <div className={styles.card}>
        <div className={styles.imageContainer}>
          <Image
            src={product.image || './icon.svg'}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: 'cover' }}
            priority={index < 6}
            loading={(index ?? 0) >= 6 ? 'lazy' : undefined}
          />
        </div>
        <div className={styles.details}>
          <div className={styles.topSection}>
            <h2 className={styles.title}>{product.name}</h2>
            <div className={styles.priceContainer}>
              <p className={styles.price}>${product.price}</p>
              <p className={styles.oldPrice}>${product.old_price}</p>
              <span className={styles.discount}>{product.discount}% OFF</span>
            </div>
          </div>

          <div className={styles.bottomSection}>
            {showQuantity && (
              <div className={styles.quantity}>
                Quantity: {quantity}
              </div>
            )}
            <div className={styles.badgeActions}>
              <span className={styles.badge}>{product.category}</span>
              <div className={styles.actions}>
                <Link href={`/products/${product.id}`}>
                  <button className={styles.viewButton}>View</button>
                </Link>
                {onAddToCart && (
                  <button
                    className={styles.viewButton}
                    onClick={() => handleAddToCart(product)}
                  >
                    Add To Cart
                  </button>
                )}
                {onRemoveFromCart && (
                  <button
                    className={styles.viewButton}
                    onClick={() => handleRemoveFromCart(product.id)}
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}