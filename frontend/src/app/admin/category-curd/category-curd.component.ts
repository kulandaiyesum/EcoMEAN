import { Category } from '../../model/category';
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryService } from '../../services/category.service';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category-curd',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './category-curd.component.html',
  styleUrl: './category-curd.component.scss',
})
export class CategoryCurdComponent implements OnInit {
  loader: boolean = false;
  categoryForm!: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<CategoryCurdComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Category | null,
    private fb: FormBuilder,
    private categoryService: CategoryService
  ) {}
  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      name: new FormControl(this.data?.name || '', [Validators.required]),
      description: new FormControl(this.data?.description || '', [
        Validators.required,
        Validators.maxLength(300),
      ]),
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  submitCategory() {
    const theme = localStorage.getItem('theme');
    this.loader = true;
    if (this.data) {
      const category: Category = {
        _id: this.data._id,
        name: this.categoryForm.value.name,
        description: this.categoryForm.value.description,
        createdAt: this.data.createdAt,
      };
      // console.log('edit', category);
      this.categoryService.updateCategory(category).subscribe({
        next: (res: any) => {
          this.loader = false;
          this.dialogRef.close('success');
        },
        error: (err: HttpErrorResponse) => {
          this.loader = false;
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
    } else {
      this.categoryService.createCategory(this.categoryForm.value).subscribe({
        next: (res: any) => {
          this.loader = false;
          this.dialogRef.close('success');
        },
        error: (err: HttpErrorResponse) => {
          this.loader = false;
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
    }
  }
}
