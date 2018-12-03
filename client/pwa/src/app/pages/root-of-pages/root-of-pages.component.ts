import { Component, OnInit } from '@angular/core';
import { ApiService, LoadingStreamService } from 'ngx-api-manager';

import { ApiConfig } from '../../configs/api.config';


@Component({
  selector: 'root-of-pages',
  templateUrl: './root-of-pages.component.html',
  styleUrls: ['./root-of-pages.component.css']
})
export class RootOfPagesComponent implements OnInit {
  login: string = 'test';
  taken: string = 'null';
  isLoading: boolean = false;

  constructor(public api: ApiService, public loading: LoadingStreamService) {
    this.loading.loadingStream$.subscribe(res => {
      console.log(res);
      this.isLoading = res.state;
    });
  }

  ngOnInit() {
    this.checkLogin();
  }

  checkLogin() {
    this.api
      .useConfig<ApiConfig>('main')
      .request(config => ({
        method: 'get',
        url: config.auth.isLoginTaken,
        requestPoint: 'get:root-of-pages',
        paramsArray: [{key: 'login', val: this.login}]
      }))
      .promise<ILoginTaken>()
      .then((res: ILoginTaken) => this.taken = String(res.taken));
  }
}
