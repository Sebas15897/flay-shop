import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from '../../config/app.config';
import { IStoreConfig } from '../../interfaces/store-config.interface';

@Injectable({
  providedIn: 'root',
})

export class StoreService {
  constructor(private httpClient: HttpClient, private appConfig: AppConfig) {}

  getStoreInfo(tenantId: string): Observable<IStoreConfig> {
    return this.httpClient.get<IStoreConfig>(`${this.appConfig.tenants.urls.base}/${tenantId}`);
  }

}
