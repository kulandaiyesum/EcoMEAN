import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../../model/product';

@Component({
  selector: 'app-buy-product',
  standalone: true,
  imports: [],
  templateUrl: './buy-product.component.html',
  styleUrl: './buy-product.component.scss',
})
export class BuyProductComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  productDetails: Product[] = [];
  isSingleProductCheckout: any;

  ngOnInit(): void {
    this.productDetails = this.activatedRoute.snapshot.data['productDetails'];
    this.isSingleProductCheckout = this.activatedRoute.snapshot.paramMap.get(
      'isSingleProductCheckout'
    );
    console.log(
      'this.isSingleProductCheckout',
      this.isSingleProductCheckout,
      'productDetails',
      this.productDetails
    );
  }
}
