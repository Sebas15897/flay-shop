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

export interface IOrderPayloadWhatsapp {
  clientId: null;
  address: string;
  products: Product[];
  deliveryCost: number;
  subTotal: number;
  total: number;
  discount: number;
  notes: null;
  dateScheduled: Date;
  scheduleId: null;
  orderStateId: null;
  paymentStateId: string;
  paymentMethodId: string;
  voucherUrl: VoucherURL;
  client: Client;
}

export interface Client {
  name: string;
  lastName: string;
  neighborhood: string;
  email: null;
  phone: string;
  identification: null;
  address: string;
  cityId: string;
}

export interface Product {
  id: string;
  name: string;
  quantity: number;
  price: number;
  categoryId: string;
  variants: any[];
}

export interface VoucherURL {}

export interface ICreateOrdenResponse {
  statusCode: number;
  message: string;
  data: IOrderResponse;
}

export interface IOrderResponse {
  id: number;
  address: string;
  deliveryCost: number;
  subTotal: number;
  total: number;
  discount: number;
  notes: null;
  dateScheduled: Date;
  voucherUrl: string;
  client: Client;
  paymentState: State;
  orderState: State;
  schedule: Schedule;
  productToOrders: ProductToOrder[];
  paymentMethod: PaymentMethod;
  url: string;
}

export interface Client {
  id: string;
  name: string;
  city: PaymentMethod;
  lastName: string;
  address1: null;
  email: null;
  phone: string;
  neighborhood: string;
}

export interface PaymentMethod {
  id: number;
  name: string;
}

export interface State {
  id: number;
  name: string;
  color: string;
}

export interface ProductToOrder {
  quantity: number;
  product: Product;
}

export interface Product {
  id: string;
  discount: null;
  stock: number;
  name: string;
  files: File[];
  category: PaymentMethod;
  variants: any[];
  description: string;
  price: number;
}

export interface File {
  id: number;
  uri: string;
}

export interface Variants {}

export interface Schedule {
  id: number;
  shift: string;
  timeRange: string[];
}
