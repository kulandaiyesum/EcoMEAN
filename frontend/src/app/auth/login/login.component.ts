import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
import { UserAuthService } from '../../services/user-auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, NgIf, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private authService = inject(AuthService);
  private route = inject(Router);
  private userAuthService = inject(UserAuthService);
  onSubmit(form: NgForm) {
    const theme = localStorage.getItem('theme');
    if (form.valid) {
      this.authService.login(form.value).subscribe({
        next: (res: any) => {
          this.userAuthService.setToken(res?.token);
          this.userAuthService.setRole(res?.role);
          const role = res.role;
          if (role === 'ADMIN') {
            this.route.navigate(['admin']);
          } else {
            this.route.navigate(['home']);
          }
          this.userAuthService.getUserByToken();
        },
        error: (err: HttpErrorResponse) => {
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
    } else {
      Swal.fire({
        title: 'Error!',
        html: `<span class='dark:text-white'>Form is invalid</span>`,
        icon: 'error',
        confirmButtonText: 'Ok',
        customClass: {
          popup: theme === 'dark' ? '!bg-gray-700' : '!bg-gray-50',
          title: theme === 'dark' ? '!text-white' : '',
          confirmButton: '!bg-blue-600 !hover:bg-blue-700',
        },
      });
    }
  }
}
