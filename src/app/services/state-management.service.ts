import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Task } from '../core/models/task.model';

@Injectable()
export class StateManagementService {
  private taskCreationSubject: Subject<Task> = new Subject<Task>();

  constructor() { }

  public getTaskCreationEvent(): Subject<Task> {
    return this.taskCreationSubject;
  }

  public sendTaskCreationEvent(task: Task): void {
    this.taskCreationSubject.next(task);
  }
}
