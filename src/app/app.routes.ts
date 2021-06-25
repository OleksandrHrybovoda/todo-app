import { Routes } from '@angular/router';
import { AuthGuard } from './modules/auth/guards/auth.guard';
import { LoggedOutGuard } from './modules/auth/guards/logged-out.guard';

export const routes: Routes = [
  {
    path: '',
    canActivate: [LoggedOutGuard],
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'tasks',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/tasks/tasks.module').then(m => m.TasksModule)
  },
  {
    path: 'users',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/users/users.module').then(m => m.UsersModule)
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  },
];
