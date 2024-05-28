import { CartService } from './../../../services/cart.service';
import { Component, OnInit, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Product } from '../../../model/product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
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
  private productService = inject(ProductService);
  private cartService = inject(CartService);
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
    this.activatedRoute.paramMap.subscribe((params: any) => {
      const productId = params.get('id');
      if (productId) {
        this.productService.getProductById(productId).subscribe({
          next: (product: any) => {
            this.product = product;
            this.titleService.setTitle(`${product.name} - EcoMEAN`);
            console.log('product is :', this.product); // Setting the title without Title service
          },
          error: (err: HttpErrorResponse) => {
            const theme = localStorage.getItem('theme');
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
          },
        });
      }
    });
  }

  changeImageIndex(index: number): void {
    this.selectedProductImageIndex = index;
  }
  addToCart(productId?: string) {
    if (productId) this.cartService.addToCart(productId);
  }
}
