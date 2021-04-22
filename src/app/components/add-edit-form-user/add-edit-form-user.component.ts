import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersHelper } from 'src/app/core/helpers/users.helper';
import { UserStateManagementService } from 'src/app/services/user-state-management.service';

@Component({
  selector: 'app-add-edit-form-user',
  templateUrl: './add-edit-form-user.component.html',
  styleUrls: ['./add-edit-form-user.component.sass']
})
export class AddEditFormUserComponent implements OnInit {
  addEditUserForm: FormGroup;
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

  constructor(private fb: FormBuilder,
              private userHelper: UsersHelper,
              private userStateManagementService: UserStateManagementService) { }

  public ngOnInit(): void {
    this.init();
  }

  private init(): void {
    this.initForm();
    this.setTitle();
  }

  private initForm(): void {
    this.firstName = new FormControl('', Validators.required);
    this.lastName = new FormControl('', Validators.required);
    this.shortcut = new FormControl('', Validators.required);
    this.age = new FormControl('', [Validators.required, Validators.min(1)]);
    this.gender = new FormControl('', Validators.required);
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.login = new FormControl('', Validators.required);
    this.password = new FormControl('', [Validators.required, Validators.minLength(3)]);
    this.addEditUserForm = this.fb.group({
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
    this.titleForm = 'Create user';
    this.buttonText = 'Create';
  }

  public addEditUser(form: FormGroup): void {
    this.createUser(form);
  }

  public generateStrongPassword(): void {
    const specials: string = '!@#$%^&*()_+{}:"<>?\|[];\',./`~';
    const lowercase: string = 'abcdefghijklmnopqrstuvwxyz';
    const uppercase: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers: string = '0123456789';
    let password: string = '';
    const length: number = 15;

    const all: string = specials + lowercase + uppercase + numbers;

    for (let index = 0; index < length; index++) {
      password += all[Math.floor(Math.random() * all.length)];
    }

    this.password.setValue(password);
  }

  private createUser(form: FormGroup): void {
    this.userHelper.createNewUser(form.value).then(createdUser => {
      this.userStateManagementService.sendUserCreationEvent(createdUser);
    });
  }

}
