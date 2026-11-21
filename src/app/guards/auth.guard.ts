import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  if (!isPlatformBrowser(platformId)) {
    return false;
  }


  const isLoggedIn = !!localStorage.getItem('auth_token');

  if (isLoggedIn) {
    return true;
  }

  return router.createUrlTree(['/login']);
};
