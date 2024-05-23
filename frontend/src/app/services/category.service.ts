import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { Category } from '../model/category';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private http = inject(HttpClient);
  private apiEndPoint: string = environment.apiUrl;
  private categorySubject = new BehaviorSubject<Category[]>([]);
  categories$ = this.categorySubject.asObservable();

  constructor() {}

  getAllcategories() {
    return this.http.get(`${this.apiEndPoint}/categories`).pipe(
      tap((res: any) => {
        this.categorySubject.next(res);
      })
    );
  }

  createCategory(category: Category) {
    return this.http.post(`${this.apiEndPoint}/category`, category).pipe(
      tap((res: any) => {
        const currentCategories = this.categorySubject.getValue();
        this.categorySubject.next([...currentCategories, res]);
      })
    );
  }

  updateCategory(category: Category) {
    return this.http
      .put(`${this.apiEndPoint}/category/${category._id}`, category)
      .pipe(
        tap((res: any) => {
          const currentCategories = this.categorySubject.getValue();
          const updatedCategory = currentCategories.map((c) => {
            if (c._id === res._id) {
              return res;
            }
            return c;
          });
          this.categorySubject.next(updatedCategory);
        })
      );
  }

  deleteCategory(catId: string) {
    return this.http.delete(`${this.apiEndPoint}/category/${catId}`).pipe(
      tap((_) => {
        const currentCategories = this.categorySubject.getValue();
        const updatedCategory = currentCategories.filter(
          (c) => c._id !== catId
        );
        this.categorySubject.next(updatedCategory);
      })
    );
  }
}
