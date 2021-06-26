import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LOGOUT_REDIRECT } from '../modules/auth/constants/auth-constants';
import { LoginResponse } from '../modules/auth/models/login-response.model';
import { AuthApiService } from '../modules/auth/services/auth-api.service';
import { User } from '../modules/users/models/user.model';
import { LocalStorageService } from './local-storage.service';
import jwt_decode from 'jwt-decode';
import { DecodedToken } from '../modules/auth/models/decoded-token.model';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Ctor, EntityMapperService } from './entity-mapper';
import { userResponseFields } from '../modules/users/services/users-api.service';
import { AuthStorageService } from './auth-storage.service';

@Injectable()
export class AuthService {

  private userKey: string = 'user';

  constructor(private router: Router,
              private localStorageService: LocalStorageService,
              private authApiService: AuthApiService,
              private authStorageService: AuthStorageService,
              private entityMapper: EntityMapperService
              ) { }

  public login(username: string, password: string): Observable<User> {
    return this.authApiService.login(username, password)
    .pipe(
      map((response: LoginResponse) => {
        const decodedToken: DecodedToken = jwt_decode(response.token);
        const userItem: User = JSON.parse(decodedToken.data);
        const userCtor: Ctor<User> = new Ctor(User);
        let user: User = new User();
        user = this.entityMapper.createEntity(userItem, userResponseFields, userCtor);
        this.successAuth(response, user);
        return user;
      }),
      catchError(() => {
        return throwError(true);
      })
    );
  }

  public successAuth(response: LoginResponse, user: User): void {
    this.authStorageService.setToken(response.token);
    this.authStorageService.setRefreshToken(response.refreshToken);
    this.setCurrentUser(user);
  }

  public setCurrentUser(user: User): void {
    this.localStorageService.set(this.userKey, JSON.stringify(user));
  }

  public getCurrentUser(): User {
    const user: User = JSON.parse(this.localStorageService.get(this.userKey));
    return user;
  }

  public logout(): void {
    this.localStorageService.clear();
    this.router.navigate([LOGOUT_REDIRECT]);
  }

  public generatePassword(length: number): string {
    const specials: string = '!@#$%^&*()_+{}:"<>?\|[];\',./`~';
    const lowercase: string = 'abcdefghijklmnopqrstuvwxyz';
    const uppercase: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers: string = '0123456789';
    let password: string = '';

    const all: string = specials + lowercase + uppercase + numbers;

    for (let index = 0; index < length; index++) {
      password += all[Math.floor(Math.random() * all.length)];
    }

    return password;
  }
}
