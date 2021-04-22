import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AddEditFormUserComponent } from 'src/app/components/add-edit-form-user/add-edit-form-user.component';
import { User } from 'src/app/core/models/user.model';
import { MessagesService } from 'src/app/services/messages.service';
import { UserStateManagementService } from 'src/app/services/user-state-management.service';
import { UsersProvider } from 'src/app/services/users.provider';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.sass'],
})
export class UsersListComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('sort') sort: MatSort;

  public users: MatTableDataSource<User> = new MatTableDataSource();
  public displayedColumns: string[] = ['id', 'firstName', 'lastName', 'shortcut', 'age', 'gender', 'email', 'login', 'actions'];

  private readonly destroy$ = new Subject();

  constructor(private usersProvider: UsersProvider,
              private msgService: MessagesService,
              private userStateManagementService: UserStateManagementService) {}

  public ngOnInit(): void {
    this.init();
  }

  private subscribeToUserCreation(): void {
    this.userStateManagementService.getUserCreationEvent()
      .pipe(takeUntil(this.destroy$))
      .subscribe(user => {
        this.addNewUserToList(user);

        const msg: string = 'Successfully added new user!';
        this.showMessage(msg);
      });
  }

  private addNewUserToList(user: User): void {
    this.users.data.push(user);
    this.users.filter = '';
  }

  public applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.users.filter = filterValue.trim().toLowerCase();
  }

  public ngAfterViewInit(): void {
    this.users.sort = this.sort;
  }

  public openDialogToAddUser(): void {
    this.msgService.openDialog(AddEditFormUserComponent);
  }

  private init(): void {
    this.prepareUsersToShow();
    this.activateFilterPredicate();
    this.subscribeToUserCreation();
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

  private showMessage(msg: string): void {
    this.msgService.openSnackBar(msg);
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
