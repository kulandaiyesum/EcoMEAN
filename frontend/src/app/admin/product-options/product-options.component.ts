import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Product } from '../../model/product';
import Swal from 'sweetalert2';
import { ProductService } from '../../services/product.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ProductCrudComponent } from '../product-crud/product-crud.component';

@Component({
  selector: 'app-product-options',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatMenuModule],
  templateUrl: './product-options.component.html',
  styleUrl: './product-options.component.scss',
})
export class ProductOptionsComponent {
  @Input({ required: true }) product!: Product;
  constructor(
    public dialog: MatDialog,
    private productService: ProductService
  ) {}
  editProduct() {
    const dialogOptions = {
      width: '700px',
      margin: '0 auto',
      data: this.product,
    };
    const dialogRef = this.dialog.open(ProductCrudComponent, dialogOptions);
  }
  deleteProduct() {
    const theme = localStorage.getItem('theme');
    Swal.fire({
      title: 'Are you sure to delete the category?',
      html: `<span class='dark:text-white'>${this.product.name}</span>`,
      icon: 'error',
      confirmButtonText: 'Yes',
      showDenyButton: true,
      denyButtonText: 'No',
      customClass: {
        popup: theme === 'dark' ? '!bg-gray-700' : '!bg-gray-50',
        title: theme === 'dark' ? '!text-white' : '',
        confirmButton: '!bg-blue-600 !hover:bg-blue-700',
        denyButton: theme === 'dark' ? '!bg-red-600' : '!bg-red-700',
      },
    }).then((res) => {
      if (res.isConfirmed) {
        if (this.product._id) {
          this.productService.deleteProduct(this.product._id).subscribe();
        } else {
          console.log(
            'somithing is wrong, category id is not identified',
            this.product._id
          );
        }
      }
    });
  }
}
