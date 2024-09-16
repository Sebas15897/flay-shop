import { Injectable } from '@angular/core';
import { State, Selector, Action, StateContext } from '@ngxs/store';
import { CityService } from '../../services/city/city.service';
import { GetAllcitiesAction } from './city.actions';
import { tap } from 'rxjs/operators';
import { ICity } from '../../interfaces/city.interface';

export interface CityStateModel {
  cities: ICity[];
}

@State<CityStateModel>({
  name: 'city',
  defaults: {
    cities: [],
  },
})

@Injectable()
export class CityState {
  constructor(private cityService: CityService) {}

  @Selector()
  static getCities(state: CityStateModel): ICity[] {
    return state.cities;
  }

  @Action(GetAllcitiesAction)
  getAllCities(ctx: StateContext<CityStateModel>) {
    return this.cityService.getAllCities().pipe(
      tap((resp) => {
        ctx.patchState({ cities: resp.data });
      })
    );
  }
}
