import { Component, OnInit, inject } from '@angular/core';
import { ProductsComponent } from '../products/products.component';
import { CategoryComponent } from '../category/category.component';
import { CategoryService } from '../../services/category.service';
import { ProductService } from '../../services/product.service';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ProductsComponent, CategoryComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  private categotyServie = inject(CategoryService);
  private productService = inject(ProductService);
  private adminService = inject(AdminService);
  categoryCount: number = 0;
  productCount: number = 0;
  orderCount: number = 0;
  userCount: number = 0;

  ngOnInit(): void {
    this.categotyServie.categories$.subscribe((categories) => {
      this.categoryCount = categories.length;
    });
    this.productService.products$.subscribe((products) => {
      this.productCount = products.length;
    });
    this.adminService.getAllUsers();
    this.adminService.getOrders();
    this.adminService.userData$.subscribe((userData) => {
      this.userCount = userData.length;
    });
    this.adminService.orderData$.subscribe((orderData) => {
      const orders = orderData;
      const placedOrders = orders.filter((order) => order.status === 'placed');
      this.orderCount = placedOrders.length;
    });
  }
}
