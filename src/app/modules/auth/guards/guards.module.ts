import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './auth.guard';
import { LoggedOutGuard } from './logged-out.guard';

@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    AuthGuard,
    LoggedOutGuard
  ]
})
export class GuardsModule { }

