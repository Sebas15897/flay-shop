import { ICategory } from '../../interfaces/product.interface';

export class GetProductCategoriesByShopAction {
  static readonly type = '[Category] Get Product Categories By Shop';
  constructor(public tenantId: string) {}
}

export class SetProductCategoriesAction {
  static readonly type = '[Category] Set Product Categories';
  constructor(public categories: ICategory[]) {}
}
