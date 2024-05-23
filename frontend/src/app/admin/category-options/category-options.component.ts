import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Category } from '../../model/category';
import { CategoryCurdComponent } from '../category-curd/category-curd.component';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-category-options',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatMenuModule],
  templateUrl: './category-options.component.html',
  styleUrl: './category-options.component.scss',
})
export class CategoryOptionsComponent {
  @Input({ required: true }) category!: Category;
  constructor(
    public dialog: MatDialog,
    private categoryService: CategoryService
  ) {}
  editCategory() {
    // console.log(this.category);
    const dialogOptions = {
      width: '450px',
      margin: '0 auto',
      data: this.category,
    };
    const dialogRef = this.dialog.open(CategoryCurdComponent, dialogOptions);

    // dialogRef.afterClosed().subscribe((result: any) => {
    //   if (result) {
    //     console.log(result);
    //   } else {
    //     return;
    //   }
    // });
  }
  deleteCategory() {
    const theme = localStorage.getItem('theme');
    Swal.fire({
      title: 'Are you sure to delete the category?',
      html: `<span class='dark:text-white'>${this.category.name}</span>`,
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
        // this.options.emit('delete')
        console.log(res, 'res del');
        if (this.category._id) {
          this.categoryService.deleteCategory(this.category._id).subscribe();
        } else {
          console.log(
            'somithing is wrong, category id is not identified',
            this.category._id
          );
        }
      }
    });
  }
}
