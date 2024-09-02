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
  paymentMethodToStore: PaymentMethodToStore[];
  socialMediaToStore: SocialMediaToStore[];
  dispatch: Dispatch[];
  catalogPhotos: any[];
  urlProfilePhoto: string;
  urlPortraitPhoto: string;
}

export interface ICategory {
  id: number;
  name: string;
}

export interface ITypeCommerce {
  id: number;
  name: string;
}

export interface Dispatch {
  address: string;
}

export interface PaymentMethodToStore {
  id: number;
  paymentMethod: ITypeCommerce;
}

export interface SocialMediaToStore {
  socialMediaId: number;
  socialMedia: SocialMedia;
}

export interface SocialMedia {
  id: number;
  name: string;
  image: string;
}
