import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';
import { TasksProvider } from './tasks.provider';

@Injectable()
export class TasksHelper {

  constructor(private tasksProvider: TasksProvider) { }

  public createNewTask(task: Task): Observable<Task> {
    const taskItem: Task = {
      ...task
    };

    return this.tasksProvider.createTask(taskItem);
  }

  public updateTask(task: Task): Promise<Task> {
    return new Promise(resolve => {
      const taskItem: Task = {
        ...task
      };

      resolve(taskItem);
    });
  }

}
