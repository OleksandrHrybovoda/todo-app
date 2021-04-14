import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Task } from '../../core/models/task.model';

@Injectable()
export class TasksHelper {

  constructor() { }

  public createNewTask(taskForm: FormGroup): Promise<Task> {
    // todo ideally we pass Task-like object instead of FormGroup

    return new Promise(resolve => {
      const task: Task = {
        id: this.generateId(),
        title: taskForm.value.title,
        description: taskForm.value.description,
        lastUpdated: Date.now(),
        lastUpdatedDate: Date.now()
      };

      // todo - here task is sent to server and saved 

      resolve(task);
    });
  }

  private generateId(): number {
    // todo - use any random number generator
    // but keep in mind that 'id' will be created by server 
    return 0;
  }

}
