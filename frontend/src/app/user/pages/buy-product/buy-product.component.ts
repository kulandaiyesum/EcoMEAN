import { OrderDetails } from './../../../model/orderDetails';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AddressService } from '../../../services/address.service';
import { Address } from '../../../model/address';
import { Subject, takeUntil } from 'rxjs';
import { CurrencyPipe } from '@angular/common';
import { CartProduct } from '../../../model/cart';
import { CartService } from '../../../services/cart.service';
import { PaymentService } from '../../../services/payment.service';
import { environment } from '../../../../environments/environment';
import { UserAuthService } from '../../../services/user-auth.service';
import { User } from '../../../model/user';

declare var Razorpay: any;

@Component({
  selector: 'app-buy-product',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CurrencyPipe, FormsModule],
  templateUrl: './buy-product.component.html',
  styleUrl: './buy-product.component.scss',
})
export class BuyProductComponent implements OnInit, OnDestroy {
  private rezorPayKey: string = environment.razorpayKeyId;
  private activatedRoute = inject(ActivatedRoute);
  private fb = inject(FormBuilder);
  private addressService = inject(AddressService);
  private unsubscribe$ = new Subject<void>();
  private cartService = inject(CartService);
  private paymentService = inject(PaymentService);
  private userAuthService = inject(UserAuthService);
  private router = inject(Router);
  addressForm!: FormGroup;
  addresses: Address[] = [];
  productDetails: CartProduct[] = [];
  isSingleProductCheckout: any;
  orderDetails: OrderDetails = {
    address: '',
    products: [],
    totalPrice: 0,
    paymentId: '',
  };
  discountedPrice: number = 0;
  actualPrice: number = 0;
  selectedAddress!: Address;
  user: User | null = null;

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
  selectAddress(address: Address): void {
    this.selectedAddress = address;
  }

  ngOnInit(): void {
    this.user = this.userAuthService.getUser();
    this.isSingleProductCheckout = this.activatedRoute.snapshot.paramMap.get(
      'isSingleProductCheckout'
    );
    if (this.isSingleProductCheckout === 'true') {
      this.productDetails = this.activatedRoute.snapshot.data['productDetails'];
    } else {
      this.cartService.cartData$
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((data) => {
          this.productDetails = data;
        });
    }
    this.intializeForm();
    this.addressService.getAllAddress();
    this.addressService.addressData$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.addresses = data;
        if (
          !this.selectedAddress &&
          this.addresses &&
          this.addresses.length > 0
        ) {
          this.selectedAddress = this.addresses[0];
        }
      });
  }
  intializeForm() {
    this.addressForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
      addresslineOne: new FormControl('', [Validators.required]),
      addressLineTwo: new FormControl(''), //optional
      phoneNumber: new FormControl('', [Validators.required]),
      alternativePhoneNumber: new FormControl(''), //optional
      city: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      postalCode: new FormControl('', [Validators.required]),
      landMark: new FormControl(''), //optional
      addressType: new FormControl('', [Validators.required]),
    });
  }

  calculateActualPrice() {
    if (
      this.isSingleProductCheckout &&
      this.productDetails &&
      this.productDetails.length > 0
    ) {
      return this.productDetails.reduce(
        (total, item) => total + item.product.actualPrice * item.quantity,
        0
      );
    } else {
      return this.cartService.calculateActualPrice();
    }
  }
  calculateDiscontedPrice() {
    if (
      this.isSingleProductCheckout &&
      this.productDetails &&
      this.productDetails.length > 0
    ) {
      return this.productDetails.reduce(
        (total, item) => total + item.product.discountedPrice * item.quantity,
        0
      );
    } else {
      return this.cartService.calculateDiscontedPrice();
    }
  }

  submitAddress() {
    console.log(this.addressForm.value);
    this.addressService.addNewAddress(this.addressForm.value);
    this.addressForm.reset();
  }

  proceedPayment() {
    const amount = this.calculateDiscontedPrice();
    this.paymentService.createOrder(amount).subscribe({
      next: (order: any) => {
        const options = {
          key: this.rezorPayKey,
          amount: order.amount,
          currency: order.currency,
          name: 'EcoMEAN',
          description: 'Test Transaction',
          order_id: order.id,
          handler: (response: any) => {
            this.verifyPayment(response, order.id);
          },
          prefill: {
            name: this.selectedAddress.name,
            email: this.user ? this.user.email : '',
            contact: this.selectedAddress.phoneNumber,
          },
          modal: {
            escape: false,
          },
          notes: {
            address: JSON.stringify(this.selectedAddress),
          },
          theme: {
            color: '#2563EB',
          },
        };
        const razorpay = new Razorpay(options);
        razorpay.open();
      },
      error: (error: any) => {
        console.error('Error creating order', error);
      },
    });
  }
  verifyPayment(response: any, orderId: string) {
    this.orderDetails.address = this.selectedAddress._id || '';
    this.orderDetails.paymentId = response.razorpay_payment_id;
    this.orderDetails.products = this.productDetails;
    this.orderDetails.totalPrice = this.calculateDiscontedPrice();
    this.paymentService
      .placeOrder(
        this.orderDetails,
        this.isSingleProductCheckout,
        response,
        orderId
      )
      .subscribe({
        next: (res: any) => {
          console.log('Order res', res);
          this.router.navigate(['/success'])
          if(this.isSingleProductCheckout === 'ture'){
            this.cartService.getCartDetails();
          }
        },
        error: (err: any) => {
          console.log('order error', err);
          this.router.navigate(['/failure'])
        },
      });
  }
}
