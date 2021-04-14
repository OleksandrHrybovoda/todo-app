import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'tasks', pathMatch: 'full' },
  {
    path: 'tasks',
    loadChildren: () => import('../../modules/tasks/tasks.module').then(m => m.TasksModule)
  },
  { path: '**', redirectTo: 'tasks', pathMatch: 'full' },
];
