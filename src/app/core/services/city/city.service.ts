import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from '../../config/app.config';
import { ICitiesResponse } from '../../interfaces/city.interface';

@Injectable({
  providedIn: 'root',
})

export class CityService {
  constructor(private httpClient: HttpClient, private appConfig: AppConfig) {}

  getAllCities(): Observable<ICitiesResponse> {
    return this.httpClient.get<ICitiesResponse>(
      this.appConfig.cities.urls.base
    );
  }
}
