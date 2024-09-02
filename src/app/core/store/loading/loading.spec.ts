import { TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { LoadingState, LoadingStateModel } from './loading.state';
import {
  LoadingShowAction,
  LoadingHiddeAction,
  AddLoadingTextAction,
} from './loading.actions';

describe('LoadingState', () => {
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([LoadingState])],
    });

    store = TestBed.inject(Store);
  });

  it('should show loading', () => {
    const expectedState: LoadingStateModel = {
      show: true,
      text: '',
    };
    store.dispatch(new LoadingShowAction());
    const state = store.selectSnapshot(LoadingState);
    expect(state).toEqual(expectedState);
  });

  it('should hide loading', () => {
    const expectedState: LoadingStateModel = {
      show: false,
      text: '',
    };
    store.dispatch(new LoadingHiddeAction());
    const state = store.selectSnapshot(LoadingState);
    expect(state).toEqual(expectedState);
  });

  it('should add loading text', () => {
    const expectedState: LoadingStateModel = {
      show: true,
      text: 'Loading...',
    };
    store.dispatch(new LoadingShowAction());
    store.dispatch(new AddLoadingTextAction('Loading...'));
    const state = store.selectSnapshot(LoadingState);
    expect(state).toEqual(expectedState);
  });

  it('should select showLoading selector', () => {
    const expectedValue = true;
    store.dispatch(new LoadingShowAction());
    const showLoading = store.selectSnapshot(LoadingState.showLoading);
    expect(showLoading).toEqual(expectedValue);
  });

  it('should select getTextLoading selector', () => {
    const expectedValue = 'Loading...';
    store.dispatch(new AddLoadingTextAction('Loading...'));
    const textLoading = store.selectSnapshot(LoadingState.getTextLoading);
    expect(textLoading).toEqual(expectedValue);
  });
});
