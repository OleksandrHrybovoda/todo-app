import {
  Component,
  Input
} from '@angular/core';
import { MessagesService } from 'src/app/services/messages.service';
import { Task } from '../../../../core/models/task.model';
import { StateManagementService } from '../../../../services/state-management.service';
import { UpdateTaskComponent } from '../update-task/update-task.component';

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
    this.msgService.openDialog(UpdateTaskComponent, this.task);
  }

}
