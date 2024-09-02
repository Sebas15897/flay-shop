/*
- Retrieve client details by store ID and client ID
*/

export interface IClient {
  id: string;
  name: string;
  lastName: string;
  email: string;
  phone: string;
  address1: string;
  address2: string;
  neighborhood: string;
  identification: string;
  storeId: string;
  city: ICity;
  store: IStore;
  orders: string[];
  expenses: string[];
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}

export interface ICity {
  id: number;
  name: string;
}

export interface IStore {
  name: string;
  email: string;
  address: string;
  phone: string;
  urlProfilePhoto: string;
  urlPortraitPhoto: string;
  legalName: string;
  typeCommerce: ICity;
  city: ICity;
  dispatch: Dispatch;
  paymentMethodToStore: PaymentMethodToStore;
  socialMediaToStore: SocialMediaToStore;
  coverPhrase: string;
  catalogPhotos: CatalogPhoto[];
}

export interface CatalogPhoto {
  uri: string;
  store: string;
}

export interface Dispatch {
  id: string;
  address: string;
  observation: string;
  local: string;
  national: string;
  international: string;
}

export interface PaymentMethodToStore {
  id: number;
  paymentMethodId: number;
  storeId: string;
  enabled: boolean;
}

export interface SocialMediaToStore {
  id: number;
  socialMediaId: number;
  url: string;
  name: string;
  enabled: boolean;
}

export interface IClientInfoPayload {
  tenantId: string;
  idClient: string;
}

export interface IAddClientPayload {
  name: string;
  lastName: string;
  neighborhood: string;
  email: string;
  phone: string;
  identification: string;
  address: string;
  cityId: number;
  storeId: string;
}
