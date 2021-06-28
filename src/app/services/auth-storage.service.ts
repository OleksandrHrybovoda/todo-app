import { Injectable } from '@angular/core';
import { User } from '../modules/users/models/user.model';
import { LocalStorageService } from './local-storage.service';

@Injectable()
export class AuthStorageService {

  private userKey: string = 'user';
  private tokenKeyStorage: string = 'token';
  private refreshTokenKeyStorage: string = 'refreshToken';

  constructor(private localStorageService: LocalStorageService) { }

  public getToken(): string {
    return this.localStorageService.get(this.tokenKeyStorage);
  }

  public setToken(value: string): void {
    this.localStorageService.set(this.tokenKeyStorage, value);
  }

  public clearAuthStorage(): void {
    this.localStorageService.clear();
  }

  public getRefreshToken(): string {
    return this.localStorageService.get(this.refreshTokenKeyStorage);
  }

  public setRefreshToken(value: string): void {
    this.localStorageService.set(this.refreshTokenKeyStorage, value);
  }

  public setCurrentUser(user: User): void {
    this.localStorageService.set(this.userKey, JSON.stringify(user));
  }

  public getCurrentUser(): User {
    const user: User = JSON.parse(this.localStorageService.get(this.userKey));
    return user;
  }
}
