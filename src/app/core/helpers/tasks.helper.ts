import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

  public removeTask(task: Task) {

  }

  private generateId(): number {
    return Math.floor(Math.random() * 100);
  }

}
