import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngxs/store';
import { GetStoreInfoAction } from './core/store/store/store.actions';
import { environment } from '../environments/environment';
import { GetProductCategoriesByShopAction } from './core/store/category/category.actions';
import { GetProductsByStoreAction } from './core/store/product/product.actions';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject, Observable, takeUntil } from 'rxjs';
import { LoadingState } from './core/store/loading/loading.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  private destroy: Subject<boolean> = new Subject<boolean>();
  showLoading$: Observable<boolean> = new Observable();
  getLoadingText$: Observable<string> = new Observable();
  loadingText: string = '';

  constructor(
    private store: Store,
    private ngxSpinnerService: NgxSpinnerService
  ) {
    const domain =
      window.location.hostname === 'localhost'
        ? environment.tenant_test_url
        : window.location.hostname;
    this.store.dispatch(new GetStoreInfoAction(domain));
    this.store.dispatch(new GetProductCategoriesByShopAction(domain));
    this.store.dispatch(new GetProductsByStoreAction(domain));
    this.showLoading$ = this.store.select(LoadingState.showLoading);
    this.getLoadingText$ = this.store.select(LoadingState.getTextLoading);
    this.subscribeState();
  }

  subscribeState() {
    this.showLoading$.pipe(takeUntil(this.destroy)).subscribe((show) => {
      show ? this.ngxSpinnerService.show() : this.ngxSpinnerService.hide();
    });

    this.getLoadingText$.pipe(takeUntil(this.destroy)).subscribe((text) => {
      if (text) {
        this.loadingText = text;
      } else {
        this.loadingText = '';
      }
    });
  }

  ngOnDestroy() {
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }
}
