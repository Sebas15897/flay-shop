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
  id: string;
  name: string;
  address: string;
  phone: string;
  coverPhrase: null;
  typeCommerce: ITypeCommerce;
  category: ICategory[];
  paymentMethodToStore: IPaymentMethodToStore[];
  socialMediaToStore: ISocialMediaToStore[];
  dispatch: IDispatch[];
  catalogPhotos: any[];
  urlProfilePhoto: string;
  urlPortraitPhoto: string;
  subdomain: string;
}

export interface ICategory {
  id: number;
  name: string;
}

export interface ITypeCommerce {
  id: number;
  name: string;
}

export interface IDispatch {
  address: string;
}

export interface IPaymentMethodToStore {
  id: number;
  paymentMethod: ITypeCommerce;
}

export interface ISocialMediaToStore {
  socialMediaId: number;
  socialMedia: ISocialMedia;
}

export interface ISocialMedia {
  id: number;
  name: string;
  image: string;
}
