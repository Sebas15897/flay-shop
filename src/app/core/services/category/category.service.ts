import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from '../../config/app.config';
import { ICategory } from '../../interfaces/product.interface';
import { IDefaultResponse } from '../../interfaces/default-response.interface';

@Injectable({
  providedIn: 'root',
})

export class CategoryService {
  constructor(private httpClient: HttpClient, private appConfig: AppConfig) {}

  getProductCategoriesByShop(tenantId: string): Observable<IDefaultResponse<ICategory[]>> {
    return this.httpClient.get<IDefaultResponse<ICategory[]>>(
      `${this.appConfig.tenants.urls.base}/${tenantId}/product/store`
    );
  }

}
