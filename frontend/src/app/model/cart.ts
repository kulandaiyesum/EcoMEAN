import { Product } from './product';

export interface CartProduct {
  _id?: string;
  product: Product;
  quantity: number;
}
export interface Cart {
  user: string;
  products: CartProduct[];
}
