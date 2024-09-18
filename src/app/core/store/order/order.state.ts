import { Injectable, NgZone } from '@angular/core';
import { State, Selector, Action, StateContext, Store } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { CreateNewOrderAction, GetOrderStatusAction } from './order.actions';
import { OrderService } from '../../services/order/order.service';
import { IOrderResponse, IOrderStatus } from '../../interfaces/order-status';
import { ClearProductAction } from '../product/product.actions';
import { Router } from '@angular/router';
import { GetProductCategoriesByShopAction } from '../category/category.actions';
import { StoreState } from '../store/store.state';
import { FlayAlertComponent } from '../../components/flay-alert/flay-alert.component';
import { MatDialog } from '@angular/material/dialog';

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
  constructor(
    private orderService: OrderService,
    private router: Router,
    private ngZone: NgZone,
    private store: Store,
    private matDialog: MatDialog
  ) {}

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
        ctx.dispatch(new ClearProductAction());
        this.ngZone.run(() => {
          this.matDialog.open(FlayAlertComponent, {
            width: 'auto',
            data: {
              title: '¡Orden Exitosa!',
              type: 'success',
              text: 'La orden se ha generado con éxito. Puedes continuar tu compra a través de WhatsApp.',
              saveButtonText: 'Ok',
              hiddeCancelBtn: true,
            },
          });
          this.router.navigate(['/shop/home'], {
            replaceUrl: true,
          });
          const tenant = this.store.selectSnapshot(
            StoreState.getStore
          )?.subdomain;
          ctx.dispatch(new GetProductCategoriesByShopAction(tenant));
        });
      })
    );
  }
}
