import { IOrderPayload } from '../../interfaces/order-status';

export class GetOrderStatusAction {
  static readonly type = '[Orders] Get Order Status';
  constructor() {}
}

export class CreateNewOrderAction {
  static readonly type = '[Orders] Create New Order';
  constructor(public payload: IOrderPayload) {}
}
