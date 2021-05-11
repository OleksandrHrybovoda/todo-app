import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable
} from 'rxjs';
import { Task } from '../models/task.model';
import { TasksApiService } from './tasks-api.service';
import { tasksMocks } from './tasks.mocks';

@Injectable()
export class TasksProvider {

  private tasksMocks: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>(tasksMocks);

  constructor(private tasksApiService: TasksApiService) { }

  public getTasksMocks(): Observable<Task[]> {
    return this.tasksMocks.asObservable();
  }

  public getTasks(limit?: number, offset?: number): Observable<Task[]> {
    return this.tasksApiService.getTasks(limit, offset);
  }

  public createTask(task: Task): Observable<Task> {
    return this.tasksApiService.createTask(task);
  }

  public editTask(task: Task): Observable<Task> {
    return this.tasksApiService.editTask(task);
  }

  public deleteTask(taskId: string): Observable<string> {
    return this.tasksApiService.deleteTask(taskId);
  }
}
