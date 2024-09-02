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

  public app = {
    name: 'FlayShop',
    version: '1.0.0',
  };
}
