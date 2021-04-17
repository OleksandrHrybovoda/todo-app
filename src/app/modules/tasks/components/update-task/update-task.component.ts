import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TasksHelper } from 'src/app/core/helpers/tasks.helper';
import { Task } from 'src/app/core/models/task.model';
import { StateManagementService } from 'src/app/services/state-management.service';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.sass']
})
export class UpdateTaskComponent implements OnInit {
  editTaskForm: FormGroup;
  title: FormControl;
  description: FormControl;
  task: Task;

  constructor(private fb: FormBuilder,
              private tasksHelper: TasksHelper,
              private stateManagementService: StateManagementService,
              @Inject(MAT_DIALOG_DATA) private data?: Task) {
    this.title = new FormControl(this.data.title);
    this.description = new FormControl(this.data.description);
    this.task = data;
  }

  ngOnInit(): void {
    this.init();
  }

  public updateTask(form: FormGroup): void {
    this.task.title = form.value.title;
    this.task.description = form.value.description;
    this.tasksHelper.updateTask(this.task).then(upadtedTask => {
      this.stateManagementService.sendTaskUpdateEvent(upadtedTask);
    });
  }

  private init(): void {
    this.initForm();
  }

  private initForm(): void {
    this.editTaskForm = this.fb.group({
      title: this.title,
      description: this.description,
    });
  }

}
