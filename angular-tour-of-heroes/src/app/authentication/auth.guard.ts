import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { AuthenticationService } from './authentication.service';

export const authGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);

  const isLoggedIn = await authService.isLoggedIn();

  if (isLoggedIn) {
    return true
  }

  return router.createUrlTree(['/login']);
};
