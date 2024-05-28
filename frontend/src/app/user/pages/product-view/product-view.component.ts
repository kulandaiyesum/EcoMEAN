import { CartService } from './../../../services/cart.service';
import { Component, OnInit, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Product } from '../../../model/product';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product-view',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './product-view.component.html',
  styleUrl: './product-view.component.scss',
})
export class ProductViewComponent implements OnInit {
  private titleService = inject(Title);
  private activatedRoute = inject(ActivatedRoute);
  private cartService = inject(CartService);
  private router = inject(Router);
  selectedProductImageIndex: number = 0;
  product: Product = {
    name: '',
    actualPrice: 0,
    discountedPrice: 0,
    brand: '',
    category: undefined,
    quantity: 0,
    description: '',
    images: [],
  };
  ngOnInit(): void {
    this.product = this.activatedRoute.snapshot.data['product'];
    this.titleService.setTitle(`${this.product.name} - EcoMEAN`);
  }

  changeImageIndex(index: number): void {
    this.selectedProductImageIndex = index;
  }
  addToCart(productId?: string) {
    if (productId) this.cartService.addToCart(productId);
  }
  buyProduct() {
    this.router.navigate([
      '/buyProduct',
      {
        isSingleProductCheckout: true,
        id: this.product._id,
      },
    ]);
  }
}
