import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from './auth.service';
import { MessagesService } from './messages.service';
import { StateManagementService } from './state-management.service';
import { TasksProvider } from './tasks.provider';
import { UserStateManagementService } from './user-state-management.service';
import { UsersProvider } from './users.provider';

@NgModule({
  imports: [
    MatSnackBarModule,
    MatDialogModule,
  ],
  providers: [
    MessagesService,
    TasksProvider,
    UsersProvider,
    StateManagementService,
    UserStateManagementService,
    AuthService,
  ]
})
export class ServicesModule { }

