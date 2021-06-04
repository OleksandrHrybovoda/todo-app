import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LOGOUT_REDIRECT } from '../core/constants/constants';
import { LocalStorageService } from './local-storage.service';

@Injectable()
export class AuthService {

  private userKeyStorage: string = 'name';

  constructor(private router: Router, private localStorageService: LocalStorageService) { }

  public isAuthenticated(): boolean {
    const isTokenExist = this.localStorageService.getToken() ? true : false;

    return isTokenExist;
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

  public generatePassword(length: number): string {
    const specials = '!@#$%^&*()_+{}:"<>?\|[];\',./`~';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    let password = '';

    const all: string = specials + lowercase + uppercase + numbers;

    for (let index = 0; index < length; index++) {
      password += all[Math.floor(Math.random() * all.length)];
    }

    return password;
  }
}
