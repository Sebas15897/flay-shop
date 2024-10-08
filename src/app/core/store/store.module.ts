import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import {
  LOCAL_STORAGE_ENGINE,
  NgxsStoragePluginModule,
  SESSION_STORAGE_ENGINE,
} from '@ngxs/storage-plugin';
import { environment } from '../../../environments/environment';
import { LoadingState } from './loading/loading.state';
import { CategoryState } from './category/category.state';
import { ClientState } from './client/client.state';
import { ProductState } from './product/product.state';
import { StoreState } from './store/store.state';
import { CityState } from './city/city.state';
import { OrdersState } from './order/order.state';

@NgModule({
  imports: [
    NgxsModule.forRoot(
      [
        LoadingState,
        CategoryState,
        ClientState,
        ProductState,
        StoreState,
        CityState,
        OrdersState,
      ],
      {
        developmentMode: !environment.production,
      }
    ),
    NgxsReduxDevtoolsPluginModule.forRoot({ disabled: environment.production }),
    NgxsStoragePluginModule.forRoot({
      keys: [ProductState],
    }),
  ],
})
export class StateModule {}
