import { Injectable } from '@angular/core';
import { State, Selector, Action, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { CreateNewOrderAction, GetOrderStatusAction } from './order.actions';
import { OrderService } from '../../services/order/order.service';
import {
  IOrderResponse,
  IOrderStatus,
} from '../../interfaces/order-status';

export interface OrdersStateModel {
  ordersStatus: IOrderStatus[];
  createOrden: IOrderResponse;
}

@State<OrdersStateModel>({
  name: 'Orders',
  defaults: {
    ordersStatus: [],
    createOrden: null,
  },
})

@Injectable()
export class OrdersState {
  constructor(private orderService: OrderService) {}

  @Selector()
  static getorders(state: OrdersStateModel): IOrderStatus[] {
    return state.ordersStatus;
  }

  @Selector()
  static getCreateOrderResponse(state: OrdersStateModel): IOrderResponse {
    return state.createOrden;
  }

  @Action(GetOrderStatusAction)
  GetOrderStatusAction(ctx: StateContext<OrdersStateModel>) {
    return this.orderService.geOrderStatus().pipe(
      tap((resp) => {
        ctx.patchState({ ordersStatus: resp.data });
      })
    );
  }

  @Action(CreateNewOrderAction)
  CreateNewOrderAction(
    ctx: StateContext<OrdersStateModel>,
    { payload }: CreateNewOrderAction
  ) {
    return this.orderService.createNewOrder(payload).pipe(
      tap((resp) => {
        ctx.patchState({
          createOrden: resp.data,
        });
      })
    );
  }
}
