import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';
import { User } from '../model/user';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  private readonly apiEndPoint: string = environment.apiUrl;
  private http = inject(HttpClient);
  setUser(res: User): void {
    localStorage.setItem('user', JSON.stringify(res));
  }

  getUser(): User | null {
    return JSON.parse(localStorage.getItem('user') as string);
  }
  public getRole(): string | null {
    const user = this.getUser();
    if (!user) return null;
    return user.role;
  }

  public roleMatch(allowedRole: string): any {
    let isMatch = false;
    const userRole: string | null = this.getRole() ? this.getRole() : null;
    if (userRole !== null && userRole === allowedRole) {
      isMatch = true;
      return isMatch;
    } else {
      return isMatch;
    }
  }

  public isAdmin() {
    const role = this.getRole() ? this.getRole() : null;
    return role === 'ADMIN';
  }
  public isUser() {
    const role = this.getRole() ? this.getRole() : null;
    return role === 'USER';
  }

  logout() {
    const theme = localStorage.getItem('theme');
    this.http.post(this.apiEndPoint + '/logout', {}).subscribe({
      next: (res: any) => {
        localStorage.removeItem('user');
        // Swal.fire({
        //   title: 'Logout',
        //   html: `<span class='dark:text-white'>${res?.message}</span>`,
        //   icon: 'success',
        //   confirmButtonText: 'Ok',
        //   confirmButtonColor: '#1d4ed8',
        //   customClass: {
        //     popup: theme === 'dark' ? '!bg-gray-700' : '!bg-gray-50',
        //     title: theme === 'dark' ? '!text-white' : '',
        //     confirmButton: '!bg-blue-600 !hover:bg-blue-700',
        //   },
        // });
      },
      error: (err: any) => {
        Swal.fire({
          title: 'Error!',
          html: `<span class='dark:text-white'>${err?.error?.message}</span>`,
          icon: 'error',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#1d4ed8',
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
