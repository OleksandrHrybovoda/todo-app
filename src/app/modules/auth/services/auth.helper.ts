import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from '../../users/models/user.model';
import { LoginResponse } from '../models/login-response.model';
import { AuthProvider } from './auth.provider';

@Injectable()
export class AuthHelper {

  constructor(private authProvider: AuthProvider) { }

  public loginUser(form: FormGroup): Observable<User | LoginResponse> {
      const username: string = form.value.username;
      const password: string = form.value.password;

      return this.authProvider.loginUser(username, password);
  }

}
