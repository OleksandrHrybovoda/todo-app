import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TasksHelper } from 'src/app/core/helpers/tasks.helper';
import { Task } from 'src/app/core/models/task.model';
import { StateManagementService } from 'src/app/services/state-management.service';

@Component({
  selector: 'app-add-edit-form-task',
  templateUrl: './add-edit-form-task.component.html',
  styleUrls: ['./add-edit-form-task.component.sass']
})
export class AddEditFormTaskComponent implements OnInit {
  addEditTaskForm: FormGroup;
  titleForm: string;
  title: FormControl;
  description: FormControl;

  constructor(private fb: FormBuilder,
              private tasksHelper: TasksHelper,
              private stateManagementService: StateManagementService,
              @Inject(MAT_DIALOG_DATA) private data?: Task) {
    this.titleForm = this.data ? 'Edit' : 'Create';
  }

  ngOnInit(): void {
    this.init();
  }

  public addEditTask(form: FormGroup): void {
    this.data ? this.editTask(form) : this.createTask(form);
  }

  private editTask(form: FormGroup): void {
    this.data.title = form.value.title;
    this.data.description = form.value.description;
    this.tasksHelper.editTask(form.value).then(upadtedTask => {
      this.stateManagementService.sendTaskEditEvent(upadtedTask);
    });
  }

  private createTask(form: FormGroup): void {
    this.tasksHelper.createNewTask(form.value).then(createdTask => {
      this.stateManagementService.sendTaskCreationEvent(createdTask);
    });
  }

  private init(): void {
    this.initForm();
  }

  private initForm(): void {
    if (this.data) {
      this.title = new FormControl(this.data.title);
      this.description = new FormControl(this.data.description);
    }
    if (!this.data) {
      this.title = new FormControl('');
      this.description = new FormControl('');
    }
    this.addEditTaskForm = this.fb.group({
      title: this.title,
      description: this.description,
    });
  }

}
