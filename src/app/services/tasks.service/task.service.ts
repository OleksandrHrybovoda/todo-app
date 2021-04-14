import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from '../../core/models/task.model';

export const tasks: Task[] = [{
  id: 1,
  title: 'Task 1',
  description: 'Simple Task 1',
  lastUpdated: 1618048954,
  lastUpdatedDate: 1618048954,
}, {
  id: 2,
  title: 'Task 2',
  description: 'Simple Task 2',
  lastUpdated: 1618048954,
  lastUpdatedDate: 1618048954,
}, {
  id: 3,
  title: 'Task 3',
  description: 'Simple Task 3',
  lastUpdated: 1618048954,
  lastUpdatedDate: 1618048954,
}, {
  id: 4,
  title: 'Task 4',
  description: 'Simple Task 4',
  lastUpdated: 1618048954,
  lastUpdatedDate: 1618048954,
}, {
  id: 5,
  title: 'Task 5',
  description: 'Simple Task 5',
  lastUpdated: 1618048954,
  lastUpdatedDate: 1618048954,
}, {
  id: 6,
  title: 'Task 6',
  description: 'Simple Task 6',
  lastUpdated: 1618048954,
  lastUpdatedDate: 1618048954,
}, {
  id: 7,
  title: 'Task 7',
  description: 'Simple Task 7',
  lastUpdated: 1618048954,
  lastUpdatedDate: 1618048954,
}, {
  id: 8,
  title: 'Task 8',
  description: 'Simple Task 8',
  lastUpdated: 1618048954,
  lastUpdatedDate: 1618048954,
}, {
  id: 9,
  title: 'Task 9',
  description: 'Simple Task 9',
  lastUpdated: 1618048954,
  lastUpdatedDate: 1618048954,
}, {
  id: 10,
  title: 'Task 10',
  description: 'Simple Task 10',
  lastUpdated: 1618048954,
  lastUpdatedDate: 1618048954,
}];

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasksSubscription: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>(tasks);

  constructor() { }

  get getTasks(): Observable<Task[]> {
    return this.tasksSubscription;
  }
}
