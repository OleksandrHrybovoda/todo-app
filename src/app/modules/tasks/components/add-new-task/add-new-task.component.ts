import {
  Component,
  OnInit
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup
} from '@angular/forms';
import { Task } from 'src/app/core/models/task.model';
import { StateManagementService } from 'src/app/services/state-management.service';
import { TasksHelper } from '../../../../core/helpers/tasks.helper';
import { MessagesService } from '../../../../services/messages.service';

@Component({
  selector: 'app-add-new-task',
  templateUrl: './add-new-task.component.html',
  styleUrls: ['./add-new-task.component.sass']
})
export class AddNewTaskComponent implements OnInit {
  addNewTaskForm: FormGroup;
  title = new FormControl('');
  description = new FormControl('');

  constructor(
    private fb: FormBuilder,
    private msgService: MessagesService,
    private tasksHelper: TasksHelper,
    private stateManagementService: StateManagementService
  ) { }

  public ngOnInit(): void {
    this.init();
  }

  public createTask(task: Task): void {
    this.tasksHelper.createNewTask(task).then(createdTask => {
      // todo - we need to notify parent component that new task was added
      // use @Output for this
      this.stateManagementService.sendTaskCreationEvent(createdTask);
      this.showSuccessMessage();
    });
  }

  private showSuccessMessage(): void {
    const msg = 'Successfully added new task!';
    this.msgService.openSnackBar(msg);
  }

  private init(): void {
    this.initForm();
  }

  private initForm(): void {
    this.addNewTaskForm = this.fb.group({
      title: this.title,
      description: this.description,
    });
  }

}
