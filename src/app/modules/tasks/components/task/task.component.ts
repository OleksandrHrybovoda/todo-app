import {
  ChangeDetectionStrategy,
  Component,
  Input
} from '@angular/core';
import { MessagesService } from 'src/app/services/messages.service';
import { Task } from '../../models/task.model';
import { TaskStateManagementService } from '../../services/task-state-management.service';
import { TasksProvider } from '../../services/tasks.provider';
import { TaskFormComponent } from '../task-form/task-form.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskComponent {

  @Input() task: Task;

  constructor(
    private msgService: MessagesService,
    private stateManagementService: TaskStateManagementService,
    private tasksProvider: TasksProvider
  ) { }

  public async onDeleteButtonClick(): Promise<void> {
    const title: string = $localize`Delete task`;
    const message: string = $localize`Are you sure you want to delete task ?`;
    const action: string = $localize`DELETE`;

    const deletionConfirmed = await this.msgService.confirm(title, message, action);

    if (!deletionConfirmed) {
      return;
    }

    this.tasksProvider.deleteTask(this.task.id).subscribe(() => {
      this.stateManagementService.sendTaskRemovalEvent(this.task);
    });
  }

  public onEditButtonClick(): void {
    const width = '400px';
    this.msgService.openDialog(TaskFormComponent, this.task, width);
  }

}
