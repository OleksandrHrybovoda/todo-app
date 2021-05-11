import {
  Component,
  Inject,
  OnInit
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
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

  titleForm: string; // todo - rename to title  
  buttonText: string;

  title: FormControl;
  description: FormControl;
  
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
    this.tasksHelper.updateTask(this.taskForm.value).then(updatedTask => {
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

    // todo - probably no need for this.title and this.description
    // check 

    this.title = new FormControl(title);
    this.description = new FormControl(description);

    this.taskForm = this.fb.group({
      title: this.title,
      description: this.description,
    });
  }

  private setTitle(): void {
    this.titleForm = this.isEditMode() ? 'Edit task' : 'Create task';
    this.buttonText = this.isEditMode() ? 'Edit' : 'Create';
  }

  private isEditMode(): boolean {
    return this.data !== undefined;
  }

}
