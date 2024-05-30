import { CartProduct } from './cart';

export interface OrderDetails {
  _id?: string;
  user?: string;
  address: string;
  products: CartProduct[];
  totalPrice: number;
  paymentId: string;
  status?: string;
}
