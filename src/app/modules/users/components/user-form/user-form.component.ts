import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { User } from '../../models/user.model';
import { UserStateManagementService } from '../../services/user-state-management.service';
import { UsersApiService } from '../../services/users-api.service';
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

  firstName: FormControl;
  lastName: FormControl;
  shortcut: FormControl;
  age: FormControl;
  gender: FormControl;
  email: FormControl;
  login: FormControl;
  password: FormControl;

  constructor(
    private fb: FormBuilder,
    private userHelper: UsersHelper,
    private userStateManagementService: UserStateManagementService,
    private usersApiService: UsersApiService,
    private authService: AuthService,
    private usersHelper: UsersHelper,
    @Inject(MAT_DIALOG_DATA) private user?: User
  ) { }

  public ngOnInit(): void {
    this.init();
  }

  private init(): void {
    this.initForm();
    this.setTitle();
  }

  private initForm(): void {
    let firstName = '';
    let lastName = '';
    let shortcut = '';
    let age = null;
    let gender = 'u';
    let email = '';
    let login = '';

    if (this.isEditMode()) {
      firstName = this.user.firstName;
      lastName = this.user.lastName;
      shortcut = this.user.shortcut;
      age = this.user.age;
      gender = this.user.gender;
      email = this.user.email;
      login = this.user.login;
    }

    this.firstName = new FormControl(firstName, Validators.required);
    this.lastName = new FormControl(lastName, Validators.required);
    this.shortcut = new FormControl(shortcut, Validators.required);
    this.age = new FormControl(age, [Validators.required, Validators.min(1)]);
    this.gender = new FormControl(gender, Validators.required);
    this.email = new FormControl(email, [Validators.required, Validators.email]);
    this.login = new FormControl(login, Validators.required);
    this.password = new FormControl('', Validators.minLength(3));

    this.userForm = this.fb.group({
      firstName: this.firstName,
      lastName: this.lastName,
      shortcut: this.shortcut,
      age: this.age,
      gender: this.gender,
      email: this.email,
      login: this.login,
      password: this.password
    });
  }

  public getEmailErrorMessage(): string {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  private setTitle(): void {
    this.titleForm = this.isEditMode() ? 'Edit user' : 'Create user';
    this.buttonText = this.isEditMode() ? 'Edit' : 'Create';
  }

  public submit(): void {
    this.isEditMode() ? this.editUser() : this.createUser();
  }

  public generatePassword(): void {
    this.password.setValue(this.authService.generatePassword(15));
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

  private isEditMode(): boolean {
    return this.user !== undefined;
  }

}
