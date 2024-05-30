import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { Subject, takeUntil } from 'rxjs';
import { Product } from '../../../model/product';
import { Router, RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { CartProduct } from '../../../model/cart';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit, OnDestroy {
  private cartService = inject(CartService);
  private destroy$ = new Subject<void>();
  private router = inject(Router);
  cartProducts: CartProduct[] = [];
  ngOnInit(): void {
    this.cartService.cartData$
      .pipe(takeUntil(this.destroy$))
      .subscribe((products) => {
        this.cartProducts = products;
      });
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  calculateDiscontedPrice(): number {
    return this.cartService.calculateDiscontedPrice();
  }
  calculateActualPrice(): number {
    return this.cartService.calculateActualPrice();
  }

  removeFromCart(id?: string): void {
    if (id) this.cartService.removeFromCart(id);
  }
  increseQantity(item: CartProduct) {
    if (item.product._id)
      if (item.quantity === 5) return;
      else this.cartService.addToCart(item.product._id, 1, 'increment');
  }
  decreseQantity(item: CartProduct) {
    if (item.product._id)
      if (item.quantity === 1) return;
      else this.cartService.addToCart(item.product._id, -1, 'increment');
  }
  buyProduct() {
    this.router.navigate([
      '/buyProduct',
      {
        isSingleProductCheckout: false,
      },
    ]);
  }
}
