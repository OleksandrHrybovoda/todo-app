import { Injectable } from '@angular/core';
import { Task } from '../../core/models/task.model';

@Injectable()
export class TasksHelper {

  constructor() { }

  public createNewTask(task: Task): Promise<Task> {
    return new Promise(resolve => {
      const taskItem: Task = {
        ...task,
        created_date: Date.now(),
        last_update_date: Date.now()
      };

      // todo - here task is sent to server and saved

      resolve(taskItem);
    });
  }

  public updateTask(task: Task): Promise<Task> {
    return new Promise(resolve => {
      const taskItem: Task = {
        ...task,
        last_update_date: Date.now()
      };

      resolve(taskItem);
    });
  }

}
