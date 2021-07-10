import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api.base';
import { AuthStorageService } from 'src/app/services/auth-storage.service';
import { LoginResponse } from '../models/login-response.model';

@Injectable()
export class AuthApiService extends ApiService {
  constructor(http: HttpClient, private authStorageService: AuthStorageService) {
    super(http);
  }

  public login(username: string, password: string): Observable<LoginResponse> {
    const url: string = `${this.endpoint}/login`;

    return this.http.post<LoginResponse>(url, { username, password });
  }

  public refreshToken(): Observable<LoginResponse> {
    const refreshToken: string = this.authStorageService.getRefreshToken();
    const url: string = `${this.endpoint}/token`;

    return this.http.post<LoginResponse>(url, { refreshToken });
  }
}
