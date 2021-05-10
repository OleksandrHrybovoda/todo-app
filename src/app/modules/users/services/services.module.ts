import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { UsersHelper } from './users.helper';
import { UsersProvider } from './users.provider';
import { UsersApiService } from './users-api.service';
import { UserStateManagementService } from './user-state-management.service';

@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    UsersHelper,
    UsersProvider,
    UsersApiService,
    UserStateManagementService,
  ]
})
export class ServicesModule { }

