import { Component, Input, OnDestroy, inject } from '@angular/core';
import { Product } from '../../../model/product';
import { CurrencyPipe, DecimalPipe, NgOptimizedImage } from '@angular/common';
import { CartService } from '../../../services/cart.service';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Subject, takeUntil } from 'rxjs';
import { UserAuthService } from '../../../services/user-auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CurrencyPipe, NgOptimizedImage, DecimalPipe, RouterLink],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent implements OnDestroy {
  @Input({ required: true }) product!: Product;
  private cartService = inject(CartService);
  private destroy$ = new Subject<void>();
  private userAuthService = inject(UserAuthService);
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  isUser(): boolean {
    return this.userAuthService.isUser();
  }

  addToCart() {
    if (this.product._id) this.cartService.addToCart(this.product._id);
  }
}
