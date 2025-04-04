import React, { Suspense } from 'react'
import Loading from '../loading'
import ProductsList from '@/components/products-list/products-list'
import ErrorComponent from '../error';
import { api } from '@/apiClient/apiClient';
import { Product } from '@/types/product';
import { auth } from '@/util/auth';

export default async function ProductsPage() {
  const session = await auth();
  try {
    const products = await api.get<Product[]>('/products');
    console.log("Products fetched from serever");
    return (
      <Suspense fallback={<Loading />}>
        <ProductsList products={products} session={session} />
      </Suspense>
    );
  } catch (error: unknown) {
    console.log("Error fetching products:", error);
    return <ErrorComponent error={error} />;
  }
}
