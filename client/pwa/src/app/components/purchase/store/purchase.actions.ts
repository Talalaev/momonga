import { Purchase } from './purchase.models';

export class AddPurchaseAction {
  static readonly type = '[Purchase] AddPurchase';

  constructor(public purchase?: Purchase) {}
}
