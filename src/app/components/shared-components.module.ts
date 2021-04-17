import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { ConfirmComponent } from './confirm/confirm.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatDialogModule,
  ],
  declarations: [
    HeaderComponent,
    ConfirmComponent,
  ],
  exports: [
    HeaderComponent,
    ConfirmComponent,
  ]
})
export class SharedComponentsModule {
}
