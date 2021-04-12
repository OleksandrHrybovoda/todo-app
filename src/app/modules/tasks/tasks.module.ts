import { NgModule } from '@angular/core';
import { AddNewTaskComponent } from './components/tasks-list/add-new-task/add-new-task.component';
import { TaskComponent } from './components/tasks-list/task/task.component';
import { TasksComponent } from './tasks.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { TasksListComponent } from './components/tasks-list/tasks-list.component';
import { TasksRoutingModule } from './tasks-routing.module';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
      TasksComponent,
      TaskComponent,
      AddNewTaskComponent,
      TasksListComponent
    ],
    imports: [
      MatDialogModule,
      TasksRoutingModule,
      ReactiveFormsModule,
      MatInputModule,
      MatFormFieldModule,
      CommonModule,
      MatButtonModule,
      MatCardModule,
    ],
    providers: [
    ]
})
export class TasksModule {
}
