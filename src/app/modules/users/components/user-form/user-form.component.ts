import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmComponent } from 'src/app/components/confirm/confirm.component';
import { AuthService } from 'src/app/services/auth.service';
import { MessagesService } from 'src/app/services/messages.service';
import { User } from '../../models/user.model';
import { UserStateManagementService } from '../../services/user-state-management.service';
import { UsersHelper } from '../../services/users.helper';

@Component({
  selector: 'user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.sass']
})
export class UserFormComponent implements OnInit {

  userForm: FormGroup;

  titleForm: string;
  buttonText: string;
  hidePassword: boolean = true;

  constructor(
    private fb: FormBuilder,
    private userHelper: UsersHelper,
    private userStateManagementService: UserStateManagementService,
    private authService: AuthService,
    private msgService: MessagesService,
    private usersHelper: UsersHelper,
    public matDialogRef: MatDialogRef<UserFormComponent>,
    @Inject(MAT_DIALOG_DATA) private user?: User
  ) { }

  public ngOnInit(): void {
    this.init();
  }

  private init(): void {
    this.initForm();
    this.setTitle();
    this.checkFormChanges();
  }

  private checkFormChanges(): void {
    this.userForm.get('firstName').valueChanges.subscribe(firstName => {
      this.userForm.get('lastName').valueChanges.subscribe(lastName => {
        if (firstName && lastName) {
          const shortcut = `${firstName[0].toUpperCase()}${lastName[0].toUpperCase()}`;
          this.checkIsShortcutUnique(shortcut);
        }
      });
    });
  }

  public checkIsShortcutUnique(shortcut: string, index?: number): void {
    this.userHelper.checkIsShortcutUnique(shortcut).subscribe(isUnique => {
      if (isUnique) {
        this.userForm.patchValue({
          shortcut
        });
      }
      if (!isUnique) {
        let i = 1 || index;
        shortcut += i;
        this.checkIsShortcutUnique(shortcut, i++);
        shortcut = shortcut.slice(0, -1);
      }
    });
  }

  public async canDeactivate(): Promise<void> {
    const title = 'Are you sure you want to leave?';
    const message = 'You have unsaved changes. Are you sure you want to leave this page? Unsaved changes will be lost.';
    const confirmButtonText = 'Leave';
    const dialogRef = this.msgService.openDialog(ConfirmComponent, {
      title,
      message,
      confirmButtonText
    });
    const response = await dialogRef.afterClosed().toPromise();

    if (response) {
      this.matDialogRef.close();
    }
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
      firstName: firstName,
      lastName: lastName,
      shortcut: shortcut,
      gender: gender,
      email: email,
      login: login,
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
    this.userHelper.createNewUser(this.userForm.value).subscribe(createdUser => {
      this.userStateManagementService.sendUserCreationEvent(createdUser);
    });
  }

  public isEditMode(): boolean {
    return this.user !== undefined;
  }

}
