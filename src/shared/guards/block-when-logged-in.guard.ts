import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { UserService } from '../services/user.service';

export const blockWhenLoggedInGuard: CanActivateFn = (_) => {
  const user = inject(UserService);

  return !user.isLoggedIn;
};
