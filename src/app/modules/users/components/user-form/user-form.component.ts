import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmComponent } from 'src/app/components/confirm/confirm.component';
import { AuthService } from 'src/app/services/auth.service';
import { MessagesService } from 'src/app/services/messages.service';
import { User } from '../../models/user.model';
import { UserStateManagementService } from '../../services/user-state-management.service';
import { UsersHelper } from '../../services/users.helper';
import { combineLatest, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UsersProvider } from '../../services/users.provider';
import { BaseFormComponent } from 'src/app/components/base-form/base-form.component';
import { MIN_PASSWORD_LENGTH } from '../../../auth/constants/auth-constants';

@Component({
  selector: 'user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.sass']
})
export class UserFormComponent extends BaseFormComponent implements OnInit, OnDestroy {

  form: FormGroup;

  titleForm: string;
  buttonText: string;
  hidePassword: boolean = true;
  shortcut: string | void;

  private readonly destroy$ = new Subject();

  constructor(
    private fb: FormBuilder,
    private userStateManagementService: UserStateManagementService,
    private authService: AuthService,
    msgService: MessagesService,
    private usersHelper: UsersHelper,
    matDialogRef: MatDialogRef<UserFormComponent>,
    @Inject(MAT_DIALOG_DATA) private user?: User
  ) {
    super(msgService, matDialogRef);
  }

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
    const firstNameObservable = this.form.get('firstName').valueChanges;
    const lastNameObservable = this.form.get('lastName').valueChanges;

    combineLatest([firstNameObservable, lastNameObservable])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([firstName, lastName]) => {
        if (firstName && lastName) {
          this.usersHelper.getPotentialShortcut(firstName[0], lastName[0]).then(shortcut => {
            this.shortcut = shortcut;
          });
        }
      });
  }

  public setProposalShortcut(): void {
    this.form.patchValue({
      shortcut: this.shortcut
    });
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

    this.form = this.fb.group({
      firstName: [firstName, Validators.required],
      lastName: [lastName, Validators.required],
      shortcut: [shortcut, Validators.required],
      gender: [gender, Validators.required],
      email: [email, [Validators.required, Validators.email]],
      login: [login, Validators.required],
      password: ['', Validators.minLength(MIN_PASSWORD_LENGTH)]
    });
  }

  public getEmailErrorMessage(): string {
    if (this.form.get('email').hasError('required')) {
      return 'You must enter a value';
    }

    return this.form.get('email').hasError('email') ? 'Not a valid email' : '';
  }

  private setTitle(): void {
    this.titleForm = this.isEditMode() ? 'Edit user' : 'Create user';
    this.buttonText = this.isEditMode() ? 'Edit' : 'Create';
  }

  public submit(): void {
    this.isEditMode() ? this.editUser() : this.createUser();
  }

  public generatePassword(): void {
    this.form.patchValue({ password: this.authService.generatePassword(MIN_PASSWORD_LENGTH) });
  }

  private editUser(): void {
    this.user = {
      id: this.user.id,
      ...this.form.value
    };
    this.usersHelper.updateUser(this.user).subscribe(updatedUser => {
      this.userStateManagementService.sendUserUpdateEvent(updatedUser);
    });
  }

  private createUser(): void {
    this.usersHelper.createNewUser(this.form.value).subscribe(createdUser => {
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


