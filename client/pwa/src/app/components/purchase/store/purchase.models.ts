export interface PurchaseStateModel {
  purchase: Purchase,
  purchases: Array<Purchase>,
}


export class Purchase {
  public userId: number;
  public groupID: number;
  public categoryID: number;
  public currencyID: number;
  public countryID: number;
  public city: string;
  public name: string;
  public price: number;
  public createdAt: string;

  public categoryName?: string;

  constructor(rawPurchase: any) {
    this.userId = null;
    this.groupID = 0;
    this.categoryID = Number(rawPurchase.categoryID);
    this.currencyID = 643;
    this.countryID = 20;
    this.city = 'Луганск';
    this.name = rawPurchase.name;
    this.price = rawPurchase.price.replace(/\./g, "").replace(/\,/, ".");
    this.createdAt = rawPurchase.createdAt;
  }
}
