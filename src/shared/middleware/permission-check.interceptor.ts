import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { UserService } from '../services/user.service';

export const permissionCheckInterceptor: HttpInterceptorFn = (req, next) => {
  const user = inject(UserService);

  return next(req);
};
