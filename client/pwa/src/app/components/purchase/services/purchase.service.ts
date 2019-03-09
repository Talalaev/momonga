import { Inject, Injectable } from '@angular/core';

import { Purchase } from '../store/purchase.models';
import { ApiService, API_SERVICE } from 'ngx-api-manager';

import { ApiConfig } from "../../../configs/api.config";


@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  constructor(
    @Inject(API_SERVICE) private api: ApiService
  ) { }

  async add(purchase: Purchase) {
    return await this.api
      .useConfig<ApiConfig>('main')
      .request(config => ({
        method: 'post',
        url: config.purchase.add,
        requestPoint: `post:[Purchase] AddPurchase`,
        body: purchase
      }))
      .promise<any>();
  }
}
