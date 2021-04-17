import {
  Component,
  Input
} from '@angular/core';
import { MessagesService } from 'src/app/services/messages.service';
import { Task } from '../../../../core/models/task.model';
import { ConfirmComponent } from '../confirm/confirm.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.sass']
})
export class TaskComponent {

  @Input() task: Task;

  constructor(private msgService: MessagesService) { }

  public openDialogToDeleteTask(): void {
    this.msgService.openDialog(ConfirmComponent);
  }

}
