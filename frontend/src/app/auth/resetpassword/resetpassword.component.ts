import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { confirmPasswordValidator } from '../../utils/validators';
import { JsonPipe, NgIf } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-resetpassword',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, RouterLink],
  templateUrl: './resetpassword.component.html',
  styleUrl: './resetpassword.component.scss',
})
export class ResetpasswordComponent implements OnInit {
  resetPasswordForm!: FormGroup;
  fb = inject(FormBuilder);
  token: string = '';
  private activatedRoute = inject(ActivatedRoute);
  private authService = inject(AuthService);
  private router = inject(Router);

  ngOnInit(): void {
    this.resetPasswordForm = this.fb.group({
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(
          '^(?=.*d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$'
        ),
      ]),
      confirmPassword: ['', Validators.required, confirmPasswordValidator],
    });

    this.activatedRoute.queryParams.subscribe((params) => {
      this.token = params['token'];
    });
  }

  onSubmit() {
    const theme = localStorage.getItem('theme');
    console.log(this.resetPasswordForm.value, `$token is '${this.token}'`);
    const restPassword = {
      password: this.resetPasswordForm.value.password,
      token: this.token,
    };
    this.authService.resetpassword(restPassword).subscribe({
      next: (res: any) => {
        this.router.navigate(['/login']);
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
