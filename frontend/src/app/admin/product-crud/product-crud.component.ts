import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
  ReactiveFormsModule,
  FormArray,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { Category } from '../../model/category';
import { CategoryService } from '../../services/category.service';
import { CategoryCurdComponent } from '../category-curd/category-curd.component';
import { Product } from '../../model/product';
import { NgFor, NgIf } from '@angular/common';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-crud',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgFor],
  templateUrl: './product-crud.component.html',
  styleUrl: './product-crud.component.scss',
})
export class ProductCrudComponent {
  loader: boolean = false;
  productForm!: FormGroup;
  categories: Category[] = [];
  imagesArr!: FormArray;
  constructor(
    public dialogRef: MatDialogRef<CategoryCurdComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product | null,
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private productservice: ProductService
  ) {
    console.log('data', data);
  }
  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: [this.data?.name || '', Validators.required],
      actualPrice: [this.data?.actualPrice || 0, Validators.required],
      discountedPrice: [this.data?.discountedPrice || 0, Validators.required],
      brand: [this.data?.brand || '', Validators.required],
      category: [this.data?.category?._id || '', Validators.required],
      quantity: [this.data?.quantity || 0, Validators.required],
      description: [this.data?.description || '', Validators.required],
      images: this.fb.array([]),
    });
    this.categoryService.categories$.subscribe((val) => {
      this.categories = val;
      if (this.categories.length === 0) {
        this.categoryService.getAllcategories().subscribe();
      }
    });
    if (this.data) {
      this.imagesArr = this.productForm.get('images') as FormArray;
      this.data.images.forEach((image) =>
        this.imagesArr.push(this.fb.control(image))
      );
    }
  }

  get images() {
    return this.productForm.get('images') as FormArray;
  }
  addImageControl() {
    this.images.push(this.fb.control(''));
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  removeImage(index: number) {
    this.images.removeAt(index);
  }

  onSubmit() {
    const theme = localStorage.getItem('theme');
    this.loader = true;
    if (this.data) {
      const updateProduct: Product = {
        _id: this.data._id,
        name: this.productForm.value.name,
        actualPrice: this.productForm.value.actualPrice,
        discountedPrice: this.productForm.value.discountedPrice,
        brand: this.productForm.value.brand,
        category: this.productForm.value.category,
        quantity: this.productForm.value.quantity,
        description: this.productForm.value.description,
        images: this.productForm.value.images,
      };
      this.productservice.updateProduct(updateProduct).subscribe({
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
      this.loader = false;
    } else {
      console.log('add', this.productForm.value);
      this.loader = false;
      this.productservice.createProduct(this.productForm.value).subscribe({
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

  // submitCategory() {
  //   const theme = localStorage.getItem('theme');
  //   this.loader = true;
  //   if (this.data) {
  //     const category: Category = {
  //       _id: this.data._id,
  //       name: this.productForm.value.name,
  //       description: this.productForm.value.description,
  //       createdAt: this.data.createdAt,
  //     };
  //     // console.log('edit', category);
  //     this.categoryService.updateCategory(category).subscribe({
  //       next: (res: any) => {
  //         this.loader = false;
  //         this.dialogRef.close('success');
  //       },
  //       error: (err: HttpErrorResponse) => {
  //         this.loader = false;
  //         Swal.fire({
  //           title: 'Error!',
  //           html: `<span class='dark:text-white'>${err?.error?.message}</span>`,
  //           icon: 'error',
  //           confirmButtonText: 'Ok',
  //           customClass: {
  //             popup: theme === 'dark' ? '!bg-gray-700' : '!bg-gray-50',
  //             title: theme === 'dark' ? '!text-white' : '',
  //             confirmButton: '!bg-blue-600 !hover:bg-blue-700',
  //           },
  //         });
  //       },
  //     });
  //   } else {
  //     this.categoryService.createCategory(this.productForm.value).subscribe({
  //       next: (res: any) => {
  //         this.loader = false;
  //         this.dialogRef.close('success');
  //       },
  //       error: (err: HttpErrorResponse) => {
  //         this.loader = false;
  //         Swal.fire({
  //           title: 'Error!',
  //           html: `<span class='dark:text-white'>${err?.error?.message}</span>`,
  //           icon: 'error',
  //           confirmButtonText: 'Ok',
  //           customClass: {
  //             popup: theme === 'dark' ? '!bg-gray-700' : '!bg-gray-50',
  //             title: theme === 'dark' ? '!text-white' : '',
  //             confirmButton: '!bg-blue-600 !hover:bg-blue-700',
  //           },
  //         });
  //       },
  //     });
  //   }
  // }
}
