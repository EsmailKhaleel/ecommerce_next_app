import { notFound } from 'next/navigation';
import { auth } from '@/util/auth';
import { api } from '@/apiClient/apiClient';
import ProductDetailsClient from './product-details-client';
import { Product } from '@/types/product';

export default async function ProductDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  const { id } = await params;
  try {
    const product = await api.get<Product>(`/products/${id}`);
    console.log('Product Details from Server:', product);
    if (!product) {
      return notFound();
    }
    return <ProductDetailsClient product={product} session={session} />;
  } catch (error) {
    console.error('Failed to fetch product:', error);
    return notFound();
  }
}
