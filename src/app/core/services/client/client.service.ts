import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from '../../config/app.config';
import {
  IAddClientPayload,
  IClient,
  IClientInfoPayload,
} from '../../interfaces/client.interface';
import { Store } from '@ngxs/store';
import { StoreState } from '../../store/store/store.state';

@Injectable({
  providedIn: 'root',
})

export class ClientService {
  constructor(private httpClient: HttpClient, private appConfig: AppConfig, private store: Store) {}

  getClientInfo(payload: IClientInfoPayload): Observable<IClient> {
    return this.httpClient.get<IClient>(
      `${this.appConfig.tenants.urls.base}/${payload.tenantId}/client/${payload.idClient}`
    );
  }

  addNewCLients(
    payload: IAddClientPayload,
  ): Observable<IClient> {
    const tenantId: string = this.store.selectSnapshot(StoreState.getStore)?.subdomain;
    return this.httpClient.post<IClient>(
      `${this.appConfig.tenants.urls.base}/${tenantId}/client/add`,
      payload
    );
  }
}
