import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { User } from 'src/app/core/models/user.model';
import { UsersProvider } from 'src/app/services/users.provider';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.sass'],
})
export class UsersListComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('sort') sort: MatSort;

  public users: MatTableDataSource<User> = new MatTableDataSource();
  public displayedColumns: string[] = ['id', 'firstName', 'lastName', 'shortcut', 'age', 'gender', 'email', 'login'];

  private readonly destroy$ = new Subject();

  constructor(private usersProvider: UsersProvider) {}

  public ngOnInit(): void {
    this.init();
  }

  public applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.users.filter = filterValue.trim().toLowerCase();
  }

  public ngAfterViewInit(): void {
    this.users.sort = this.sort;
  }

  private init(): void {
    this.prepareUsersToShow();
    this.activateFilterPredicate();
  }

  public activateFilterPredicate(): void {
    this.users.filterPredicate = (data: User, filterValue: string): boolean => {
      const filter: string = filterValue.trim().toLocaleLowerCase();
      const result: boolean = (
        this.searchTerm(data.firstName, filter) ||
        this.searchTerm(data.lastName, filter) ||
        this.searchTerm(data.id.toString(), filter)
      );

      return result;
    };
  }

  private searchTerm(value: string, filter: string): boolean {
    return value.trim().toLowerCase().indexOf(filter) !== -1;
  }

  private prepareUsersToShow(): void {
    this.usersProvider
      .getUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe((users) => {
        this.users = new MatTableDataSource(users);
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
