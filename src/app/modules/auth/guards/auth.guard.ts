import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthStorageService } from 'src/app/services/auth-storage.service';
import { LOGOUT_REDIRECT } from '../constants/auth-constants';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authStorageService: AuthStorageService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.authStorageService.isAuthenticated()) {
        return true;
      } else {
        return this.router.parseUrl(LOGOUT_REDIRECT);
      }
  }

}
