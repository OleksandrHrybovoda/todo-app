import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api.base';
import { AuthService } from 'src/app/services/auth.service';
import { Token } from '../models/token.model';

@Injectable()
export class AuthApiService extends ApiService {

  constructor(http: HttpClient, private authService: AuthService) {
    super(http);
  }

  public login(body: object): Observable<Token> {
    const url: string = `${this.endpoint}/login`;

    return this.http.post<Token>(url, body);
  }

  public refreshToken(): Observable<Token> {
    const refreshToken: string = this.authService.getRefreshToken();
    const url: string = `${this.endpoint}/token`;

    return this.http.post<Token>(url, { refreshToken });
  }

}
