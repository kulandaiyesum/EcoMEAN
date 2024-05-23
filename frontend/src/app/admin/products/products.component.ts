import { Component, OnInit, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Product } from '../../model/product';
import { ProductOptionsComponent } from '../product-options/product-options.component';
import { MatDialog } from '@angular/material/dialog';
import { ProductCrudComponent } from '../product-crud/product-crud.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [NgIf, ProductOptionsComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  productService = inject(ProductService);
  products: Product[] = [];
  constructor(public dialog: MatDialog) {}
  ngOnInit(): void {
    this.productService.getAllProducts().subscribe();
    this.getProducts();
  }

  getProducts() {
    this.productService.products$.subscribe({
      next: (val: Product[]) => {
        this.products = val;
        console.log(this.products);
      },
    });
  }
  addProduct() {
    const dialogOptions = {
      width: '700px',
      margin: '0 auto',
    };
    const dialogRef = this.dialog.open(ProductCrudComponent, dialogOptions);
  }
}
