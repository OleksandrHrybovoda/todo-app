import {
  Component,
  Inject,
  OnInit
} from '@angular/core';
import {
  FormBuilder,
  FormGroup
} from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Task } from '../../models/task.model';
import { TaskStateManagementService } from '../../services/task-state-management.service';
import { TasksHelper } from '../../services/tasks.helper';

@Component({
  selector: 'task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.sass']
})
export class TaskFormComponent implements OnInit {

  taskForm: FormGroup;

  title: string;
  buttonText: string;

  constructor(
    private fb: FormBuilder,
    private tasksHelper: TasksHelper,
    private stateManagementService: TaskStateManagementService,
    @Inject(MAT_DIALOG_DATA) private data?: Task
  ) { }

  ngOnInit(): void {
    this.init();
  }

  public submit(): void {
    this.isEditMode() ? this.editTask() : this.createTask();
  }

  private editTask(): void {
    const task: Task = {
      id: this.data.id,
      ...this.taskForm.value
    };

    this.tasksHelper.updateTask(task).subscribe(updatedTask => {
      this.stateManagementService.sendTaskUpdateEvent(updatedTask);
    });
  }

  private createTask(): void {
    this.tasksHelper.createNewTask(this.taskForm.value).subscribe(createdTask => {
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

    this.taskForm = this.fb.group({
      title,
      description,
    });
  }

  private setTitle(): void {
    this.title = this.isEditMode() ? 'Edit task' : 'Create task';
    this.buttonText = this.isEditMode() ? 'Edit' : 'Create';
  }

  private isEditMode(): boolean {
    return this.data !== undefined;
  }

}
