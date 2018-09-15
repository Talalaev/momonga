import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { TokenService } from '../api/token.service';
import { ApiService, API_SERVICE } from '../api/api.service';
import { ApiConfig } from "../../configs/api.config";

// interface User {
//   email: string,
//   password: string
// }


@Injectable()
export class AuthService {
  redirectUrl: string;

  constructor(
    @Inject(API_SERVICE) private api: ApiService,
    private token: TokenService,
    private router: Router
  ) {}

  async login(user) {
    if (this.token.get()) {
      return true;
    }

    try {
      const res = await this.api
        .useConfig<ApiConfig>('main')
        .request(config => ({
          method: 'post',
          url: config.auth.login,
          requestPoint: 'post:auth',
          body: user
        }))
        .promise<{ token: string }>();
      this.token.set(res.token);

      return true;
    } catch(e) {
      // this.errors.defaultProcessing(e, 'global');
      //
      // if (e.status === 403) {
      //   this.errors.emitError(new AuthError('Wrong login or password', e), 'global');
      // }

      throw e;
    }
  }

  logout() {
    this.token.remove();
    this.router.navigate(['/login']);
  }
}

