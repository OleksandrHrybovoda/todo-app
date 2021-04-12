import { NgModule } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MessageService } from './message.service';
import { TaskHelperService } from './task-helper.service';
import { TaskService } from './task.service';

@NgModule({
  declarations: [
  ],
  imports: [
    MatSnackBarModule,
  ],
  providers: [
    MessageService,
    TaskHelperService,
    TaskService
  ],
  bootstrap: []
})
export class ServicesModule { }

