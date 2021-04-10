import { Routes } from '@angular/router';
import { TasksComponent } from 'src/app/modules/tasks/tasks.component';

export const routes: Routes = [
  { path: '', redirectTo: 'tasks', pathMatch: 'full' },
  { path: 'tasks', component: TasksComponent },
  { path: '**', component: TasksComponent }
];
