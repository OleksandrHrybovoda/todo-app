import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Task } from 'src/app/core/models/task.model';
import { MessageService } from 'src/app/services/message-service/message.service';
import { TaskHelperService } from 'src/app/services/task-helper-service/task-helper.service';

@Component({
  selector: 'app-add-new-task',
  templateUrl: './add-new-task.component.html',
  styleUrls: ['./add-new-task.component.sass']
})
export class AddNewTaskComponent implements OnInit {
  addNewTaskForm: FormGroup;
  title = new FormControl('');
  description = new FormControl('');

  constructor(private fb: FormBuilder,
              private messageService: MessageService,
              private taskHelperService: TaskHelperService) {
  }

  ngOnInit(): void {
    this.init();
  }

  private init(): void {
    this.addNewTaskForm = this.fb.group({
      title: this.title,
      description: this.description,
    });
  }

  public createTask(form: FormGroup): void {
    const task: Task = {
      id: this.taskHelperService.generateNewID(),
      title: form.value.title,
      description: form.value.description,
      lastUpdated: Date.now(),
      lastUpdatedDate: Date.now()
    };
    this.taskHelperService.addNewTask(task);
    this.openSnackBar();
  }

  private openSnackBar(): void {
    this.messageService.openSnackBar('Successfully added!');
  }

}
