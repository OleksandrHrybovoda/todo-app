import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { ConfirmComponent } from './confirm/confirm.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogWrapperComponent } from './dialog-wrapper/dialog-wrapper.component';
import { TableWrapperComponent } from './table-wrapper/table-wrapper.component';
import { MatTableModule } from '@angular/material/table';
import { EntitiesListBaseClass } from './entities-list/entities-list-base-class.component';

@NgModule({
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatDialogModule,
    MatTableModule,
  ],
  declarations: [
    HeaderComponent,
    ConfirmComponent,
    DialogWrapperComponent,
    TableWrapperComponent,
    EntitiesListBaseClass,
  ],
  exports: [
    HeaderComponent,
    ConfirmComponent,
    DialogWrapperComponent,
    TableWrapperComponent,
  ]
})
export class SharedComponentsModule {
}
