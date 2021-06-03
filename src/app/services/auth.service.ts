import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

  constructor(private router: Router) { }

  public isAuthenticated(): boolean {
    const isTokenExist = this.getItem('token') ? true : false;

    return isTokenExist;
  }

  public getLoggedInUser(): string {
    return this.getItem('name');
  }

  public setLoggedInUser(key: string, name: string): void {
    this.setItem(key, name);
  }

  public setItem(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  public getItem(key: string): string {
    return localStorage.getItem(key);
  }

  public removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  public clear(): void {
    localStorage.clear();
  }

  public logout(): void {
    this.clear();
    this.router.navigate(['/login']);
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
