import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { User } from 'src/app/core/models/user.model';
import { UsersProvider } from 'src/app/services/users.provider';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.sass']
})
export class UsersListComponent implements OnInit, OnDestroy {
  public users: User[];
  public displayedColumns: string[] = ['id', 'firstName', 'lastName', 'shortcut', 'age', 'gender', 'email', 'login'];

  private readonly destroy$ = new Subject();

  constructor(private usersProvider: UsersProvider) { }

  public ngOnInit(): void {
    this.init();
  }

  private init(): void {
    this.prepareUsersToShow();
  }

  private prepareUsersToShow(): void {
    this.usersProvider.getUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe(tasks => {
        this.users = tasks;
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
