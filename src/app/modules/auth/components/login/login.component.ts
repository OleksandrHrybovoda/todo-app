import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { LOGIN_REDIRECT, MIN_PASSWORD_LENGTH } from '../../../../core/constants/constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public loginInvalid = false;

  constructor(private fb: FormBuilder,
              private router: Router,
              private authService: AuthService,
              private localStorageService: LocalStorageService) { }

  public ngOnInit(): void {
    this.init();
  }

  private init(): void {
    this.initForm();
  }

  private initForm(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(MIN_PASSWORD_LENGTH)]]
    });
  }

  public login(): void {
    this.localStorageService.set('token', 'simple token');
    this.authService.setLoggedInUser(this.loginForm.value.username);
    this.router.navigate([LOGIN_REDIRECT]);
  }

}
