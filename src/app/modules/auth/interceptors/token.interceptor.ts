import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
  HttpInterceptor,
} from '@angular/common/http';
import { catchError, switchMap, filter, take } from 'rxjs/operators';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { AuthApiService } from 'src/app/modules/auth/services/auth-api.service';
import { LoginResponse } from 'src/app/modules/auth/models/login-response.model';
import { AuthStorageService } from 'src/app/services/auth-storage.service';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<LoginResponse> = new BehaviorSubject<LoginResponse>(null);

  constructor(public authStorageService: AuthStorageService, private authApiService: AuthApiService) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token: string = this.authStorageService.getToken();

    if (token) {
      request = this.addToken(request, this.authStorageService.getToken());
    }

    return next.handle(request).pipe(catchError(error => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        return this.handle401Error(request, next);
      } else {
        return throwError(error);
      }
    }));
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authApiService.refreshToken().pipe(
        switchMap((token) => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(token);
          this.authStorageService.setRefreshToken(token.refreshToken);
          return next.handle(this.addToken(request, token.token));
        }));

    } else {
      return this.refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(jwt => {
          this.authStorageService.setRefreshToken(jwt.refreshToken);
          return next.handle(this.addToken(request, jwt.token));
        }));
    }
  }
}
