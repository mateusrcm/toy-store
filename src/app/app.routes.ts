import { Routes } from '@angular/router';
import { blockWhenLoggedInGuard } from '../shared/guards/block-when-logged-in.guard';

export const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.route').then((m) => m.routes),
  },
  {
    path: 'shopping-cart',
    loadChildren: () =>
      import('./shopping-cart/shopping-cart.route').then((m) => m.routes),
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.route').then((m) => m.routes),
    canActivate: [blockWhenLoggedInGuard],
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./register/register.router').then((m) => m.routes),
    canActivate: [blockWhenLoggedInGuard],
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
