import { inject } from '@angular/core';
import { UserAuthService } from './../services/user-auth.service';
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const userAuthService = inject(UserAuthService);
  const token = userAuthService.getToken();
  const router = inject(Router);
  if (!!token) {
    return next(
      req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`),
      })
    ).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          router.navigate(['/login']);
        } else if (err.status === 403) {
          if (err.error.message === 'Invalid Token') {
            userAuthService.logout();
            router.navigate(['/']);
          } else {
            router.navigate(['/forbidden']);
          }
        }
        return throwError(err);
      })
    );
  } else {
    return next(req);
  }
};
// if (req.headers.get('No-Auth') === 'true') {
//   return next.handle(req.clone());
// }
// requestHeader = new HttpHeaders({ 'No-Auth': 'true' });
