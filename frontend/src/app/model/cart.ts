import { Product } from "./product";

export interface CartProduct {
  product: Product;
  quantity: number;
}
export interface Cart {
  user: string; 
  products: CartProduct[];
}