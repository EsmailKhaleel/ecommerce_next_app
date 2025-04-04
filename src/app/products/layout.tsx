import ProductsLayoutClient from "./layout-client";
import { Suspense } from "react";
import Loading from "../loading";
import { Product } from "@/types/product";
import { api } from "@/apiClient/apiClient";
import ErrorComponent from "../error";

export default async function ProductsLayout({ children }: { children: React.ReactNode }) {
  try {
    const products = await api.get<Product[]>('/products');
    return (
      <Suspense fallback={<Loading />}>
        <ProductsLayoutClient products={products}>
          {children}
        </ProductsLayoutClient>
      </Suspense>
    );
  } catch (error: unknown) {
    console.log("Error fetching products:", error);
    return <ErrorComponent error={error}/>;
  }
}
