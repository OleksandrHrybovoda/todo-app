import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable()
export class TaskStateManagementService {

  private taskCreationSubject: Subject<Task> = new Subject<Task>();
  private taskRemovalSubject: Subject<Task> = new Subject<Task>();
  private taskUpdateSubject: Subject<Task> = new Subject<Task>();

  constructor() { }

  public getTaskCreationEvent(): Subject<Task> {
    return this.taskCreationSubject;
  }

  public getTaskRemovalEvent(): Subject<Task> {
    return this.taskRemovalSubject;
  }

  public getTaskUpdateEvent(): Subject<Task> {
    return this.taskUpdateSubject;
  }

  public sendTaskCreationEvent(task: Task): void {
    this.taskCreationSubject.next(task);
  }

  public sendTaskRemovalEvent(task: Task): void {
    this.taskRemovalSubject.next(task);
  }

  public sendTaskUpdateEvent(task: Task): void {
    this.taskUpdateSubject.next(task);
  }
}
