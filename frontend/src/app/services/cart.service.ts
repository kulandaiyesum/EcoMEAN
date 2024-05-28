import { Injectable, OnDestroy, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject, shareReplay, takeUntil, tap } from 'rxjs';
import { Product } from '../model/product';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class CartService implements OnDestroy {
  private readonly apiEndPoint: string = environment.apiUrl;
  private http = inject(HttpClient);
  private unsubscribe$ = new Subject<void>();

  private cartSubject = new BehaviorSubject<Product[]>([]);
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
          this.cartSubject.next((data.products as Product[]) || []);
        },
        error: (err: any) => {
          if (err?.error?.message) {
            Swal.fire({
              title: 'Error!',
              html: `<span class='dark:text-white'>${err?.error?.message}</span>`,
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
        },
      });
  }

  addToCart(productId: string) {
    const theme = localStorage.getItem('theme');
    return this.http
      .post(this.apiEndPoint + '/cart', { productId })
      .pipe(shareReplay(1), takeUntil(this.unsubscribe$))
      .subscribe({
        next: (res: any) => {
          const newProduct = res.product;
          const curentCartItems = this.cartSubject.getValue();
          const updatedCartItems = [...curentCartItems, newProduct];
          this.cartSubject.next(updatedCartItems);
        },
        error: (err: any) => {
          if (err?.error?.message) {
            Swal.fire({
              title: 'Error!',
              html: `<span class='dark:text-white'>${err?.error?.message}</span>`,
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
            .filter((p) => p._id !== productId);
          this.cartSubject.next(updatedCart);
        },
        error: (err: any) => {
          if (err?.error?.message) {
            Swal.fire({
              title: 'Error!',
              html: `<span class='dark:text-white'>${err?.error?.message}</span>`,
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
        },
      });
  }
}
