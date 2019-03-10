import { Inject, Injectable } from '@angular/core';
import { ApiService, API_SERVICE, TokenService } from 'ngx-api-manager';

import { ApiConfig } from "../../configs/api.config";


@Injectable()
export class AuthService {
  redirectUrl: string;

  constructor(
    @Inject(API_SERVICE) private api: ApiService,
    private token: TokenService
  ) {}

  async login(loggingUser) {
    const {user, token} = await this.api
      .useConfig<ApiConfig>('main')
      .request(config => ({
        method: 'post',
        url: config.auth.loginWithToken,
        requestPoint: `post:[Auth] Login`,
        body: loggingUser
      }))
      .promise<{user: any, token: string}>();

    this.token.set(token);

    return {user, token};
  }

  async registration(registeringUser) {
    const {user, token} = await this.api
      .useConfig<ApiConfig>('main')
      .request(config => ({
        method: 'post',
        url: config.auth.register,
        requestPoint: `post:[Auth] Registration`,
        body: registeringUser
      }))
      .promise<{user: any, token: string}>();

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
    } catch(e) {
      this.token.remove();
    }
  }

  async getAuthUser() {
    try {
      return await this.api
        .useConfig<ApiConfig>('main')
        .request(config => ({
          method: 'get',
          url: config.user.authUser,
          requestPoint: 'get:authUser'
        }))
        .promise<any>();
    } catch(e) {
      return null;
    }
  }
}

