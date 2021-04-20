import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UsersProvider } from 'src/app/services/users.provider';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.sass']
})
export class UsersListComponent implements OnInit, OnDestroy, AfterViewInit {
  public users = new MatTableDataSource();
  @ViewChild('sort') sort: MatSort;
  public displayedColumns: string[] = ['id', 'firstName', 'lastName', 'shortcut', 'age', 'gender', 'email', 'login'];

  private readonly destroy$ = new Subject();

  constructor(private usersProvider: UsersProvider) { }

  public ngOnInit(): void {
    this.init();
  }

  public ngAfterViewInit(): void {
    this.users.sort = this.sort;
  }

  private init(): void {
    this.prepareUsersToShow();
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
