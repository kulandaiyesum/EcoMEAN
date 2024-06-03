import { Injectable, OnDestroy, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject, shareReplay, takeUntil } from 'rxjs';
import { User } from '../model/user';
import { OrderDetails } from '../model/orderDetails';

@Injectable({
  providedIn: 'root',
})
export class AdminService implements OnDestroy {
  private readonly apiEndpoint: string = environment.apiUrl;
  private http = inject(HttpClient);
  private userSubject = new BehaviorSubject<User[]>([]);
  userData$ = this.userSubject.asObservable();
  private unsubscribe$ = new Subject<void>();
  private orderSubject = new BehaviorSubject<OrderDetails[]>([]);
  orderData$ = this.orderSubject.asObservable();

  constructor() {}
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getAllUsers() {
    this.http
      .get(`${this.apiEndpoint}/user/all`)
      .pipe(shareReplay(1), takeUntil(this.unsubscribe$))
      .subscribe({
        next: (data: any) => {
          this.userSubject.next(data);
        },
        error: (err: any) => {
          if (err?.error?.message) {
            // this.showError(err.error.message, theme);
          }
        },
      });
  }

  getOrders() {
    this.http
      .get(`${this.apiEndpoint}/order`)
      .pipe(shareReplay(1), takeUntil(this.unsubscribe$))
      .subscribe({
        next: (data: any) => {
          this.orderSubject.next(data);
        },
        error: (err: any) => {
          if (err?.error?.message) {
            // this.showError(err.error.message, theme);
          }
        },
      });
  }

  markAsDelivered(orderId: string) {
    this.http
      .put(`${this.apiEndpoint}/order`, { orderId })
      .pipe(shareReplay(1), takeUntil(this.unsubscribe$))
      .subscribe({
        next: (data: any) => {
          const currentOrders = this.orderSubject.getValue();
          const updatedOrders = currentOrders.map((order) => {
            if (order._id === data?._id) {
              return data;
            } else {
              return order;
            }
          });
          this.orderSubject.next(updatedOrders);
        },
        error: (err: any) => {
          if (err?.error?.message) {
            // this.showError(err.error.message, theme);
          }
        },
      });
  }
}
