/*
- Retrieve categories of products by store ID
*/

export interface IProduct {
  id: string;
  referenceId: string;
  name: string;
  enabled: boolean;
  withVariant: boolean;
  sku: string;
  discount: number;
  description: string;
  stock: number;
  price: number;
  numberEmergency: number;
  variants: IVariants;
  unit: IUnit;
  state: IState;
  category: ICategory;
  file: IFile[];
}

export interface ICategory {
  id: number;
  name: string;
  type: string;
  parent: string;
  children: string[];
}

export interface IFile {
  id: number;
  uri: string;
}

export interface IState {
  id: number;
  name: string;
  color: string;
  types: string[];
}

export interface IUnit {
  id: number;
  name: string;
}

export interface IVariants {
  variantEmergency: number[];
  variantNotSold: number[];
  variantActive: number[];
}

export interface IProductByIdPayload {
  productId: string;
  tenantId: string;
}
