import { Inject, Injectable } from '@angular/core';

import { ApiService, API_SERVICE } from 'ngx-api-manager';

import { ApiConfig } from "../../../configs/api.config";


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    @Inject(API_SERVICE) private api: ApiService
  ) { }

  async getCategories() {
    return await this.api
      .useConfig<ApiConfig>('main')
      .request(config => ({
        method: 'get',
        url: config.category.categories,
        requestPoint: `get:[Category] GetCategory`
      }))
      .promise<any>();
  }
}
