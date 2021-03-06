import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';

import { HeaderComponent } from './header/header.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { DialogWrapperComponent } from './dialog-wrapper/dialog-wrapper.component';
import { TableWrapperComponent } from './table-wrapper/table-wrapper.component';
import { EntitiesListBase } from './entities-list-base/entities-list-base.component';
import { AddEntitiesComponent } from './add-entities/add-entities.component';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BaseFormComponent } from './base-form/base-form.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatDialogModule,
    MatTableModule,
    MatFormFieldModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  declarations: [
    HeaderComponent,
    ConfirmComponent,
    DialogWrapperComponent,
    TableWrapperComponent,
    EntitiesListBase,
    AddEntitiesComponent,
    BaseFormComponent
  ],
  exports: [
    HeaderComponent,
    ConfirmComponent,
    DialogWrapperComponent,
    TableWrapperComponent,
    EntitiesListBase,
    AddEntitiesComponent,
    BaseFormComponent
  ]
})
export class SharedComponentsModule {
}
