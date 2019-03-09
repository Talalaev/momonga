import { Injectable } from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild
} from '@angular/router';
import {Store} from '@ngxs/store';

import { TokenService } from 'ngx-api-manager';
import { AuthService } from './auth.service';
import {SetAuthUser} from './store/auth.actions';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store,
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
    let {auth} = await this.store.dispatch(new SetAuthUser).toPromise();

    if (auth.isAuth) return true;

    // Store the attempted URL for redirecting
    this.authService.redirectUrl = url;

    // Navigate to the login page with extras
    this.router.navigate(['/login']);

    return false;
  }
}
