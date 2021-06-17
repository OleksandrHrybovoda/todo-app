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

@Injectable()
export class AuthService {

  private userKeyStorage: string = 'name';
  private tokenKeyStorage: string = 'token';
  private refreshTokenKeyStorage: string = 'refreshToken';
  private userKey: string = 'user';

  constructor(private router: Router,
              private localStorageService: LocalStorageService,
              private authApiService: AuthApiService,
              private entityMapper: EntityMapperService
              ) { }

  public isAuthenticated(): boolean {
    const isTokenExist = this.getToken() ? true : false;

    return isTokenExist;
  }

  public login(username: string, password: string): Observable<User> {
    return this.authApiService.login(username, password)
    .pipe(
      map((response: LoginResponse) => {
        const decodedToken: DecodedToken = jwt_decode(response.token);
        const userItem: User = JSON.parse(decodedToken.data);
        const userCtor: Ctor<User> = new Ctor(User);
        const user: User = this.entityMapper.createEntity(userItem, userResponseFields, userCtor);
        this.successAuth(response, user);
        return user;
      }),
      catchError(() => {
        return throwError(true);
      })
    );
  }

  public successAuth(response: LoginResponse, user: User): void {
    this.setToken(response.token);
    this.setRefreshToken(response.refreshToken);
    this.setLoggedInUser(user.firstName);
    this.setCurrentUser(user);
  }

  public setCurrentUser(user: User): void {
    this.localStorageService.set(this.userKey, JSON.stringify(user));
  }

  public getCurrentUser(): User {
    const user: User = JSON.parse(this.localStorageService.get(this.userKey));
    return user;
  }

  public getLoggedInUser(): string {
    return this.localStorageService.get(this.userKeyStorage);
  }

  public setLoggedInUser(name: string): void {
    const key = this.userKeyStorage;
    this.localStorageService.set(key, name);
  }

  public logout(): void {
    this.localStorageService.clear();
    this.router.navigate([LOGOUT_REDIRECT]);
  }

  public getToken(): string {
    return this.localStorageService.get(this.tokenKeyStorage);
  }

  public setToken(value: string): void {
    this.localStorageService.set(this.tokenKeyStorage, value);
  }

  public getRefreshToken(): string {
    return this.localStorageService.get(this.refreshTokenKeyStorage);
  }

  public setRefreshToken(value: string): void {
    this.localStorageService.set(this.refreshTokenKeyStorage, value);
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
