import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Subject
} from 'rxjs';
import { Task } from '../core/models/task.model';

const tasks: Task[] = [];

@Injectable()
export class TasksProvider {

  private tasksMocks: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>(tasks);

  constructor() { }

  public getTasks(): Subject<Task[]> {
    return this.tasksMocks;
  }
}
