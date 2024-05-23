import { JsonPipe, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgotpassword',
  standalone: true,
  imports: [RouterLink, FormsModule, NgIf],
  templateUrl: './forgotpassword.component.html',
  styleUrl: './forgotpassword.component.scss',
})
export class ForgotpasswordComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  onSubmit(form: NgForm) {
    const theme = localStorage.getItem('theme');
    console.log(theme);
    this.authService.forgotpassword(form.value.email).subscribe({
      next: (res: any) => {
        Swal.fire({
          title: 'Success',
          html: `<span class='dark:text-white'>${res.message}</span>`,
          icon: 'success',
          confirmButtonText: 'Ok',
          customClass: {
            popup: theme === 'dark' ? '!bg-gray-700' : '!bg-gray-50',
            title: theme === 'dark' ? '!text-white' : '',
            confirmButton: '!bg-blue-600 !hover:bg-blue-700',
          },
        }).then(() => {
          this.router.navigate(['/info']);
        });
      },
      error: (err: HttpErrorResponse) => {
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
