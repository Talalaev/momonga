import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService, API_SERVICE, TokenService } from 'ngx-api-manager';

import { ApiConfig } from "../../configs/api.config";


@Injectable()
export class AuthService {
  redirectUrl: string;

  constructor(
    @Inject(API_SERVICE) private api: ApiService,
    private token: TokenService,
    private router: Router
  ) {}

  async login(loggingUser): Promise<{user: any, token: string}> {
    const {user, token} = await this.api
      .useConfig<ApiConfig>('main')
      .request(config => ({
        method: 'post',
        url: config.auth.loginWithToken,
        requestPoint: `post:[Auth] Login`,
        body: loggingUser
      }))
      .promise<{ token: string, user: any }>();

    this.token.set(token);

    return {user, token};
  }

  async logout() {
    try {
      await this.api
        .useConfig<ApiConfig>('main')
        .request(config => ({
          method: 'get',
          url: config.auth.logout,
          requestPoint: 'get:logout'
        }))
        .promise<any>();

      this.token.remove();
      this.router.navigate(['/login']);
    } catch(e) {
      this.token.remove();
      this.router.navigate(['/login']);
    }
  }

  async authUser() {
    try {
      await this.api
        .useConfig<ApiConfig>('main')
        .request(config => ({
          method: 'get',
          url: config.user.authUser,
          requestPoint: 'get:authUser'
        }))
        .promise<any>();

      return true;
    } catch(e) {
      return false;
    }
  }
}

