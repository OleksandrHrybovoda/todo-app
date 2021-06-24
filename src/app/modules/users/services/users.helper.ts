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

  public async getPotentialShortcut(firstName: string, lastName: string, iterator = 1): Promise<string | null> {
    let shortcut: string = `${firstName.toUpperCase()}${lastName.toUpperCase()}`;

    shortcut = await this.usersProvider.isShortcutUnique(shortcut).then(isUnique => {
      return this.checkIsShortcutUnique(isUnique, shortcut, iterator);
    });

    return shortcut;
  }

  private checkIsShortcutUnique(isUnique: boolean, shortcut: string, iterator: number): string | null {
    if (isUnique) {
      return shortcut;
    } else {
      if (iterator > 10) {
        return null;
      }
      const potentialShortcut: string = `${shortcut}${iterator}`;
      this.getPotentialShortcut(potentialShortcut[0], potentialShortcut[1], ++iterator);
    }
  }

  public getUniqueUser(user: User, users: User[]): User {
    const duplicate = users.find(userItem => userItem.firstName === user.firstName);
    if (duplicate) {
      user.id = this.generateId();
      user.firstName = this.getGeneratedUserProperty(user.firstName);
      user.lastName = this.getGeneratedUserProperty(user.lastName);
      user.login =  this.getGeneratedUserProperty(user.login);
      user.email = `${this.generateId()}${user.email.slice(1)}`;
      user.shortcut = this.getGeneratedUserProperty(user.shortcut);
      return user;
    } else {
      return user;
    }
  }

  private getGeneratedUserProperty(property: string): string {
    return `${property.slice(0, -1)}${this.generateId()}`;
  }

  private generateId(): number {
    return Math.floor(Math.random() * 1000);
  }

}
