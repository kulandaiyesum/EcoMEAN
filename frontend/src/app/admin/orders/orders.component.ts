import { Component, OnInit, inject } from '@angular/core';
import { OrderDetails } from '../../model/orderDetails';
import { AdminService } from '../../services/admin.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
export class OrdersComponent implements OnInit {
  orders: OrderDetails[] = [];
  private adminService = inject(AdminService);
  selectedOrder!: OrderDetails | null;

  ngOnInit(): void {
    this.adminService.getOrders();
    this.adminService.orderData$.subscribe((orders) => (this.orders = orders));
  }
  markAsDelivered(item: OrderDetails) {
    console.log(item, 'asjbjhb');
    if (item._id) this.adminService.markAsDelivered(item._id);
  }
  view(item: OrderDetails) {
    this.selectedOrder = item;
  }
}
