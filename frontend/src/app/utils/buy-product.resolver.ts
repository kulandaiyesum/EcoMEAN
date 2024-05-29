import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Observable } from 'rxjs';
import { Product } from '../model/product';

export const buyProductResolver: ResolveFn<
  Product[] | Observable<Product[]> | Object
> = (route, state) => {
  const productService = inject(ProductService);
  const isSingleProductCheckout =
    route.paramMap.get('isSingleProductCheckout') === 'true';
  const id = route.paramMap.get('id') || null;
  if (isSingleProductCheckout === true) {
    return productService.getProductDetails(isSingleProductCheckout, id);
  }
  return null as unknown as Object;
};
