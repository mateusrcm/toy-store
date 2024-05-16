import { Routes } from '@angular/router';

import { blockWhenLoggedInGuard } from '../shared/guards/block-when-logged-in.guard';
import { profileGuard } from '../shared/guards/profile.guard';
import { Profile } from '../shared/models/user.type';

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
    path: 'admin',
    loadChildren: () => import('./admin/admin.route').then((m) => m.routes),
    canActivate: [profileGuard(Profile.Admin)],
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
