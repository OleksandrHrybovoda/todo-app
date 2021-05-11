import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserStateManagementService {

  private userCreationSubject: Subject<User> = new Subject<User>();
  private userRemovalSubject: Subject<User> = new Subject<User>();
  private userUpdateSubject: Subject<User> = new Subject<User>();

  constructor() { }

  public getUserCreationEvent(): Subject<User> {
    return this.userCreationSubject;
  }

  public getUserUpdateEvent(): Subject<User> {
    return this.userUpdateSubject;
  }

  public getUserRemovalEvent(): Subject<User> {
    return this.userRemovalSubject;
  }

  public sendUserCreationEvent(user: User): void {
    this.userCreationSubject.next(user);
  }

  public sendUserUpdateEvent(user: User): void {
    this.userUpdateSubject.next(user);
  }

  public sendUserRemovalEvent(user: User): void {
    this.userRemovalSubject.next(user);
  }
}
