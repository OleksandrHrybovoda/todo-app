import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

@Injectable()
export class AuthStorageService {

  private tokenKeyStorage: string = 'token';
  private refreshTokenKeyStorage: string = 'refreshToken';

  constructor(private localStorageService: LocalStorageService) { }

  public isAuthenticated(): boolean {
    const isTokenExist = this.getToken() ? true : false;

    return isTokenExist;
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
}
