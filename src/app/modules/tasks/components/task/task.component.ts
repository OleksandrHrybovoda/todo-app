import {
  Component,
  Input
} from '@angular/core';
import { AddEditTaskFormComponent } from 'src/app/components/add-edit-form-task/add-edit-form-task.component';
import { MessagesService } from 'src/app/services/messages.service';
import { Task } from '../../../../core/models/task.model';
import { StateManagementService } from '../../../../services/state-management.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.sass']
})
export class TaskComponent {

  @Input() task: Task;

  constructor(
    private msgService: MessagesService,
    private stateManagementService: StateManagementService
  ) { }

  public async onDeleteButtonClick(): Promise<void> {
    const title: string = 'Delete task';
    const message: string = 'Are you sure you want to delete task ?';
    const action: string = 'DELETE';

    const deletionConfirmed = await this.msgService.confirm(title, message, action);

    if (!deletionConfirmed) {
      return;
    }

    this.stateManagementService.sendTaskRemovalEvent(this.task);
  }

  public onEditButtonClick(): void {
    this.msgService.openDialog(AddEditTaskFormComponent, this.task);
  }

}
