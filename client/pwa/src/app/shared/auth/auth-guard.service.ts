import { Injectable } from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild
} from '@angular/router';

import { TokenService } from 'ngx-api-manager';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private authService: AuthService,
    private router: Router,
    private token: TokenService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    // берем url той страницы с которой пришли
    let url: string = state.url;

    // сохраняем в переменную и отправляем на /login,  а после возвращаем обратно
    return this.checkLogin(url);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return this.canActivate(route, state);
  }

  async canDeactivate() {
    console.log("canDeactivate");

    return true;
  }

  async checkLogin(url: string): Promise<boolean> {
    // let isLoggedIn = await this.authService.verifyAuth().toPromise();
    let isLoggedIn = this.token.get();

    if (isLoggedIn) {
      return true;
    }

    // Store the attempted URL for redirecting
    this.authService.redirectUrl = url;

    // Navigate to the login page with extras
    this.router.navigate(['/login']);

    return false;
  }
}
