import { Product } from './product';

export interface orderDetails {
  address: string;
  orderProductQuantityList: OrderProductQuantityList[];
}
export interface OrderProductQuantityList {
  product: Product;
  queantity: number;
}

export interface Address {
  name: string;
  addresslineOne: string;
  addressLineTwo?: string; //optional
  street: string;
  phoneNumber: string;
  alternativePhoneNumber: string; //optional
  city: string;
  state: string;
  postalCode: string;
  landMark: string;
}
