import { Injectable } from '@angular/core';
import { Task } from '../../core/models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskHelperService {

  constructor() { }

  public addNewTask(tasks: Task[], task: Task): number {
    return tasks.push(task);
  }
}
