import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from '../../config/app.config';
import {
  ICreateOrdenResponse,
  IOrderPayload,
  IOrderStatusResponse,
} from '../../interfaces/order-status';
import { Store } from '@ngxs/store';
import { StoreState } from '../../store/store/store.state';

@Injectable({
  providedIn: 'root',
})

export class OrderService {
  constructor(
    private httpClient: HttpClient,
    private appConfig: AppConfig,
    private store: Store
  ) {}

  geOrderStatus(): Observable<IOrderStatusResponse> {
    return this.httpClient.get<IOrderStatusResponse>(
      this.appConfig.orderStatus.urls.base
    );
  }

  createNewOrder(order: IOrderPayload): Observable<ICreateOrdenResponse> {
    const tenantId: string = this.store.selectSnapshot(
      StoreState.getStore
    )?.subdomain;
    const storeId: string = this.store.selectSnapshot(StoreState.getStore)?.id;

    const formData: FormData = new FormData();

    formData.append('clientId', order.clientId);
    formData.append('address', order.address);
    formData.append('deliveryCost', order.deliveryCost.toString());
    formData.append('subTotal', order.subTotal.toString());
    formData.append('total', order.total.toString());
    formData.append('scheduleId', order.scheduleId.toString());
    formData.append('orderStateId', order.orderStateId.toString());
    formData.append('paymentStateId', order.paymentStateId.toString());
    formData.append('paymentMethodId', order.paymentMethodId.toString());
    formData.append('storeId', storeId);

    if (order.discount !== undefined) {
      formData.append('discount', order.discount.toString());
    }

    if (order.notes) {
      formData.append('notes', order.notes);
    }

    if (order.dateScheduled) {
      formData.append('dateScheduled', order.dateScheduled);
    }

    const filteredProducts = order.products.map((product) => ({
      productId: product.productId,
      variantId: product.variantId,
      quantity: product.quantity,
    }));

    formData.append('products', JSON.stringify(filteredProducts));

    if (order.voucherUrl) {
      formData.append('voucherUrl', order.voucherUrl);
    }

    return this.httpClient.post<ICreateOrdenResponse>(
      `${this.appConfig.tenants.urls.base}/${tenantId}/order/create`,
      formData
    );
  }
}
