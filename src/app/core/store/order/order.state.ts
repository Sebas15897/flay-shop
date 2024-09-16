import { Injectable } from '@angular/core';
import { State, Selector, Action, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { GetOrderStatusAction } from './order.actions';
import { OrderService } from '../../services/order/order.service';
import { IOrderStatus } from '../../interfaces/order-status';

export interface OrdersStateModel {
  ordersStatus: IOrderStatus[];
}

@State<OrdersStateModel>({
  name: 'Orders',
  defaults: {
    ordersStatus: [],
  },
})

@Injectable()
export class OrdersState {
  constructor(private orderService: OrderService) {}

  @Selector()
  static getorders(state: OrdersStateModel): IOrderStatus[] {
    return state.ordersStatus;
  }

  @Action(GetOrderStatusAction)
  GetOrderStatusAction(ctx: StateContext<OrdersStateModel>) {
    return this.orderService.geOrderStatus().pipe(
      tap((resp) => {
        ctx.patchState({ ordersStatus: resp.data });
      })
    );
  }
}
