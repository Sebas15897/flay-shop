import { IStore } from '../../interfaces/store-config.interface';

export class GetStoreInfoAction {
  static readonly type = '[Store] Get Store Info';
  constructor(public tenantId: string) {}
}

export class SetStoreInfoAction {
  static readonly type = '[Store] Set Store Info';
  constructor(public store: IStore) {}
}
