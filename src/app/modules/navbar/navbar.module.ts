import { NgModule } from '@angular/core';
import { NavbarComponent } from './navbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    MatToolbarModule,
    MatButtonModule
  ],
  declarations: [
    NavbarComponent,
  ],
  exports: [
    NavbarComponent,
  ]
})
export class NavbarModule {
}
