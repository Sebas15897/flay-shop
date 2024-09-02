import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { GetStoreInfoAction } from './core/store/store/store.actions';
import { environment } from '../environments/environment';
import { GetProductCategoriesByShopAction } from './core/store/category/category.actions';
import { GetProductsByStoreAction } from './core/store/product/product.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  constructor(private store: Store) {
    this.store.dispatch(new GetStoreInfoAction(environment.tenant_test_url));
    this.store.dispatch(new GetProductCategoriesByShopAction(environment.tenant_test_url));
    this.store.dispatch(new GetProductsByStoreAction(environment.tenant_test_url));
  }
}
