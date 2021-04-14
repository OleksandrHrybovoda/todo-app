import { Routes } from '@angular/router';
import { TasksComponent } from '../../modules/tasks/tasks.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'tasks'
  },
  {
    path: '',
    component: TasksComponent
  },
];
