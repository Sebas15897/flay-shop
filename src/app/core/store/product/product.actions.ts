import {
  IAddProductCarShop,
  IProduct,
  IProductByIdPayload,
} from '../../interfaces/product.interface';

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

export class AddProductToCarAction {
  static readonly type = '[Product] Set Product To Car';
  constructor(public product: IAddProductCarShop) {}
}

export class RemoveProductFromCarAction {
  static readonly type = '[Product] Remove Product From Car';
  constructor(public productId: string) {}
}

export class ClearCarProductsAction {
  static readonly type = '[Product] Clear Car Products';
}

export class IncrementProductQuantityAction {
  static readonly type = '[Product] Increment Product Quantity';
  constructor(public productId: string) {}
}

export class DecrementProductQuantityAction {
  static readonly type = '[Product] Decrement Product Quantity';
  constructor(public productId: string) {}
}
