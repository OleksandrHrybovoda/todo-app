import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AddEntitiesComponent } from 'src/app/components/add-entities/add-entities.component';
import { AddEntitiesSettings } from 'src/app/components/add-entities/models/add-entities-settings.model';
import { AuthService } from 'src/app/services/auth.service';
import { MessagesService } from 'src/app/services/messages.service';
import { EntitiesListBase } from '../../../../components/entities-list-base/entities-list-base.component';
import { User } from '../../models/user.model';
import { UserStateManagementService } from '../../services/user-state-management.service';
import { UsersHelper } from '../../services/users.helper';
import { UsersProvider } from '../../services/users.provider';
import { UserFormComponent } from '../user-form/user-form.component';
import { MIN_PASSWORD_LENGTH } from '../../../auth/constants/auth-constants';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.sass'],
})
export class UsersListComponent extends EntitiesListBase implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('sort') sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  public users: MatTableDataSource<User> = new MatTableDataSource<User>();
  public length: number;
  public pageSize: number = 20;
  public currentPage: number = 0;
  public pageSizeOptions: number[] = [5, 10, 25, 100];

  public displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'shortcut',
    'age',
    'gender',
    'email',
    'login',
    'actions'
  ];

  private readonly destroy$ = new Subject();

  constructor(
    msgService: MessagesService,
    private usersProvider: UsersProvider,
    private userHelper: UsersHelper,
    private authService: AuthService,
    private userStateManagementService: UserStateManagementService
  ) {
    super(msgService);
  }

  public ngOnInit(): void {
    this.init();
  }

  public pageEventHandler(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.prepareUsersToShow();
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

  private subscribeToUserRemoval(): void {
    this.userStateManagementService.getUserRemovalEvent()
      .pipe(takeUntil(this.destroy$))
      .subscribe(user => {
        this.deleteUserFromList(user);

        const msg: string = 'Successfully removed user!';
        this.showMessage(msg);
      });
  }

  private deleteUserFromList(user: User): void {
    this.users.data = this.users.data.filter(userItem => userItem.id !== user.id);
    this.users.filter = '';
  }

  private subscribeToUserUpdate(): void {
    this.userStateManagementService.getUserUpdateEvent()
      .pipe(takeUntil(this.destroy$))
      .subscribe(user => {
        this.updateUserInList(user);

        const msg: string = 'User successfully updated!';
        this.showMessage(msg);
      });
  }

  private updateUserInList(user: User): void {
    const elementsIndex = this.users.data.findIndex(element => element.id === user.id);
    this.users.data[elementsIndex] = user;
    this.users.filter = '';
  }

  public async deleteAllUsers(): Promise<void> {
    const title: string = 'Delete all users';
    const message: string = 'Are you sure you want to delete all the users ?';
    const action: string = 'DELETE';

    const deletionConfirmed = await this.msgService.confirm(title, message, action);

    if (!deletionConfirmed) {
      return;
    }

    for (const iterator of this.users.data) {
      this.usersProvider.deleteUser(iterator.id).subscribe(() => {
        this.userStateManagementService.sendUserRemovalEvent(iterator);
      });
    }
  }

  public async onDeleteButtonClick(user: User): Promise<void> {
    const title: string = 'Delete user';
    const message: string = 'Are you sure you want to delete user ?';
    const action: string = 'DELETE';

    const deletionConfirmed = await this.msgService.confirm(title, message, action);

    if (!deletionConfirmed) {
      return;
    }

    this.usersProvider.deleteUser(user.id).subscribe(() => {
      this.userStateManagementService.sendUserRemovalEvent(user);
    });
  }

  public onEditButtonClick(user: User): void {
    const dialogRef = this.msgService.openDialog(UserFormComponent, user);
    dialogRef.disableClose = true;
  }

  public applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.users.filter = filterValue.trim().toLowerCase();

    if (this.users.paginator) {
      this.users.paginator.firstPage();
    }
  }

  public ngAfterViewInit(): void {
    this.users.sort = this.sort;
    this.users.paginator = this.paginator;
  }

  public openDialogToAddUser(): void {
    const width = '500px';
    const dialogRef = this.msgService.openDialog(UserFormComponent, undefined, width);
    dialogRef.disableClose = true;
  }

  public openDialogToAddUsers(): void {
    const data: AddEntitiesSettings = {
      title: 'users',
      amount: null
    };
    const dialogRef = this.msgService.openDialog(AddEntitiesComponent, data);

    dialogRef.afterClosed().subscribe((result: number) => {
      data.amount = result;
      if (data.amount) {
        this.generateNewUsers(data.amount);
      }
    });
  }

  private generateNewUsers(amount: number): void {
    for (let index = 0; index < amount; index++) {
      let user: User = {
        id: index + 1,
        firstName: `First name ${index + 1}`,
        lastName: `Last name ${index + 1}`,
        shortcut: `Shortcut ${index + 1}`,
        age: 5 * (index + 4),
        gender: 'm',
        email: `${index}@mail.com`,
        login: `Login ${index + 1}`,
        password: this.authService.generatePassword(MIN_PASSWORD_LENGTH),
        isAdmin: false
      };
      user = this.userHelper.getUniqueUser(user, this.users.data);
      this.userHelper.createNewUser(user).subscribe(createdUser => {
        this.userStateManagementService.sendUserCreationEvent(createdUser);
      });
    }
  }

  private init(): void {
    this.prepareUsersToShow();
    this.activateFilterPredicate();
    this.subscribeToUserCreation();
    this.subscribeToUserRemoval();
    this.subscribeToUserUpdate();
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
      .getUsers(this.currentPage, this.pageSize)
      .pipe(takeUntil(this.destroy$))
      .subscribe((users) => {
        this.length = this.users.data.length;
        this.users.data = users;
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
