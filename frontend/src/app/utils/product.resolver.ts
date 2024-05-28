import { of } from 'rxjs';
import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../model/product';

export const productResolver: ResolveFn<Object> = (route, state) => {
  const productService = inject(ProductService);
  const id = route.paramMap.get('id');
  if (id) {
    return productService.getProductById(id);
  } else {
    return of(null as unknown as Product);
  }
};
