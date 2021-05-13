import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { UsersProvider } from './users.provider';

@Injectable()
export class UsersHelper {

  constructor(private usersProvider: UsersProvider) { }

  public createNewUser(user: User): Observable<User> {
      const userItem: User = {
        id: this.generateId(),
        ...user,
        isAdmin: false
      };

      return this.usersProvider.createUser(userItem);
  }

  public updateUser(user: User): Observable<User> {
    const userItem: User = {
      ...user,
    };

    return this.usersProvider.editUser(userItem);
  }

  private generateId(): number {
    return Math.floor(Math.random() * 100);
  }

}
