import { Injectable } from '@angular/core';
import { State, Selector, Action, StateContext } from '@ngxs/store';
import { StoreService } from '../../services/store/store.service';
import { GetStoreInfoAction, SetStoreInfoAction } from './store.actions';
import { ICategory, IStore } from '../../interfaces/store-config.interface';
import { tap } from 'rxjs/operators';

export class StoreStateModel {
  store: IStore | null;
}

@State<StoreStateModel>({
  name: 'store',
  defaults: {
    store: null,
  },
})

@Injectable()
export class StoreState {
  constructor(private storeService: StoreService) {}

  @Selector()
  static getStore(state: StoreStateModel): IStore | null {
    return state.store ?? null;
  }

  @Selector()
  static getStoreCategories(state: StoreStateModel): ICategory[] | null {
    return state?.store?.category ?? null;
  }

  @Action(GetStoreInfoAction)
  getStoreInfo(
    ctx: StateContext<StoreStateModel>,
    { tenantId }: GetStoreInfoAction
  ) {
    return this.storeService.getStoreInfo(tenantId).pipe(
      tap((resp) => {
        if (resp) {
          ctx.dispatch(new SetStoreInfoAction(resp.store));
        }
      })
    );
  }

  @Action(SetStoreInfoAction)
  setStoreInfo(
    ctx: StateContext<StoreStateModel>,
    { store }: SetStoreInfoAction
  ) {
    ctx.patchState({ store: store });
  }
}
