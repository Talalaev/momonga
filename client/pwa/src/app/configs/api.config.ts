import { Injectable } from '@angular/core';

import { ISApi } from 'ngx-api-manager/typings';

@Injectable()
export class ApiConfig implements ISApi.apiConfig {
  prefix: string = 'api';
  tokenFieldName: string = 'token';
  timeout: number = 10*1000;
  withCredentials: boolean = true;
  cache: boolean = true; // говорит, что данные нужно кешировать
  forcedRefresh: boolean = true; // использует api service при кэшировании данных
  agreementId: number = 0;
  serverTZ: number = -5;

  constructor(public name: string = 'main') {
    this.name = name;
  }

  get baseUrl() {

    // if (NODE_ENV === 'prod') return `http://localhost:3000/${this.prefix}`;

    return `https://momosan.herokuapp.com/${this.prefix}`;

    // return `http://localhost:3000/${this.prefix}`;
  }

  get auth() {
    return {
      isLoginTaken: `${this.baseUrl}/is-login-taken`,
      logout: `${this.baseUrl}/logout`,
      login: `${this.baseUrl}/login`,
      loginWithToken: `${this.baseUrl}/login-with-token`,
      register: `${this.baseUrl}/register`
    };
  }

  get user() {
    return {
      authUser: `${this.baseUrl}/auth-user`
    };
  }

  get category() {
    return {
      categories: `${this.baseUrl}/categories`
    };
  }

  get purchase() {
    return {
      get: `${this.baseUrl}/purchases`,
      add: `${this.baseUrl}/purchases`
    };
  }
}
