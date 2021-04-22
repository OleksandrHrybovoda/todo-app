import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from '../core/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserStateManagementService {
  private userCreationSubject: Subject<User> = new Subject<User>();

  constructor() { }

  public getUserCreationEvent(): Subject<User> {
    return this.userCreationSubject;
  }

  public sendUserCreationEvent(user: User): void {
    this.userCreationSubject.next(user);
  }
}
