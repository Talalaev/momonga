import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';

import { LoadingStreamService, ErrorsStreamService } from 'ngx-api-manager';
import { GetCategoryAction } from './store/category.actions';
import { Purchase } from './store/purchase.models';
import { AddPurchaseAction } from './store/purchase.actions';


@Component({
  selector: 'momo-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss']
})
export class PurchaseComponent implements OnInit {
  public loading$ = this.loadings
    .loadingStream$
    .filter(action => action.requestPoint === "post:[Purchase] AddPurchase")
    .map(({state}) => state);
  public categories: Array<any> = [];

  purchaseForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    price: ['', Validators.required],
    createdAt: [new Date, Validators.required],
    categoryID: ['', Validators.required],
  });

  constructor(
    private store: Store,
    private fb: FormBuilder,
    private loadings: LoadingStreamService
  ) { }

  ngOnInit() {
    this.store.dispatch(new GetCategoryAction).subscribe(({category}) => {
      this.categories = category.categories;
    });
  }

  save() {
    if (this.purchaseForm.invalid) return;

    const purchase = new Purchase(this.purchaseForm.value);
    this.store.dispatch(new AddPurchaseAction(purchase)).subscribe(state => {
      this.purchaseForm.reset();
      this.purchaseForm.patchValue({createdAt: new Date});
    });
  }
}
