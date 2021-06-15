import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AuthApiService } from './auth-api.service';
import { AuthHelper } from './auth.helper';
import { AuthProvider } from './auth.provider';

@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    AuthApiService,
    AuthHelper,
    AuthProvider
  ]
})
export class ServicesModule { }

