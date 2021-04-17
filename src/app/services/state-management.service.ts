import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Task } from '../core/models/task.model';

@Injectable()
export class StateManagementService {
  private taskCreationSubject: Subject<Task> = new Subject<Task>();
  private taskDeleteSubject: Subject<Task> = new Subject<Task>();

  constructor() { }

  public getTaskCreationEvent(): Subject<Task> {
    return this.taskCreationSubject;
  }

  public getTaskRemoveEvent(): Subject<Task> {
    return this.taskDeleteSubject;
  }

  public sendTaskCreationEvent(task: Task): void {
    this.taskCreationSubject.next(task);
  }

  public sendTaskRemoveEvent(task: Task): void {
    this.taskDeleteSubject.next(task);
  }
}
