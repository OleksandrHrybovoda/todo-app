import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { TaskComponent } from './task/task.component';
import { AddNewTaskComponent } from './add-new-task/add-new-task.component';
import { TasksListComponent } from './tasks-list/tasks-list.component';
import { SharedComponentsModule } from 'src/app/components/shared-components.module';
import { ConfirmComponent } from './confirm/confirm.component';

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
    AddNewTaskComponent,
    ConfirmComponent,
  ],
})
export class ComponentsModule {
}
