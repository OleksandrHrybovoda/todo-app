import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

  constructor(private router: Router) { }

  public isAuthenticated(): boolean {
    const isTokenExist = localStorage.getItem('token') ? true : false;

    return isTokenExist;
  }

  public logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
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
