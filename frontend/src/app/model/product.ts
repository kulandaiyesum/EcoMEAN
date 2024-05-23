import { Category } from './category';

export interface Product {
  _id?: string;
  name: string;
  actualPrice: number;
  discountedPrice: number;
  brand: string;
  category: Category | any;
  quantity: number;
  description: string;
  images: string[];
}
