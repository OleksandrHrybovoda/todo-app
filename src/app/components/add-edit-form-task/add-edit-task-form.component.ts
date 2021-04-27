import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TasksHelper } from 'src/app/core/helpers/tasks.helper';
import { Task } from 'src/app/core/models/task.model';
import { StateManagementService } from 'src/app/services/state-management.service';

@Component({
  selector: 'app-add-edit-task-form',
  templateUrl: './add-edit-task-form.component.html',
  styleUrls: ['./add-edit-task-form.component.sass']
})
export class AddEditTaskFormComponent implements OnInit {
  addEditTaskForm: FormGroup;
  titleForm: string;
  title: FormControl;
  description: FormControl;
  buttonText: string;

  constructor(private fb: FormBuilder,
              private tasksHelper: TasksHelper,
              private stateManagementService: StateManagementService,
              @Inject(MAT_DIALOG_DATA) private data?: Task) {
  }

  ngOnInit(): void {
    this.init();
  }

  public addEditTask(form: FormGroup): void {
    this.isEditMode() ? this.editTask(form) : this.createTask(form);
  }

  private editTask(form: FormGroup): void {
    this.data.title = form.value.title;
    this.data.desc = form.value.description;
    this.tasksHelper.updateTask(form.value).then(updatedTask => {
      this.stateManagementService.sendTaskUpdateEvent(updatedTask);
    });
  }

  private createTask(form: FormGroup): void {
    this.tasksHelper.createNewTask(form.value).then(createdTask => {
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
      description = this.data.desc;
    }
    this.title = new FormControl(title);
    this.description = new FormControl(description);
    this.addEditTaskForm = this.fb.group({
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
