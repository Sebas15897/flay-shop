import { IProductByIdPayload } from '../../interfaces/product.interface';

export class GetProductsByStoreAction {
  static readonly type = '[Product] Get Products By Store';
  constructor(public tenantId: string) {}
}

export class GetProductByIdAction {
  static readonly type = '[Product] Get Product By Id';
  constructor(public payload: IProductByIdPayload) {}
}
