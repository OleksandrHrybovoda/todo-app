import {
  Component,
  OnInit
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup
} from '@angular/forms';
import { StateManagementService } from 'src/app/services/state-management.service';
import { TasksHelper } from '../../../../core/helpers/tasks.helper';

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
    private tasksHelper: TasksHelper,
    private stateManagementService: StateManagementService
  ) { }

  public ngOnInit(): void {
    this.init();
  }

  public createTask(form: FormGroup): void {
    this.tasksHelper.createNewTask(form.value).then(createdTask => {
      this.stateManagementService.sendTaskCreationEvent(createdTask);
    });
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
