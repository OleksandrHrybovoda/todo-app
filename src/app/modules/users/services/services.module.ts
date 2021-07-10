import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { UsersHelper } from './users.helper';
import { UsersProvider } from './users.provider';
import { UsersApiService } from './users-api.service';

@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    UsersHelper,
    UsersProvider,
    UsersApiService,
  ]
})
export class ServicesModule { }

