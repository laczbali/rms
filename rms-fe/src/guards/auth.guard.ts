import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  window.location.href = '/auth/login';
  return false;
};
