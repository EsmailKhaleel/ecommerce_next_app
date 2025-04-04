'use client'
import React, { useState } from 'react'
import { Carousel } from 'react-responsive-carousel'
import Image from 'next/image'
import styles from './productDetails.module.css'
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { addToCart } from '@/redux/slices/cartSlice'
import { useAppDispatch } from '@/redux/hooks'
import Link from 'next/link'
import { api } from '@/apiClient/apiClient'
import { Toast } from '@/components/Toast/Toast'
import { Product } from '@/types/product'
import { Session } from 'next-auth'


export default function ProductDetailsClient({ session, product }: { session: Session | null , product: Product }) {
  const dispatch = useAppDispatch();
  const [isExpaned, setIsExpaned] = useState(true);
  const [toast, setToast] = useState<{ show: boolean; message: string; type: 'success' | 'error'; }>({
    show: false, message: '', type: 'success'
  });

  const handleAddToCart = () => {
    if (session !== null && session !== undefined) {
      dispatch(addToCart(product))
      setToast({
        show: true,
        message: 'Item added to cart',
        type: 'success'
      });
    } else {
      setToast({
        show: true,
        message: `You must be logged in to add to cart`,
        type: 'error'
      });
    }
  }
  const handleDeleteProduct = async (id: string) => {
    if (session !== null && session !== undefined) {
      if (window.confirm('Are you sure you want to delete this product?')) {
        try {
          await api.delete(`/products/${id}`);
          setToast({
            show: true,
            message: 'Product successfully deleted',
            type: 'success'
          });
        } catch (error) {
          console.log('Failed to delete product:', error);
          setToast({
            show: true,
            message: 'Failed to delete product',
            type: 'error'
          });
        }
      }

    } else {
      setToast({
        show: true,
        message: `You must be logged in to delete a product`,
        type: 'error'
      });
    }
  };
  return (
    <div className={styles.container}>
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ ...toast, show: false })}
        />
      )}
      <Link href="/products" className={styles.backButton}>
        &larr; Back to Products
      </Link>
      <div className={styles.productCard}>
        <div className={styles.imageSection}>
          <Carousel
            showArrows={true}
            showStatus={false}
            showThumbs={false}
            infiniteLoop={true}
            className={styles.carousel}
            thumbWidth={100}
            preventMovementUntilSwipeScrollTolerance={true}
            swipeScrollTolerance={50}
            autoPlay={true}
            interval={2000}
            axis="horizontal"
            centerSlidePercentage={100}
            labels={{ leftArrow: "Previous slide", rightArrow: "Next slide", item: "Slide item" }}
          >
            {[...(product.image ? [product.image] : ["/placeholder.jpg"]), ...(product.images ?? [])].filter(Boolean).map((img, index) => (
              <div key={index} className={styles.imageContainer}>
                <Image
                  src={img}
                  alt={`${product.name} - Image ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{
                    objectFit: 'contain',
                    backgroundColor: '#1a1a1a'
                  }}
                  priority
                />
              </div>
            ))}
          </Carousel>
        </div>
        <div className={styles.details}>
          <h1 className={styles.title}>{product.name}</h1>
          <div className={styles.priceContainer}>
            <p className={styles.price}>${product.price}</p>
            <p className={styles.oldPrice}>${product.old_price}</p>
            <span className={styles.discount}>{product.discount}% OFF</span>
          </div>
          <p className={styles.description}>
            {isExpaned ? product.description.slice(0, 200) : product.description}&nbsp;
            <button className={styles.showLess}
              onClick={() => setIsExpaned(!isExpaned)}>{isExpaned ? 'ShowMore' : 'ShowLess'}</button>
          </p>
          <div className={styles.badges}>
            <span className={styles.badge}>Category: {product.category}</span>
          </div>
          <div className="buttons">
            <button
              className={"viewButton"}
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
            <button
              className={`deleteButton`}
              onClick={() => handleDeleteProduct(product.id)}
            >
              Delete Product
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
