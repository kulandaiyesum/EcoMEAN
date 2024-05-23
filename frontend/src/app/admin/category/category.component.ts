import { Component, OnInit } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { CategoryCurdComponent } from '../category-curd/category-curd.component';
import { CategoryService } from '../../services/category.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgFor } from '@angular/common';
import { Category } from '../../model/category';
import { CategoryOptionsComponent } from '../category-options/category-options.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [NgFor, CategoryOptionsComponent],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss',
})
export class CategoryComponent implements OnInit {
  categories: Category[] = [];
  constructor(
    public dialog: MatDialog,
    private categoryService: CategoryService
  ) {}
  ngOnInit(): void {
    this.getCategories();
  }

  addCategory() {
    const dialogOptions = {
      width: '450px',
      margin: '0 auto',
    };
    const dialogRef = this.dialog.open(CategoryCurdComponent, dialogOptions);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getCategories();
      } else {
        return;
      }
    });
  }

  getCategories() {
    const theme = localStorage.getItem('theme');
    this.categoryService.getAllcategories().subscribe({
      next: (val: any) => {
        // console.log(val);
        // this.categories = val;
      },
      error: (err: HttpErrorResponse) => {
        // console.log(err?.error?.message);
        Swal.fire({
          title: 'Error!',
          html: `<span class='dark:text-white'>${err?.error?.message}</span>`,
          icon: 'error',
          confirmButtonText: 'Ok',
          customClass: {
            popup: theme === 'dark' ? '!bg-gray-700' : '!bg-gray-50',
            title: theme === 'dark' ? '!text-white' : '',
            confirmButton: '!bg-blue-600 !hover:bg-blue-700',
          },
        });
      },
    });
    this.categoryService.categories$.subscribe((val) => {
      this.categories = val;
    });
  }
}
