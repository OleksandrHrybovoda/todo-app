import {
  Component,
  Inject,
  OnInit
} from '@angular/core';
import {
  FormBuilder,
  FormGroup
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseFormComponent } from 'src/app/components/base-form/base-form.component';
import { MessagesService } from 'src/app/services/messages.service';
import { Task } from '../../models/task.model';
import { TaskStateManagementService } from '../../services/task-state-management.service';
import { TasksHelper } from '../../services/tasks.helper';

@Component({
  selector: 'task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.sass']
})
export class TaskFormComponent extends BaseFormComponent implements OnInit {

  form: FormGroup;

  title: string;
  buttonText: string;

  constructor(
    private fb: FormBuilder,
    private tasksHelper: TasksHelper,
    msgService: MessagesService,
    matDialogRef: MatDialogRef<TaskFormComponent>,
    private stateManagementService: TaskStateManagementService,
    @Inject(MAT_DIALOG_DATA) private data?: Task
  ) {
    super(msgService, matDialogRef);
  }

  ngOnInit(): void {
    this.init();
  }

  public submit(): void {
    this.isEditMode() ? this.editTask() : this.createTask();
  }

  private editTask(): void {
    const task: Task = {
      id: this.data.id,
      ...this.form.value
    };

    this.tasksHelper.updateTask(task).subscribe(updatedTask => {
      this.stateManagementService.sendTaskUpdateEvent(updatedTask);
    });
  }

  private createTask(): void {
    this.tasksHelper.createNewTask(this.form.value).subscribe(createdTask => {
      this.stateManagementService.sendTaskCreationEvent(createdTask);
    });
  }

  private init(): void {
    this.initForm();
    this.setTitle();
  }

  private initForm(): void {
    let title: string = '';
    let description: string = '';

    if (this.isEditMode()) {
      title = this.data.title;
      description = this.data.description;
    }

    this.form = this.fb.group({
      title,
      description,
    });
  }

  private setTitle(): void {
    this.title = this.isEditMode() ? $localize`Edit task` : $localize`Create task`;
    this.buttonText = this.isEditMode() ? $localize`Edit` : $localize`Create`;
  }

  private isEditMode(): boolean {
    return this.data !== undefined;
  }

}
