import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
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
  public users = new MatTableDataSource();
  public displayedColumns: string[] = ['id', 'firstName', 'lastName', 'shortcut', 'age', 'gender', 'email', 'login'];

  private readonly destroy$ = new Subject();

  constructor(private usersProvider: UsersProvider) { }

  public ngOnInit(): void {
    this.init();
  }

  public applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.users.filter = filterValue.trim().toLowerCase();
  }

  private init(): void {
    this.prepareUsersToShow();
    this.activateFilterPredicate();
  }

  public activateFilterPredicate(): void {
    this.users.filterPredicate = (data: User, filterValue: string): boolean => {
      return data.firstName
        .trim()
        .toLocaleLowerCase().indexOf(filterValue.trim().toLocaleLowerCase()) >= 0 || data.lastName
        .trim()
        .toLocaleLowerCase().indexOf(filterValue.trim().toLocaleLowerCase()) >= 0 || data.id.toString()
        .trim()
        .toLocaleLowerCase().indexOf(filterValue.trim().toLocaleLowerCase()) >= 0;
    };
  }

  private prepareUsersToShow(): void {
    this.usersProvider.getUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe(users => {
        this.users = new MatTableDataSource(users);
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
