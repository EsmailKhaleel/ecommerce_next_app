'use client'
import React from 'react'
import styles from './cart.module.css'
import { useAppSelector, useAppDispatch } from '@/redux/hooks'
import { removeFromCart, clearCart } from '@/redux/slices/cartSlice'
import Link from 'next/link'
import ProductCard from '@/components/product-card/product-card'
import { Session } from 'next-auth'

export default function CartPageClient({ session } : { session: Session}) {
  const dispatch = useAppDispatch();
  const { items: cartItems, totalAmount } = useAppSelector(state => state.cart);

  const handleRemoveFromCart = (id: string) => {
    dispatch(removeFromCart(id));
  }

  const handleClearCart = () => {
    dispatch(clearCart());
  }

  if (cartItems.length === 0) {
    return (
      <div className={styles.emptyCart}>
        <h2>Your cart is empty!</h2>
        <h1 style={{ fontSize: '15rem',  mixBlendMode: 'luminosity' }}>🛒</h1>
        <Link href="/products" className={`viewButton`}>
          Continue Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Shopping Cart</h1>
        <button onClick={handleClearCart} className="deleteButton">
          Clear Cart
        </button>
      </div>
      <div className={styles.summary}>
        <p>Total Amount: <span>${totalAmount.toFixed(2)}</span></p>
      </div>
      <div className={styles.cartGrid}>
        {cartItems.map(item => (
          <ProductCard
            key={item.id}
            product={item}
            onRemoveFromCart={handleRemoveFromCart}
            showQuantity
            quantity={item.quantity}
            session={session}
          />
        ))}
      </div>
    </div>
  )
}