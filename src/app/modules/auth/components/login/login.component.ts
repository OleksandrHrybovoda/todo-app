import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import {
  LOGIN_REDIRECT,
  MIN_PASSWORD_LENGTH,
} from '../../constants/auth-constants';
import { AuthApiService } from '../../services/auth-api.service';
import { AuthHelper } from '../../services/auth.helper';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})
export class LoginComponent implements OnInit, OnDestroy {
  public loginForm: FormGroup;
  public loginInvalid: boolean = false;

  private readonly destroy$ = new Subject();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private authHelper: AuthHelper,
    private authApiService: AuthApiService
  ) {}

  public ngOnInit(): void {
    this.init();
  }

  private init(): void {
    this.initForm();
  }

  private initForm(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: [
        '',
        [Validators.required, Validators.minLength(MIN_PASSWORD_LENGTH)],
      ],
    });
  }

  public login(): void {
    this.authHelper.loginUser(this.loginForm)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.router.navigate([LOGIN_REDIRECT]);
      }, () => {
        this.loginInvalid = true;
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
