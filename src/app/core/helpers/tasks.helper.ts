import { Injectable } from '@angular/core';
import { TasksProvider } from 'src/app/services/tasks.provider';
import { Task } from '../../core/models/task.model';

@Injectable()
export class TasksHelper {

  constructor(private tasksProvider: TasksProvider) { }

  public createNewTask(task: Task): Promise<Task> {
    return new Promise(resolve => {
      const taskItem: Task = {
        ...task
      };

      this.tasksProvider.createTask(taskItem).subscribe((fetchedTask) => {
        resolve(fetchedTask);
      });
    });
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
