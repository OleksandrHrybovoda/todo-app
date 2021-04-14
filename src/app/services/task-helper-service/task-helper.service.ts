import { Injectable } from '@angular/core';
import { Task } from '../../core/models/task.model';
import { tasks } from '../tasks.service/task.service';

@Injectable({
  providedIn: 'root'
})
export class TaskHelperService {

  constructor() { }

  public generateNewID(): number {
    return tasks[tasks.length - 1].id + 1;
  }

  public addNewTask(task: Task): number {
    return tasks.push(task);
  }

}
