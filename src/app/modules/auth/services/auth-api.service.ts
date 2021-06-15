import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.base';
import { AuthService } from 'src/app/services/auth.service';
import { LoginResponse } from '../models/login-response.model';
import jwt_decode from 'jwt-decode';
import { User } from '../../users/models/user.model';
import { DecodedToken } from '../models/decoded-token.model';

@Injectable()
export class AuthApiService extends ApiService {
  constructor(http: HttpClient, private authService: AuthService) {
    super(http);
  }

  public login(username: string, password: string): Observable<LoginResponse | User> {
    const url: string = `${this.endpoint}/login`;

    return this.http.post<LoginResponse | User>(url, { username, password }).pipe(
      map((response: LoginResponse) => {
        const decodedToken: DecodedToken = jwt_decode(response.token);
        const user: User = JSON.parse(decodedToken.data);
        this.authService.successAuth(response, user);
        return user;
      }),
      catchError(() => {
        return throwError(true);
      })
    );
  }

  public refreshToken(): Observable<LoginResponse> {
    const refreshToken: string = this.authService.getRefreshToken();
    const url: string = `${this.endpoint}/token`;

    return this.http.post<LoginResponse>(url, { refreshToken });
  }
}
