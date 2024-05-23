import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  private apiEndPoint: string = environment.apiUrl;
  private UserSubject = new BehaviorSubject<any>({});
  userObserver$ = this.UserSubject.asObservable();
  constructor(private http: HttpClient) {}

  public getToken() {
    return localStorage.getItem('token');
  }

  public setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getUserByToken() {
    return this.http.get(`${this.apiEndPoint}/user`).pipe(
      tap((user: any) => {
        this.UserSubject.next(user);
      })
    );
  }
  public setRole(role: string) {
    localStorage.setItem('role', role);
  }
  public getRole(): string {
    return localStorage.getItem('role') as string;
  }

  public roleMatch(allowedRole: string): any {
    let isMatch = false;
    const userRole: string = this.getRole();
    if (userRole !== null && userRole === allowedRole) {
      isMatch = true;
      return isMatch;
    } else {
      return isMatch;
    }
  }

  public isAdmin() {
    const role: string = this.getRole();
    return role === 'ADMIN';
  }
  public isUser() {
    const role: string = this.getRole();
    return role === 'USER';
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.UserSubject.next(null);
  }
}
