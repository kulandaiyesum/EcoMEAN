import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { Product } from '../model/product';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiEndPoint: string = environment.apiUrl;
  private productsSubject: BehaviorSubject<Product[]> = new BehaviorSubject<
    Product[]
  >([]);
  public readonly products$ = this.productsSubject.asObservable();

  constructor(private http: HttpClient) {}

  getAllProducts() {
    return this.http.get(`${this.apiEndPoint}/products/all`).pipe(
      tap((res: any) => {
        this.productsSubject.next(res as Product[]);
      })
    );
  }
  getProductById(productId: string) {
    return this.http.get(`${this.apiEndPoint}/products/${productId}`);
  }

  createProduct(product: Product) {
    return this.http.post(`${this.apiEndPoint}/products`, product).pipe(
      tap((createdProduct: any) => {
        this.productsSubject.next([
          ...this.productsSubject.getValue(),
          createdProduct,
        ]);
      })
    );
  }
  createbulkProducts(products: Product[]) {
    return this.http.post(`${this.apiEndPoint}/products/bulk`, products).pipe(
      tap((createdProducts: any) => {
        this.productsSubject.next([
          ...this.productsSubject.getValue(),
          ...createdProducts,
        ]);
      })
    );
  }
  updateProduct(product: Product) {
    return this.http
      .put(`${this.apiEndPoint}/products/${product._id}`, product)
      .pipe(
        tap((updatedProduct: any) => {
          const updatedProducts = this.productsSubject
            .getValue()
            .map((p: Product) =>
              p._id === updatedProduct._id ? updatedProduct : p
            );
          this.productsSubject.next(updatedProducts);
        })
      );
  }
  deleteProduct(productId: string) {
    return this.http.delete(`${this.apiEndPoint}/products/${productId}`).pipe(
      tap(() => {
        const updatedProducts = this.productsSubject
          .getValue()
          .filter((p: Product) => p._id !== productId);
        this.productsSubject.next(updatedProducts);
      })
    );
  }
}
