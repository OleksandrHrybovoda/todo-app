import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from './auth.service';
import { MessagesService } from './messages.service';
import { ResponseMapperService } from './response-mapper.service';
import { StateManagementService } from './state-management.service';
import { TasksApiService } from './tasks-api.service';
import { TasksProvider } from './tasks.provider';
import { UserStateManagementService } from './user-state-management.service';
import { UsersApiService } from './users-api.service';
import { UsersProvider } from './users.provider';

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
    UsersApiService,
    ResponseMapperService
  ]
})
export class ServicesModule { }

