import { CanActivateFn } from '@angular/router';

import { Profile } from '../models/user.type';

export function profileGuard(...profiles: Profile[]): CanActivateFn {
  return (route, state): boolean => {
    const profile = sessionStorage.getItem('profile');
    const hasAccess = profiles.some((prof) => profile === prof);

    if (hasAccess) return true;

    return false;
  };
}
