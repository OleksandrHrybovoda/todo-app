import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Task } from '../core/models/task.model';

@Injectable()
export class StateManagementService {
  private taskCreationSubject: Subject<{task: Task, action: string}> = new Subject<{task: Task, action: string}>();

  constructor() { }

  public getTaskCreationEvent(): Subject<{task: Task, action: string}> {
    return this.taskCreationSubject;
  }

  public sendTaskCreationEvent(task: Task, action: string = 'add'): void {
    this.taskCreationSubject.next({ task, action });
  }

  public sendTaskRemoveEvent(task: Task, action: string = 'remove'): void {
    this.taskCreationSubject.next({ task, action });
  }
}
