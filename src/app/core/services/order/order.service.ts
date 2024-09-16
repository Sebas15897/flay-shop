import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from '../../config/app.config';
import { IOrderStatusResponse } from '../../interfaces/order-status';

@Injectable({
  providedIn: 'root',
})

export class OrderService {
  constructor(private httpClient: HttpClient, private appConfig: AppConfig) {}

  geOrderStatus(): Observable<IOrderStatusResponse> {
    return this.httpClient.get<IOrderStatusResponse>(
      this.appConfig.orderStatus.urls.base
    );
  }
}
