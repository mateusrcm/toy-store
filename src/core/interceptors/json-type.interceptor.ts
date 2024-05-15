import { HttpInterceptorFn } from '@angular/common/http';

export const jsonTypeInterceptor: HttpInterceptorFn = (req, next) => {
  req.headers.set('Accept', 'application/json');
  req.headers.set('Content-Type', 'application/json');

  return next(req);
};
