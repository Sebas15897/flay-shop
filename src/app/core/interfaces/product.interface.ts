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
  categoryId: number;
}

export interface ICategory {
  id: number;
  name: string;
  type: string;
  parent: string;
  children: string[];
  product: IProduct[];
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

export interface IProduct {
  id: string;
  name: string;
  categoryId: number;
  enabled: boolean;
  withVariant: boolean;
  sku: string;
  discount: number;
  unitId: number;
  description: string;
  stock: number;
  price: number;
  numberEmergency: number;
  storeId: string;
  variants: IVariants;
  files: any[];
}
