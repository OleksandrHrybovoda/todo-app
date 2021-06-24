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
    let shortcut: string = '';
    if (iterator !== 1) {
      shortcut = `${firstName.toUpperCase()}${lastName.toUpperCase()}`;
    } else {
      shortcut = `${firstName.toUpperCase()}${lastName.toUpperCase()}${iterator}`;
    }

    shortcut = await this.usersProvider.isShortcutUnique(shortcut).then(isUnique => {
      return this.checkIsShortcutUnique(isUnique, shortcut, iterator);
    });

    return shortcut;
  }

  private checkIsShortcutUnique(isUnique: boolean, shortcut: string, iterator: number): string | null {
    if (isUnique) {
      return shortcut;
    } else {
      if (iterator > 100) {
        return null;
      }
      const potentialShortcut: string = `${shortcut}${iterator}`;
      this.getPotentialShortcut(potentialShortcut[0], potentialShortcut[1], iterator++);
    }
  }

  private generateId(): number {
    return Math.floor(Math.random() * 1000);
  }

}
