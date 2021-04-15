import {
  Component,
  Input
} from '@angular/core';
import { MessagesService } from 'src/app/services/messages.service';
import { Task } from '../../../../core/models/task.model';
import { DeleteTaskComponent } from '../delete-task/delete-task.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.sass']
})
export class TaskComponent {

  @Input() task: Task;

  constructor(private msgService: MessagesService) { }

  public openDialogToDeleteTask(): void {
    this.msgService.openDialog(DeleteTaskComponent, this.task);
  }

}
