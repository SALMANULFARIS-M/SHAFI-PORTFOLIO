import { Routes } from '@angular/router';

export const routes: Routes = [
  // { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  { path: '', loadChildren: () => import('./modules/user/user.routes').then(m => m.USER_ROUTES) },
  { path: '**', redirectTo: '' }
];



