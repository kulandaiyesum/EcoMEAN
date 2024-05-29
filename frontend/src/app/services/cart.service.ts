import { Injectable, OnDestroy, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject, shareReplay, takeUntil, tap } from 'rxjs';
import { Product } from '../model/product';
import Swal from 'sweetalert2';
import { CartProduct } from '../model/cart';

@Injectable({
  providedIn: 'root',
})
export class CartService implements OnDestroy {
  private readonly apiEndPoint: string = environment.apiUrl;
  private http = inject(HttpClient);
  private unsubscribe$ = new Subject<void>();

  private cartSubject = new BehaviorSubject<CartProduct[]>([]);
  public readonly cartData$ = this.cartSubject.asObservable();

  constructor() {}

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getCartDetails() {
    const theme = localStorage.getItem('theme');
    this.http
      .get(`${this.apiEndPoint}/cart`)
      .pipe(shareReplay(1), takeUntil(this.unsubscribe$))
      .subscribe({
        next: (data: any) => {
          this.cartSubject.next((data.products as CartProduct[]) || []);
        },
        error: (err: any) => {
          if (err?.error?.message) {
            this.showError(err.error.message, theme);
          }
        },
      });
  }

  addToCart(
    productId: string,
    quantity: number = 1,
    updateType: 'increment' | 'absolute'
  ) {
    const theme = localStorage.getItem('theme');
    return this.http
      .post(this.apiEndPoint + '/cart', { productId, quantity, updateType })
      .pipe(shareReplay(1), takeUntil(this.unsubscribe$))
      .subscribe({
        next: (res: any) => {
          const newProduct = res.product;
          const currentCartItems = this.cartSubject.getValue();

          const productIndex = currentCartItems.findIndex(
            (item) => item.product._id === newProduct.product._id
          );

          if (productIndex > -1) {
            currentCartItems[productIndex].quantity = newProduct.quantity;
          } else {
            const updatedCartItems = [...currentCartItems, newProduct];
            this.cartSubject.next(updatedCartItems);
          }
          // this.showSuccess(res.message, theme);
        },
        error: (err: any) => {
          if (err?.error?.message) {
            this.showError(err.error.message, theme);
          }
        },
      });
  }

  removeFromCart(productId: string) {
    const theme = localStorage.getItem('theme');
    return this.http
      .delete<void>(`${this.apiEndPoint}/cart/${productId}`)
      .pipe(shareReplay(1), takeUntil(this.unsubscribe$))
      .subscribe({
        next: (res: any) => {
          const updatedCart = this.cartSubject
            .getValue()
            .filter((p) => p.product._id !== productId);
          this.cartSubject.next(updatedCart);
        },
        error: (err: any) => {
          if (err?.error?.message) {
            this.showError(err.error.message, theme);
          }
        },
      });
  }

  calculateDiscontedPrice(): number {
    const cartItems = this.cartSubject.getValue();
    return cartItems.reduce(
      (total, item) => total + item.product.discountedPrice * item.quantity,
      0
    );
  }
  calculateActualPrice(): number {
    const cartItems = this.cartSubject.getValue();
    return cartItems.reduce(
      (total, item) => total + item.product.actualPrice * item.quantity,
      0
    );
  }

  private showError(message: string, theme: string | null) {
    Swal.fire({
      title: 'Error!',
      html: `<span class='dark:text-white'>${message}</span>`,
      icon: 'error',
      confirmButtonText: 'Ok',
      confirmButtonColor: '#1d4ed8',
      customClass: {
        popup: theme === 'dark' ? '!bg-gray-700' : '!bg-gray-50',
        title: theme === 'dark' ? '!text-white' : '',
        confirmButton: '!bg-blue-600 !hover:bg-blue-700',
      },
    });
  }

  private showSuccess(message: string, theme: string | null) {
    Swal.fire({
      title: 'Success',
      html: `<span class='dark:text-white'>${message}</span>`,
      icon: 'success',
      confirmButtonText: 'Ok',
      confirmButtonColor: '#1d4ed8',
      customClass: {
        popup: theme === 'dark' ? '!bg-gray-700' : '!bg-gray-50',
        title: theme === 'dark' ? '!text-white' : '',
        confirmButton: '!bg-blue-600 !hover:bg-blue-700',
      },
    });
  }
}
