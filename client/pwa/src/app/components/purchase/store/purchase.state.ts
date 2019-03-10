import { State, Action, StateContext } from '@ngxs/store';
import { AddPurchaseAction, GetPurchaseAction } from './purchase.actions';
import { PurchaseService } from '../services/purchase.service';
import { Purchase, PurchaseStateModel } from './purchase.models';


let state = {
  name: 'purchase',
  defaults: {
    purchase: null,
    purchases: [],
  }
};


@State<PurchaseStateModel>(state)
export class PurchaseState {
  constructor(
    private purchaseService: PurchaseService,
  ) {}

  @Action(GetPurchaseAction)
  async getPurchase(ctx: StateContext<PurchaseStateModel>, action: GetPurchaseAction) {
    let purchases: Array<Purchase> = await this.purchaseService.getPurchase(action.date);

    const state = ctx.getState();
    ctx.setState({
      ...state,
      purchases
    });
  }

  @Action(AddPurchaseAction)
  async addPurchase(ctx: StateContext<PurchaseStateModel>, action: AddPurchaseAction) {
    let purchase: Purchase = await this.purchaseService.add(action.purchase);

    const state = ctx.getState();
    ctx.setState({
      ...state,
      purchases: [action.purchase]
    });
  }
}
