import { AuthService } from '../../services/auth.service';
import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { confirmPasswordValidator } from '../../utils/validators';
import { NgIf } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';

interface Register {
  name: string;
  email: string;
  password: string;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, NgIf],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(
          '^(?=.*d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$'
        ),
      ]),
      confirmPassword: ['', Validators.required, confirmPasswordValidator],
    });
  }

  onSubmit() {
    const theme = localStorage.getItem('theme');
    console.log(this.registerForm.value);
    const registerObject: Register = {
      name: this.registerForm.value.name,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
    };
    this.authService.register(registerObject).subscribe({
      next: (value) => {
        console.log(value);
        this.router.navigate(['/info']);
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
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
