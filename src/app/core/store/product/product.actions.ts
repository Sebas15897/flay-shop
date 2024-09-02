import { IProduct, IProductByIdPayload } from '../../interfaces/product.interface';

export class GetProductsByStoreAction {
  static readonly type = '[Product] Get Products By Store';
  constructor(public tenantId: string) {}
}

export class GetProductByIdAction {
  static readonly type = '[Product] Get Product By Id';
  constructor(public payload: IProductByIdPayload) {}
}

export class SetProductsAction {
  static readonly type = '[Product] Set Products';
  constructor(public products: IProduct[]) {}
}

export class SetProductAction {
  static readonly type = '[Product] Set Product';
  constructor(public product: IProduct) {}
}
