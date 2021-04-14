import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Task } from '../../core/models/task.model';

@Injectable()
export class TasksHelper {

  constructor() { }

  public createNewTask(task: Task): Promise<Task> {
    // todo ideally we pass Task-like object instead of FormGroup
    console.log(task);
    return new Promise(resolve => {
      const taskItem: Task = {
        id: this.generateId(),
        ...task,
        lastUpdated: Date.now(),
        lastUpdatedDate: Date.now()
      };

      // todo - here task is sent to server and saved

      resolve(taskItem);
    });
  }

  private generateId(): number {
    // todo - use any random number generator
    // but keep in mind that 'id' will be created by server
    return Math.floor(Math.random() * 100);
  }

}
