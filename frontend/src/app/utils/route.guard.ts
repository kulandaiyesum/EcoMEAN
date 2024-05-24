import { inject } from '@angular/core';
import { UserAuthService } from './../services/user-auth.service';
import { CanActivateFn, Router } from '@angular/router';

export const routeGuard: CanActivateFn = (route, state) => {
  const userAuthService = inject(UserAuthService);
  const router = inject(Router);
  if (userAuthService.getUser() !== null) {
    const role = route.data['role'] as string;
    if (role) {
      const match = userAuthService.roleMatch(role);
      if (match) {
        return true;
      } else {
        router.navigate(['/forbidden']);
        return false;
      }
    }
  }
  router.navigate(['/login']);
  return false;
};
