import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { Subject, takeUntil } from 'rxjs';
import { Product } from '../../../model/product';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit, OnDestroy {
  num: number[] = [1, 2];
  private cartService = inject(CartService);
  private destroy$ = new Subject<void>();
  products: Product[] = [];
  ngOnInit(): void {
    this.cartService.cartData$
      .pipe(takeUntil(this.destroy$))
      .subscribe((products) => {
        this.products = products;
      });
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  removeFromCart(id?: string): void {
    if (id) this.cartService.removeFromCart(id);
  }
}
