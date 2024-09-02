import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from '../../config/app.config';
import {
  IProduct,
  IProductByIdPayload,
} from '../../interfaces/product.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private httpClient: HttpClient, private appConfig: AppConfig) {}

  getProductByStore(tenantId: string): Observable<IProduct[]> {
    return this.httpClient.get<IProduct[]>(
      `${this.appConfig.tenants.urls.base}/${tenantId}/filter`
    );
  }

  getProductByProductId(payload: IProductByIdPayload): Observable<IProduct> {
    return this.httpClient.get<IProduct>(
      `${this.appConfig.tenants.urls.base}/${payload.tenantId}/product/${payload.productId}`
    );
  }
}
