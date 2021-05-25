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

  public async getPotentialShortcut(firstName: string, lastName: string): Promise<string | void> {
    let shortcut: string | void = `${firstName}${lastName}`;

    shortcut = await this.usersProvider.isShortcutUnique(shortcut).then(isUnique => {
      return this.checkIsShortcutUnique(isUnique, shortcut);
    });

    return shortcut;
  }

  private checkIsShortcutUnique(isUnique: boolean, shortcut: string | void): string | void {
    if (isUnique) {
      return shortcut;
    } else {
      for (let index = 0; index <= 10; index++) {
        const potentialShortcut: string = `${shortcut}${index}`;
        this.getPotentialShortcut(potentialShortcut[0], potentialShortcut[1]);
      }
    }
  }

  private generateId(): number {
    return Math.floor(Math.random() * 100);
  }

}
