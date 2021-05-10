import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from './auth.service';
import { MessagesService } from './messages.service';
import { StateManagementService } from './state-management.service';
import { TasksApiService } from './api-services/tasks-api.service';
import { TasksProvider } from './tasks.provider';
import { UserStateManagementService } from './user-state-management.service';
import { UsersApiService } from './api-services/users-api.service';
import { UsersProvider } from './users.provider';
import { ApiBaseClass } from '../components/api-base-class/api-base-class.comonent';

@NgModule({
  imports: [
    MatSnackBarModule,
    MatDialogModule,
    HttpClientModule
  ],
  providers: [
    MessagesService,
    TasksProvider,
    UsersProvider,
    StateManagementService,
    UserStateManagementService,
    AuthService,
    TasksApiService,
    ApiBaseClass,
    UsersApiService,
  ]
})
export class ServicesModule { }

