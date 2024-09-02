/*
- Retrieve store and delivery methods by tenant ID
*/

export interface IStoreConfig {
  store: IStore;
  deliveryMethods: IDeliveryMethod[];
}

export interface IDeliveryMethod {
  value: number;
  title: string;
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
  dispatch: IDispatch;
  paymentMethodToStore: IPaymentMethodToStore;
  socialMediaToStore: ISocialMediaToStore;
  coverPhrase: string;
  catalogPhotos: ICatalogPhoto[];
}

export interface ICatalogPhoto {
  uri: string;
  store: string;
}

export interface ICity {
  id: number;
  name: string;
}

export interface IDispatch {
  id: string;
  address: string;
  observation: string;
  local: string;
  national: string;
  international: string;
}

export interface IPaymentMethodToStore {
  id: number;
  paymentMethodId: number;
  storeId: string;
  enabled: boolean;
}

export interface ISocialMediaToStore {
  id: number;
  socialMediaId: number;
  url: string;
  name: string;
  enabled: boolean;
}
