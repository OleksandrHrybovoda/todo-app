import { Routes } from '@angular/router';
import { TasksListComponent } from 'src/app/modules/tasks/components/tasks-list/tasks-list.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'tasks'
  },
  {
    path: '',
    component: TasksListComponent
  },
];
