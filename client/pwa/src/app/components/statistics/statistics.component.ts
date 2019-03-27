import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { LoadingStreamService } from 'ngx-api-manager';
import { Store } from '@ngxs/store';
import { GetPurchaseAction } from '../purchase/store/purchase.actions';
import { Purchase } from '../purchase/store/purchase.models';
import { GetCategoryAction } from '../purchase/store/category.actions';


@Component({
  selector: 'momo-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  public loading$ = this.loadings
    .loadingStream$
    .filter(action => action.requestPoint === "get:[Purchase] GetPurchase")
    .map(({state}) => state);
  dateForm: FormGroup = this.fb.group({
    createFrom: [moment(moment().format("YYYY-MM-DD")).toDate(), Validators.required],
    createTo: [moment().add(1, 'days').toDate()]
  });
  public purchases: Array<Purchase> = [];
  public categories: Array<any> = [];
  public totalPrice: number = 0;

  constructor(
    private store: Store,
    private fb: FormBuilder,
    private loadings: LoadingStreamService
  ) { }

  ngOnInit() {
    this.store.dispatch(new GetCategoryAction).subscribe(({category}) => {
      this.categories = category.categories;
      this.getReport();
    });
  }

  getReport() {
    const date = this.getQueryDate(this.dateForm.value);
    this.totalPrice = 0;
    this.store.dispatch(new GetPurchaseAction(date)).subscribe(({purchase}) => {
      this.purchases = purchase.purchases.map(purchase => {
        let category = this.categories.find(item => item.id === purchase.categoryID);
        purchase.categoryName = category.name;
        console.log(purchase.price);
        this.totalPrice += purchase.price;
        return purchase;
      });
    });
  }

  getQueryDate(date: {createFrom: string, createTo: string}) {
    return [
      {key: 'createFrom', val: date.createFrom},
      {key: 'createTo', val: date.createTo}
    ];
  }
}
