import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { TasksHelper } from 'src/app/core/helpers/tasks.helper';
import { Task } from 'src/app/core/models/task.model';
import { MessagesService } from 'src/app/services/messages.service';
import { StateManagementService } from 'src/app/services/state-management.service';

@Component({
  selector: 'app-delete-task',
  templateUrl: './delete-task.component.html',
  styleUrls: ['./delete-task.component.sass']
})
export class DeleteTaskComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: { task: Task },
              private tasksHelper: TasksHelper,
              private stateManagementService: StateManagementService,
              private msgService: MessagesService) { }

  public deleteTask(): void {
    this.tasksHelper.removeTask(this.data.task).then(removeTask => {
      this.stateManagementService.sendTaskRemoveEvent(removeTask);
      this.showSuccessMessage();
    });
  }

  private showSuccessMessage(): void {
    const msg: string = 'Task successfully deleted!';
    this.msgService.openSnackBar(msg);
  }

}
