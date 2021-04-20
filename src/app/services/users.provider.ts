import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Subject
} from 'rxjs';
import { User } from '../core/models/user.model';

const users: User[] = [{
  id: 1,
  firstName: 'Alex',
  lastName: 'Gryb',
  shortcut: 'Hello, my name is Alex',
  age: 23,
  gender: 'm',
  email: 'gribmail@gmail.com',
  login: 'alex1998',
  isAdmin: true
}, {
  id: 2,
  firstName: 'Oksana',
  lastName: 'Mort',
  shortcut: 'Hello, my name is Oksana',
  age: 16,
  gender: 'f',
  email: 'oksana@gmail.com',
  login: 'oksana16',
  isAdmin: false
}, {
  id: 3,
  firstName: 'Roman',
  lastName: 'Tors',
  shortcut: 'Hello, my name is Roman',
  age: 26,
  gender: 'm',
  email: 'tors@gmail.com',
  login: 'tors26',
  isAdmin: false
}, {
  id: 4,
  firstName: 'Krom',
  lastName: 'Sort',
  shortcut: 'Hello, my name is Krom',
  age: 18,
  gender: 'm',
  email: 'krom@gmail.com',
  login: 'krom18',
  isAdmin: false
}, {
  id: 5,
  firstName: 'Katya',
  lastName: 'Kost',
  shortcut: 'Hello, my name is Katya',
  age: 18,
  gender: 'f',
  email: 'katya@gmail.com',
  login: 'katya18',
  isAdmin: false
}];

@Injectable()
export class UsersProvider {

  private usersMocks: BehaviorSubject<User[]> = new BehaviorSubject<User[]>(users);

  constructor() { }

  public getUsers(): Subject<User[]> {
    return this.usersMocks;
  }
}