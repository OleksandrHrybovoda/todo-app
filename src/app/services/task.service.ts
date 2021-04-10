import { Injectable } from '@angular/core';
import { Task } from '../core/models/task.model';

const tasks: Task[] = [{
  id: 1,
  title: 'Card 1',
  description: 'Simple card 1',
  lastUpdated: 1618048954,
  creationDate: 1618048954,
}, {
  id: 2,
  title: 'Card 2',
  description: 'Simple card 2',
  lastUpdated: 1618048954,
  creationDate: 1618048954,
}, {
  id: 3,
  title: 'Card 3',
  description: 'Simple card 3',
  lastUpdated: 1618048954,
  creationDate: 1618048954,
}, {
  id: 4,
  title: 'Card 4',
  description: 'Simple card 4',
  lastUpdated: 1618048954,
  creationDate: 1618048954,
}, {
  id: 5,
  title: 'Card 5',
  description: 'Simple card 5',
  lastUpdated: 1618048954,
  creationDate: 1618048954,
}, {
  id: 6,
  title: 'Card 6',
  description: 'Simple card 6',
  lastUpdated: 1618048954,
  creationDate: 1618048954,
}, {
  id: 7,
  title: 'Card 7',
  description: 'Simple card 7',
  lastUpdated: 1618048954,
  creationDate: 1618048954,
}, {
  id: 8,
  title: 'Card 8',
  description: 'Simple card 8',
  lastUpdated: 1618048954,
  creationDate: 1618048954,
}, {
  id: 9,
  title: 'Card 9',
  description: 'Simple card 9',
  lastUpdated: 1618048954,
  creationDate: 1618048954,
}, {
  id: 10,
  title: 'Card 10',
  description: 'Simple card 10',
  lastUpdated: 1618048954,
  creationDate: 1618048954,
}];

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor() { }

  getTasks() {
    return tasks;
  }
}
