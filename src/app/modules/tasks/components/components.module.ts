import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { TaskComponent } from './task/task.component';
import { TasksListComponent } from './tasks-list/tasks-list.component';
import { SharedComponentsModule } from '../../../components/shared-components.module';
import { AddEditTaskFormComponent } from 'src/app/components/add-edit-form-task/add-edit-task-form.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    SharedComponentsModule
  ],
  declarations: [
    TasksListComponent,
    TaskComponent,
    AddEditTaskFormComponent
  ],
})
export class ComponentsModule {
}
