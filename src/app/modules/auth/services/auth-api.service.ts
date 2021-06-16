import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api.base';
import { AuthService } from 'src/app/services/auth.service';
import { LoginResponse } from '../models/login-response.model';

@Injectable()
export class AuthApiService extends ApiService {
  constructor(http: HttpClient, private injector: Injector) {
    super(http);
  }

  public login(username: string, password: string): Observable<LoginResponse> {
    const url: string = `${this.endpoint}/login`;

    return this.http.post<LoginResponse>(url, { username, password });
  }

  public refreshToken(): Observable<LoginResponse> {
    const auth = this.injector.get(AuthService);
    const refreshToken: string = auth.getRefreshToken();
    const url: string = `${this.endpoint}/token`;

    return this.http.post<LoginResponse>(url, { refreshToken });
  }
}
