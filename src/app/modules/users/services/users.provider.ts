import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
} from 'rxjs';
import { User } from '../models/user.model';
import { UsersApiService } from './users-api.service';
import { usersMocks } from './users.mocks';

@Injectable()
export class UsersProvider {

  private usersMocks: BehaviorSubject<User[]> = new BehaviorSubject<User[]>(usersMocks);

  constructor(private usersApiService: UsersApiService) { }

  public getUsersMocks(): Observable<User[]> {
    return this.usersMocks;
  }

  public getUsers(page: number, size: number): Observable<User[]> {
    return this.usersApiService.getUsers(page, size);
  }

  public createUser(user: User): Observable<User> {
    return this.usersApiService.createUser(user);
  }

  public deleteUser(userId: number): Observable<string> {
    return this.usersApiService.deleteUser(userId);
  }

}
