import { NgModule } from '@angular/core';
import { AddNewTaskComponent } from './components/add-new-task/add-new-task.component';
import { TaskComponent } from './components/task/task.component';
import { TasksComponent } from './tasks.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
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
