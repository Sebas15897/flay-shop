import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from '../../config/app.config';
import {
  IAddClientPayload,
  IClient,
  IClientInfoPayload,
} from '../../interfaces/client.interface';

@Injectable({
  providedIn: 'root',
})

export class ClientService {
  constructor(private httpClient: HttpClient, private appConfig: AppConfig) {}

  getClientInfo(payload: IClientInfoPayload): Observable<IClient> {
    return this.httpClient.get<IClient>(
      `${this.appConfig.tenants.urls.base}/${payload.tenantId}/client/${payload.idClient}`
    );
  }

  addNewCLients(
    payload: IAddClientPayload,
    tenantId: string
  ): Observable<IClient> {
    return this.httpClient.post<IClient>(
      `${this.appConfig.tenants.urls.base}/${tenantId}/client/add`,
      payload
    );
  }
}
