import { Purchase } from './purchase.models';

export class GetPurchaseAction {
  static readonly type = '[Purchase] GetPurchase';

  constructor(public date?: Array<{key: string, val: string}>) {}
}

export class AddPurchaseAction {
  static readonly type = '[Purchase] AddPurchase';

  constructor(public purchase?: Purchase) {}
}
