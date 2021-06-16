import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AuthApiService } from './auth-api.service';

@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    AuthApiService,
  ]
})
export class ServicesModule { }

