import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from '../../config/app.config';
import { ICategory } from '../../interfaces/product.interface';

@Injectable({
  providedIn: 'root',
})

export class CategoryService {
  constructor(private httpClient: HttpClient, private appConfig: AppConfig) {}

  getProductCategoriesByShop(tenantId: string): Observable<ICategory[]> {
    return this.httpClient.get<ICategory[]>(
      `${this.appConfig.tenants.urls.base}/${tenantId}/product/store`
    );
  }

}
