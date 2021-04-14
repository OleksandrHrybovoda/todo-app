import { NgModule } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MessageService } from './message.service';
import { TaskHelperService } from '../task-helper-service/task-helper.service';
import { TaskService } from '../tasks.service/task.service';
import { TasksServiceModule } from '../tasks.service/tasks-service.module';
import { TaskHelperModule } from '../task-helper-service/task-helper.module';

@NgModule({
  declarations: [
  ],
  imports: [
    MatSnackBarModule,
    TasksServiceModule,
    TaskHelperModule
  ],
  providers: [
    MessageService,
    TaskHelperService,
    TaskService
  ],
  bootstrap: []
})
export class ServicesModule { }

