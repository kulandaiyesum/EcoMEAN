import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private apiEndPoint: string = environment.apiUrl;

  constructor() {}

  login({ email, password }: { email: string; password: string }) {
    const body = { email, password };
    return this.http.post(`${this.apiEndPoint}/login`, body);
  }

  register(register: { name: string; email: string; password: string }) {
    return this.http.post(`${this.apiEndPoint}/register`, register);
  }

  forgotpassword(email: string) {
    return this.http.post(`${this.apiEndPoint}/forgotpassword`, { email });
  }

  resetpassword(resetObject: { password: string; token: string }) {
    return this.http.post(`${this.apiEndPoint}/password_reset`, resetObject);
  }
}
