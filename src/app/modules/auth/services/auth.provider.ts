import { Injectable } from '@angular/core';
import {
  Observable,
} from 'rxjs';
import { User } from '../../users/models/user.model';
import { LoginResponse } from '../models/login-response.model';
import { AuthApiService } from './auth-api.service';

@Injectable()
export class AuthProvider {

  constructor(private authApiService: AuthApiService) { }

  public loginUser(username: string, password: string): Observable<User | LoginResponse> {
    return this.authApiService.login(username, password);
  }

}
