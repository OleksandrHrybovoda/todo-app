import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MessagesService } from './messages.service';
import { TasksProvider } from './tasks.provider';

@NgModule({
  imports: [
    MatSnackBarModule,
    MatDialogModule,
  ],
  providers: [
    MessagesService,
    TasksProvider
  ]
})
export class ServicesModule { }

