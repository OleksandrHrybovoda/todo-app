import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmComponent } from 'src/app/components/confirm/confirm.component';
import { AuthService } from 'src/app/services/auth.service';
import { MessagesService } from 'src/app/services/messages.service';
import { User } from '../../models/user.model';
import { UserStateManagementService } from '../../services/user-state-management.service';
import { UsersHelper } from '../../services/users.helper';
import { combineLatest, forkJoin, Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { UsersProvider } from '../../services/users.provider';

@Component({
  selector: 'user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.sass']
})
export class UserFormComponent implements OnInit, OnDestroy {

  userForm: FormGroup;

  titleForm: string;
  buttonText: string;
  hidePassword: boolean = true;
  shortcut: string;

  private readonly destroy$ = new Subject();

  constructor(
    private fb: FormBuilder,
    private userStateManagementService: UserStateManagementService,
    private authService: AuthService,
    private msgService: MessagesService,
    private usersHelper: UsersHelper,
    private usersProvider: UsersProvider,
    public matDialogRef: MatDialogRef<UserFormComponent>,
    @Inject(MAT_DIALOG_DATA) private user?: User
  ) { }

  public ngOnInit(): void {
    this.init();
  }

  private init(): void {
    this.initForm();
    this.setTitle();
    if (!this.isEditMode()) {
      this.initShortcutFeature();
    }
  }

  private initShortcutFeature(): void {
    const firstNameObservable = this.userForm.get('firstName').valueChanges;
    const lastNameObservable = this.userForm.get('lastName').valueChanges;

    combineLatest([firstNameObservable, lastNameObservable])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([firstName, lastName]) => {
        if (firstName && lastName) {
          this.getPotentialShortcut(firstName, lastName);
        }
      });
  }

  private getPotentialShortcut(firstName: string, lastName: string): void {
    const shortcut: string = `${firstName[0].toUpperCase()}${lastName[0].toUpperCase()}`;
    const index = 1;
    this.checkIsShortcutUnique(shortcut, index);
  }

  private checkIsShortcutUnique(shortcut: string, index: number): void {
    this.usersProvider.isShortcutUnique(shortcut).subscribe(isShortcutUnique => {
      if (isShortcutUnique) {
        this.shortcut = shortcut;
      } else {
        if (index > 10) {
          return null;
        }
        const potentialShortcut: string = `${shortcut}${index}`;
        index++;
        this.checkIsShortcutUnique(potentialShortcut, index);
      }
    });
  }

  public setProposalShortcut(): void {
    this.userForm.patchValue({
      shortcut: this.shortcut
    });
  }

  public async onCancelClick(): Promise<void> {
    if (this.userForm.dirty) {
      const confirmed = await this.confirmExit();
      if (!confirmed) {
       return;
      }
    }

    this.matDialogRef.close();
  }

  private async confirmExit(): Promise<boolean> {
    const title = 'Are you sure you want to leave?';
    const message = 'You have unsaved changes. Are you sure you want to leave this page? Unsaved changes will be lost.';
    const confirmButtonText = 'Leave';
    const dialogRef = this.msgService.openDialog(ConfirmComponent, {
      title,
      message,
      confirmButtonText
    });
    const response: any = await dialogRef.afterClosed().toPromise();

    return response;
  }

  private initForm(): void {
    let firstName = '';
    let lastName = '';
    let shortcut = '';
    let gender = 'u';
    let email = '';
    let login = '';

    if (this.isEditMode()) {
      firstName = this.user.firstName;
      lastName = this.user.lastName;
      shortcut = this.user.shortcut;
      gender = this.user.gender;
      email = this.user.email;
      login = this.user.login;
    }

    this.userForm = this.fb.group({
      firstName: [firstName, Validators.required],
      lastName: [lastName, Validators.required],
      shortcut: [shortcut, Validators.required],
      gender: [gender, Validators.required],
      email: [email, [Validators.required, Validators.email]],
      login: [login, Validators.required],
      password: ''
    });
  }

  public getEmailErrorMessage(): string {
    if (this.userForm.get('email').hasError('required')) {
      return 'You must enter a value';
    }

    return this.userForm.get('email').hasError('email') ? 'Not a valid email' : '';
  }

  private setTitle(): void {
    this.titleForm = this.isEditMode() ? 'Edit user' : 'Create user';
    this.buttonText = this.isEditMode() ? 'Edit' : 'Create';
  }

  public submit(): void {
    this.isEditMode() ? this.editUser() : this.createUser();
  }

  public generatePassword(): void {
    this.userForm.patchValue({ password: this.authService.generatePassword(15) });
  }

  private editUser(): void {
    this.user = {
      id: this.user.id,
      ...this.userForm.value
    };
    this.usersHelper.updateUser(this.user).subscribe(updatedUser => {
      this.userStateManagementService.sendUserUpdateEvent(updatedUser);
    });
  }

  private createUser(): void {
    this.usersHelper.createNewUser(this.userForm.value).subscribe(createdUser => {
      this.userStateManagementService.sendUserCreationEvent(createdUser);
    });
  }

  public isEditMode(): boolean {
    return this.user !== undefined;
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}


