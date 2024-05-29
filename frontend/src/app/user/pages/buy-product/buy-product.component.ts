import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Product } from '../../../model/product';
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
import { orderDetails } from '../../../model/orderDetails';
import { CurrencyPipe } from '@angular/common';
import { CartProduct } from '../../../model/cart';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-buy-product',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CurrencyPipe, FormsModule],
  templateUrl: './buy-product.component.html',
  styleUrl: './buy-product.component.scss',
})
export class BuyProductComponent implements OnInit, OnDestroy {
  private activatedRoute = inject(ActivatedRoute);
  private fb = inject(FormBuilder);
  private addressService = inject(AddressService);
  private unsubscribe$ = new Subject<void>();
  private cartService = inject(CartService);
  addressForm!: FormGroup;
  addresses: Address[] = [];
  productDetails: CartProduct[] = [];
  isSingleProductCheckout: any;
  orderDetails: orderDetails = {
    address: '',
    productQuantityList: [],
    totalPrice: 0,
    paymentId: '',
  };
  discountedPrice: number = 0;
  actualPrice: number = 0;

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
  selectedAddress(i: number, address: Address) {
    console.log('lll', address._id, '222', i);
  }

  ngOnInit(): void {
    this.productDetails = this.activatedRoute.snapshot.data['productDetails'];
    this.isSingleProductCheckout = this.activatedRoute.snapshot.paramMap.get(
      'isSingleProductCheckout'
    );
    console.log(
      'isSingleProductcheckout',
      this.isSingleProductCheckout,
      'productDetails',
      this.productDetails
    );

    this.intializeForm();
    this.addressService.getAllAddress();
    this.addressService.addressData$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.addresses = data;
      });

    // if (
    //   this.isSingleProductCheckout &&
    //   this.productDetails &&
    //   this.productDetails.length > 0
    // ) {
    //   this.actualPrice = this.productDetails.reduce(
    //     (total, item) => total + item.product.actualPrice * item.quantity,
    //     0
    //   );
    //   this.discountedPrice = this.productDetails.reduce(
    //     (total, item) => total + item.product.discountedPrice * item.quantity,
    //     0
    //   );
    // } else {
    //   this.actualPrice = this.cartService.calculateActualPrice();
    //   this.discountedPrice = this.cartService.calculateDiscontedPrice();
    // }
    // console.log(
    //   `Actual Price: ${this.actualPrice}, discount Price: ${this.discountedPrice}`
    // );
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
}
