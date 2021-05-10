import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  Subject
} from 'rxjs';
import { User } from '../core/models/user.model';
import { UsersApiService } from './api-services/users-api.service';

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
}, {
  id: 6,
  firstName: 'Roman',
  lastName: 'Chrome',
  shortcut: 'Hello, my name is Roman',
  age: 25,
  gender: 'm',
  email: 'roman@gmail.com',
  login: 'roman25',
  isAdmin: false
}];

@Injectable()
export class UsersProvider {

  private usersMocks: BehaviorSubject<User[]> = new BehaviorSubject<User[]>(users);

  constructor(private usersApiService: UsersApiService) { }

  public getUsersMocks(): Observable<User[]> {
    return this.usersMocks;
  }

  public getUsers(page: number, size: number): Observable<User[]> {
    return this.usersApiService.getUsers(page, size);
  }
}
