import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import {
  AddLoadingTextAction,
  LoadingHiddeAction,
  LoadingShowAction,
} from './loading.actions';

export interface LoadingStateModel {
  show: boolean;
  text: string;
}

@State<LoadingStateModel>({
  name: 'loading',
  defaults: {
    show: false,
    text: '',
  },
})

@Injectable()
export class LoadingState {
  @Selector() static showLoading(state: LoadingStateModel): boolean {
    return state?.show ? true : false;
  }

  @Selector() static getTextLoading(state: LoadingStateModel): string {
    return state?.text ?? null;
  }

  constructor() {}

  @Action(LoadingShowAction)
  LoadingShowAction(ctx: StateContext<LoadingStateModel>) {
    ctx.patchState({
      show: true,
    });
  }

  @Action(LoadingHiddeAction)
  LoadingHiddeAction(ctx: StateContext<LoadingStateModel>) {
    ctx.patchState({
      show: false,
    });
  }

  @Action(AddLoadingTextAction)
  AddLoadingTextAction(
    ctx: StateContext<LoadingStateModel>,
    { payload }: AddLoadingTextAction
  ) {
    ctx.patchState({
      text: payload,
    });
  }
}
