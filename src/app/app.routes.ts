import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { LoggedOutGuard } from './core/guards/logged-out.guard';

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
