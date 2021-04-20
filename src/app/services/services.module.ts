import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MessagesService } from './messages.service';
import { StateManagementService } from './state-management.service';
import { TasksProvider } from './tasks.provider';
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
    StateManagementService
  ]
})
export class ServicesModule { }

