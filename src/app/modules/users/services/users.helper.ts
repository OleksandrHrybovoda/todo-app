import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable()
export class UsersHelper {

  constructor() { }

  public createNewUser(user: User): Promise<User> {
    return new Promise(resolve => {
      const userItem: User = {
        id: this.generateId(),
        ...user,
        isAdmin: false
      };

      resolve(userItem);
    });
  }

  // todo - return observable
  public updateUser(user: User): Promise<User> {
    return new Promise(resolve => {
      const userItem: User = {
        ...user,
      };

      resolve(userItem);
    });
  }

  private generateId(): number {
    return Math.floor(Math.random() * 100);
  }

}
