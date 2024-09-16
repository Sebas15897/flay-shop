import { IProduct } from './product.interface';

export interface IOrderStatus {
  id: number;
  name: string;
  color: string;
  types: string[];
}

export interface IOrderStatusResponse {
  statusCode: number;
  message: string;
  data: IOrderStatus[];
}

export interface IOrderPayload {
  clientId: string; // Campo obligatorio
  address: string;
  products: IProduct[]; // Especifica mejor el tipo si tienes un modelo de producto
  deliveryCost: number;
  subTotal: number; // Campo obligatorio
  total: number; // Campo obligatorio
  discount?: number; // Campo opcional
  notes?: string; // Campo opcional
  dateScheduled: string; // Campo obligatorio (formato $date-time)
  scheduleId: number; // Campo obligatorio
  orderStateId: number; // Campo obligatorio
  paymentStateId: number; // Campo obligatorio
  paymentMethodId: number; // Campo obligatorio
  storeId: string; // Campo obligatorio
  voucherUrl?: string; // Campo opcional
}
