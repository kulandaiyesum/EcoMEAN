import { Product } from './product';

export interface orderDetails {
  _id?:string;
  user?:string;
  address: string;
  productQuantityList: ProductQuantityList[];
  totalPrice: number;
  paymentId: string
}
export interface ProductQuantityList {
  _id?:string;
  product: Product;
  queantity: number;
}