import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { OrderDetails } from '../model/orderDetails';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private http = inject(HttpClient);
  private readonly apiEndPoint: string = environment.apiUrl;

  constructor() {}

  createOrder(amount: number) {
    return this.http.post(`${this.apiEndPoint}/create-order`, { amount });
  }

  placeOrder(
    orderDetails: OrderDetails,
    isSingleProductCheckout: boolean,
    checkoutResponse: any,
    order_id: string
  ) {
    return this.http.post(`${this.apiEndPoint}/verify-order`, {
      order: orderDetails,
      razorpay_signature: checkoutResponse.razorpay_signature,
      original_order_id: order_id,
      isSingleProductCheckout,
    });
  }
}
