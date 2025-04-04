export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    old_price: number;
    discount: number;
    category: string;
    image: string;
    images?: string[];
  }