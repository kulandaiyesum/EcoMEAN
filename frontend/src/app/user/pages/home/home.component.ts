import { ProductService } from '../../../services/product.service';
import { Component, OnInit, inject } from '@angular/core';
import { ProductComponent } from '../../components/product/product.component';
import { NgFor } from '@angular/common';
import Swal from 'sweetalert2';
import { Product } from '../../../model/product';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductComponent, NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  num = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  private productService = inject(ProductService);
  products: Product[] = [];
  loading: boolean = false;

  ngOnInit(): void {
    this.loading = true;
    this.getProducts();
    this.loading = false;
  }
  getProducts(): void {
    this.productService.getAllProducts().subscribe();
    this.productService.products$.subscribe((products) => {
      this.products = products;
    });
  }
}
