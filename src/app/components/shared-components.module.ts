import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { ConfirmComponent } from './confirm/confirm.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AddEditFormTaskComponent } from './add-edit-form-task/add-edit-form-task.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogWrapperComponent } from './dialog-wrapper/dialog-wrapper.component';

@NgModule({
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule
  ],
  declarations: [
    HeaderComponent,
    ConfirmComponent,
    AddEditFormTaskComponent,
    DialogWrapperComponent,
  ],
  exports: [
    HeaderComponent,
    ConfirmComponent,
  ]
})
export class SharedComponentsModule {
}
