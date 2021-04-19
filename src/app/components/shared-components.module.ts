import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { ConfirmComponent } from './confirm/confirm.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogWrapperComponent } from './dialog-wrapper/dialog-wrapper.component';

@NgModule({
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatDialogModule,
  ],
  declarations: [
    HeaderComponent,
    ConfirmComponent,
    DialogWrapperComponent,
  ],
  exports: [
    HeaderComponent,
    ConfirmComponent,
    DialogWrapperComponent
  ]
})
export class SharedComponentsModule {
}
