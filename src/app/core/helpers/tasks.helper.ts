import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Task } from '../../core/models/task.model';

@Injectable()
export class TasksHelper {

  constructor() { }

  public createNewTask(task: Task): Promise<Task> {
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
    return Math.floor(Math.random() * 100);
  }

}
