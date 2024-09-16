import { Injectable } from '@angular/core';
import { EndPoint } from './app.enpoints';

@Injectable({
  providedIn: 'root',
})
export class AppConfig {
  public tenants = {
    urls: {
      base: EndPoint.urlBase('api/tenancy'),
    },
  };

  public cities = {
    urls: {
      base: EndPoint.urlBase('api/tenancy/cities'),
    },
  };

  public paymentMethods = {
    urls: {
      base: EndPoint.urlBase('api/payment-methods'),
    },
  };

  public orderStatus = {
    urls: {
      base: EndPoint.urlBase('api/tenancy/paymentOrder'),
    }
  }

  public app = {
    name: 'FlayShop',
    version: '1.0.0',
  };
}
